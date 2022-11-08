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
  Propietario,
  Vehiculo,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioVehiculoController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Propietario has one Vehiculo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vehiculo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo> {
    return this.propietarioRepository.vehiculo(id).get(filter);
  }

  @post('/propietarios/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.idPropietario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInPropietario',
            exclude: ['idPlaca'],
            optional: ['propietarioId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'idPlaca'>,
  ): Promise<Vehiculo> {
    return this.propietarioRepository.vehiculo(id).create(vehiculo);
  }

  @patch('/propietarios/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Propietario.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.propietarioRepository.vehiculo(id).patch(vehiculo, where);
  }

  @del('/propietarios/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Propietario.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.propietarioRepository.vehiculo(id).delete(where);
  }
}
