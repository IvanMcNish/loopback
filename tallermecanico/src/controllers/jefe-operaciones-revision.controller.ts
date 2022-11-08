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
  Revision,
} from '../models';
import {JefeOperacionesRepository} from '../repositories';

export class JefeOperacionesRevisionController {
  constructor(
    @repository(JefeOperacionesRepository) protected jefeOperacionesRepository: JefeOperacionesRepository,
  ) { }

  @get('/jefe-operaciones/{id}/revisions', {
    responses: {
      '200': {
        description: 'Array of JefeOperaciones has many Revision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Revision)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Revision>,
  ): Promise<Revision[]> {
    return this.jefeOperacionesRepository.revisions(id).find(filter);
  }

  @post('/jefe-operaciones/{id}/revisions', {
    responses: {
      '200': {
        description: 'JefeOperaciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revision)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof JefeOperaciones.prototype.idJefe,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {
            title: 'NewRevisionInJefeOperaciones',
            exclude: ['idRevision'],
            optional: ['jefeOperacionesId']
          }),
        },
      },
    }) revision: Omit<Revision, 'idRevision'>,
  ): Promise<Revision> {
    return this.jefeOperacionesRepository.revisions(id).create(revision);
  }

  @patch('/jefe-operaciones/{id}/revisions', {
    responses: {
      '200': {
        description: 'JefeOperaciones.Revision PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {partial: true}),
        },
      },
    })
    revision: Partial<Revision>,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.jefeOperacionesRepository.revisions(id).patch(revision, where);
  }

  @del('/jefe-operaciones/{id}/revisions', {
    responses: {
      '200': {
        description: 'JefeOperaciones.Revision DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.jefeOperacionesRepository.revisions(id).delete(where);
  }
}
