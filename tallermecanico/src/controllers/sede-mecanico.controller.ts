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
  Mecanico,
} from '../models';
import {SedeRepository} from '../repositories';

export class SedeMecanicoController {
  constructor(
    @repository(SedeRepository) protected sedeRepository: SedeRepository,
  ) { }

  @get('/sedes/{id}/mecanicos', {
    responses: {
      '200': {
        description: 'Array of Sede has many Mecanico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mecanico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mecanico>,
  ): Promise<Mecanico[]> {
    return this.sedeRepository.mecanicos(id).find(filter);
  }

  @post('/sedes/{id}/mecanicos', {
    responses: {
      '200': {
        description: 'Sede model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mecanico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sede.prototype.idSede,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanico, {
            title: 'NewMecanicoInSede',
            exclude: ['idMecanico'],
            optional: ['sedeId']
          }),
        },
      },
    }) mecanico: Omit<Mecanico, 'idMecanico'>,
  ): Promise<Mecanico> {
    return this.sedeRepository.mecanicos(id).create(mecanico);
  }

  @patch('/sedes/{id}/mecanicos', {
    responses: {
      '200': {
        description: 'Sede.Mecanico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanico, {partial: true}),
        },
      },
    })
    mecanico: Partial<Mecanico>,
    @param.query.object('where', getWhereSchemaFor(Mecanico)) where?: Where<Mecanico>,
  ): Promise<Count> {
    return this.sedeRepository.mecanicos(id).patch(mecanico, where);
  }

  @del('/sedes/{id}/mecanicos', {
    responses: {
      '200': {
        description: 'Sede.Mecanico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mecanico)) where?: Where<Mecanico>,
  ): Promise<Count> {
    return this.sedeRepository.mecanicos(id).delete(where);
  }
}
