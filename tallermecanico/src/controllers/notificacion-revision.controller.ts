import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Notificacion,
  Revision,
} from '../models';
import {NotificacionRepository} from '../repositories';

export class NotificacionRevisionController {
  constructor(
    @repository(NotificacionRepository)
    public notificacionRepository: NotificacionRepository,
  ) { }

  @get('/notificacions/{id}/revision', {
    responses: {
      '200': {
        description: 'Revision belonging to Notificacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Revision)},
          },
        },
      },
    },
  })
  async getRevision(
    @param.path.string('id') id: typeof Notificacion.prototype.idNotificacion,
  ): Promise<Revision> {
    return this.notificacionRepository.revision(id);
  }
}
