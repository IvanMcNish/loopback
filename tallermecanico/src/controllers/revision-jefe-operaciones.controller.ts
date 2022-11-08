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
  Revision,
  JefeOperaciones,
} from '../models';
import {RevisionRepository} from '../repositories';

export class RevisionJefeOperacionesController {
  constructor(
    @repository(RevisionRepository) protected revisionRepository: RevisionRepository,
  ) { }

  @get('/revisions/{id}/jefe-operaciones', {
    responses: {
      '200': {
        description: 'Revision has one JefeOperaciones',
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
    return this.revisionRepository.jefeOperaciones(id).get(filter);
  }

  @post('/revisions/{id}/jefe-operaciones', {
    responses: {
      '200': {
        description: 'Revision model instance',
        content: {'application/json': {schema: getModelSchemaRef(JefeOperaciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Revision.prototype.idRevision,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JefeOperaciones, {
            title: 'NewJefeOperacionesInRevision',
            exclude: ['idJefe'],
            optional: ['revisionId']
          }),
        },
      },
    }) jefeOperaciones: Omit<JefeOperaciones, 'idJefe'>,
  ): Promise<JefeOperaciones> {
    return this.revisionRepository.jefeOperaciones(id).create(jefeOperaciones);
  }

  @patch('/revisions/{id}/jefe-operaciones', {
    responses: {
      '200': {
        description: 'Revision.JefeOperaciones PATCH success count',
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
    return this.revisionRepository.jefeOperaciones(id).patch(jefeOperaciones, where);
  }

  @del('/revisions/{id}/jefe-operaciones', {
    responses: {
      '200': {
        description: 'Revision.JefeOperaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(JefeOperaciones)) where?: Where<JefeOperaciones>,
  ): Promise<Count> {
    return this.revisionRepository.jefeOperaciones(id).delete(where);
  }
}
