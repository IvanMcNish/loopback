import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Sede} from './sede.model';
import {Revision} from './revision.model';

@model()
export class Mecanico extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idMecanico: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasenia: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  nivelEstudio: string;

  @belongsTo(() => Sede)
  sedeId: string;

  @property({
    type: 'string',
  })
  revisionId?: string;

  @hasMany(() => Revision)
  revisions: Revision[];

  constructor(data?: Partial<Mecanico>) {
    super(data);
  }
}

export interface MecanicoRelations {
  // describe navigational properties here
}

export type MecanicoWithRelations = Mecanico & MecanicoRelations;
