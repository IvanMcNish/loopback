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
  JefeOperaciones,
} from '../models';
import {SedeRepository} from '../repositories';

export class SedeJefeOperacionesController {
  constructor(
    @repository(SedeRepository) protected sedeRepository: SedeRepository,
  ) { }

  @get('/sedes/{id}/jefe-operaciones', {
    responses: {
      '200': {
        description: 'Sede has one JefeOperaciones',
        content: {
          'application/json': {
            schema: getModelSchemaRef(JefeOperaciones),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<JefeOperaciones>,
  ): Promise<JefeOperaciones> {
    return this.sedeRepository.jefeOperaciones(id).get(filter);
  }

  @post('/sedes/{id}/jefe-operaciones', {
    responses: {
      '200': {
        description: 'Sede model instance',
        content: {'application/json': {schema: getModelSchemaRef(JefeOperaciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sede.prototype.idSede,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JefeOperaciones, {
            title: 'NewJefeOperacionesInSede',
            exclude: ['idJefe'],
            optional: ['sedeId']
          }),
        },
      },
    }) jefeOperaciones: Omit<JefeOperaciones, 'idJefe'>,
  ): Promise<JefeOperaciones> {
    return this.sedeRepository.jefeOperaciones(id).create(jefeOperaciones);
  }

  @patch('/sedes/{id}/jefe-operaciones', {
    responses: {
      '200': {
        description: 'Sede.JefeOperaciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JefeOperaciones, {partial: true}),
        },
      },
    })
    jefeOperaciones: Partial<JefeOperaciones>,
    @param.query.object('where', getWhereSchemaFor(JefeOperaciones)) where?: Where<JefeOperaciones>,
  ): Promise<Count> {
    return this.sedeRepository.jefeOperaciones(id).patch(jefeOperaciones, where);
  }

  @del('/sedes/{id}/jefe-operaciones', {
    responses: {
      '200': {
        description: 'Sede.JefeOperaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(JefeOperaciones)) where?: Where<JefeOperaciones>,
  ): Promise<Count> {
    return this.sedeRepository.jefeOperaciones(id).delete(where);
  }
}
