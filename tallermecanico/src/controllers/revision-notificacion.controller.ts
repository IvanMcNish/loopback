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
  Notificacion,
} from '../models';
import {RevisionRepository} from '../repositories';

export class RevisionNotificacionController {
  constructor(
    @repository(RevisionRepository) protected revisionRepository: RevisionRepository,
  ) { }

  @get('/revisions/{id}/notificacions', {
    responses: {
      '200': {
        description: 'Array of Revision has many Notificacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Notificacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Notificacion>,
  ): Promise<Notificacion[]> {
    return this.revisionRepository.notificacions(id).find(filter);
  }

  @post('/revisions/{id}/notificacions', {
    responses: {
      '200': {
        description: 'Revision model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notificacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Revision.prototype.idRevision,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificacion, {
            title: 'NewNotificacionInRevision',
            exclude: ['idNotificacion'],
            optional: ['revisionId']
          }),
        },
      },
    }) notificacion: Omit<Notificacion, 'idNotificacion'>,
  ): Promise<Notificacion> {
    return this.revisionRepository.notificacions(id).create(notificacion);
  }

  @patch('/revisions/{id}/notificacions', {
    responses: {
      '200': {
        description: 'Revision.Notificacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificacion, {partial: true}),
        },
      },
    })
    notificacion: Partial<Notificacion>,
    @param.query.object('where', getWhereSchemaFor(Notificacion)) where?: Where<Notificacion>,
  ): Promise<Count> {
    return this.revisionRepository.notificacions(id).patch(notificacion, where);
  }

  @del('/revisions/{id}/notificacions', {
    responses: {
      '200': {
        description: 'Revision.Notificacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Notificacion)) where?: Where<Notificacion>,
  ): Promise<Count> {
    return this.revisionRepository.notificacions(id).delete(where);
  }
}
