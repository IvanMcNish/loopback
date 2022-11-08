import {Entity, model, property, hasMany} from '@loopback/repository';
import {Revision} from './revision.model';

@model()
export class Repuesto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idRepuesto: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @hasMany(() => Revision)
  revisions: Revision[];

  @property({
    type: 'string',
  })
  revisionId?: string;

  constructor(data?: Partial<Repuesto>) {
    super(data);
  }
}

export interface RepuestoRelations {
  // describe navigational properties here
}

export type RepuestoWithRelations = Repuesto & RepuestoRelations;
