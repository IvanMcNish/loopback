import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Revision} from './revision.model';

@model()
export class Notificacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idNotificacion?: string;

  @property({
    type: 'date',
    required: true,
  })
  hora: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;

  @belongsTo(() => Revision)
  revisionId: string;

  constructor(data?: Partial<Notificacion>) {
    super(data);
  }
}

export interface NotificacionRelations {
  // describe navigational properties here
}

export type NotificacionWithRelations = Notificacion & NotificacionRelations;
