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
  JefeOperaciones,
  Sede,
} from '../models';
import {JefeOperacionesRepository} from '../repositories';

export class JefeOperacionesSedeController {
  constructor(
    @repository(JefeOperacionesRepository) protected jefeOperacionesRepository: JefeOperacionesRepository,
  ) { }

  @get('/jefe-operaciones/{id}/sede', {
    responses: {
      '200': {
        description: 'JefeOperaciones has one Sede',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sede),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Sede>,
  ): Promise<Sede> {
    return this.jefeOperacionesRepository.sede(id).get(filter);
  }

  @post('/jefe-operaciones/{id}/sede', {
    responses: {
      '200': {
        description: 'JefeOperaciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sede)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof JefeOperaciones.prototype.idJefe,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {
            title: 'NewSedeInJefeOperaciones',
            exclude: ['idSede'],
            optional: ['jefeOperacionesId']
          }),
        },
      },
    }) sede: Omit<Sede, 'idSede'>,
  ): Promise<Sede> {
    return this.jefeOperacionesRepository.sede(id).create(sede);
  }

  @patch('/jefe-operaciones/{id}/sede', {
    responses: {
      '200': {
        description: 'JefeOperaciones.Sede PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {partial: true}),
        },
      },
    })
    sede: Partial<Sede>,
    @param.query.object('where', getWhereSchemaFor(Sede)) where?: Where<Sede>,
  ): Promise<Count> {
    return this.jefeOperacionesRepository.sede(id).patch(sede, where);
  }

  @del('/jefe-operaciones/{id}/sede', {
    responses: {
      '200': {
        description: 'JefeOperaciones.Sede DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sede)) where?: Where<Sede>,
  ): Promise<Count> {
    return this.jefeOperacionesRepository.sede(id).delete(where);
  }
}
