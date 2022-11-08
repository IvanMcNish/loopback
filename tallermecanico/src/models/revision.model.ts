import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Repuesto} from './repuesto.model';
import {Vehiculo} from './vehiculo.model';
import {Mecanico} from './mecanico.model';
import {Notificacion} from './notificacion.model';
import {JefeOperaciones} from './jefe-operaciones.model';

@model()
export class Revision extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idRevision?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'date',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones?: string;

  @property({
    type: 'string',
  })
  repuestoId?: string;

  @hasMany(() => Repuesto)
  repuestos: Repuesto[];

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @hasOne(() => Mecanico)
  mecanico: Mecanico;

  @property({
    type: 'string',
  })
  mecanicoId?: string;

  @hasMany(() => Notificacion)
  notificacions: Notificacion[];

  @hasOne(() => JefeOperaciones)
  jefeOperaciones: JefeOperaciones;

  @property({
    type: 'string',
  })
  jefeOperacionesId?: string;

  constructor(data?: Partial<Revision>) {
    super(data);
  }
}

export interface RevisionRelations {
  // describe navigational properties here
}

export type RevisionWithRelations = Revision & RevisionRelations;
