import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {JefeOperaciones} from './jefe-operaciones.model';
import {Propietario} from './propietario.model';
import {Mecanico} from './mecanico.model';

@model()
export class Sede extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idSede?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @hasOne(() => JefeOperaciones)
  jefeOperaciones: JefeOperaciones;

  @property({
    type: 'string',
  })
  jefeOperacionesId?: string;

  @hasMany(() => Propietario)
  private _propietarios: Propietario[];
  public get propietarios(): Propietario[] {
    return this._propietarios;
  }
  public set propietarios(value: Propietario[]) {
    this._propietarios = value;
  }

  @hasMany(() => Mecanico)
  mecanicos: Mecanico[];

  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
