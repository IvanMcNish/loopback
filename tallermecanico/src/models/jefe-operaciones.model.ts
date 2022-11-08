import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Sede} from './sede.model';
import {Revision} from './revision.model';

@model()
export class JefeOperaciones extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idJefe: string;

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

  @property({
    type: 'string',
  })
  sedeId?: string;

  @hasOne(() => Sede)
  sede: Sede;

  @property({
    type: 'string',
  })
  revisionId?: string;

  @hasMany(() => Revision)
  revisions: Revision[];

  constructor(data?: Partial<JefeOperaciones>) {
    super(data);
  }
}

export interface JefeOperacionesRelations {
  // describe navigational properties here
}

export type JefeOperacionesWithRelations = JefeOperaciones & JefeOperacionesRelations;
