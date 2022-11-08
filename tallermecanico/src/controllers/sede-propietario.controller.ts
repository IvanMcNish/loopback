import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Sede,
  Propietario,
} from '../models';
import {SedeRepository} from '../repositories';

export class SedePropietarioController {
  constructor(
    @repository(SedeRepository) protected sedeRepository: SedeRepository,
  ) { }

  @get('/sedes/{id}/propietarios', {
    responses: {
      '200': {
        description: 'Array of Sede has many Propietario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Propietario>,
  ): Promise<Propietario[]> {
    return this.sedeRepository.propietarios(id).find(filter);
  }

  @post('/sedes/{id}/propietarios', {
    responses: {
      '200': {
        description: 'Sede model instance',
        content: {'application/json': {schema: getModelSchemaRef(Propietario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sede.prototype.idSede,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {
            title: 'NewPropietarioInSede',
            exclude: ['idPropietario'],
            optional: ['sedeId']
          }),
        },
      },
    }) propietario: Omit<Propietario, 'idPropietario'>,
  ): Promise<Propietario> {
    return this.sedeRepository.propietarios(id).create(propietario);
  }

  @patch('/sedes/{id}/propietarios', {
    responses: {
      '200': {
        description: 'Sede.Propietario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {partial: true}),
        },
      },
    })
    propietario: Partial<Propietario>,
    @param.query.object('where', getWhereSchemaFor(Propietario)) where?: Where<Propietario>,
  ): Promise<Count> {
    return this.sedeRepository.propietarios(id).patch(propietario, where);
  }

  @del('/sedes/{id}/propietarios', {
    responses: {
      '200': {
        description: 'Sede.Propietario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Propietario)) where?: Where<Propietario>,
  ): Promise<Count> {
    return this.sedeRepository.propietarios(id).delete(where);
  }
}
