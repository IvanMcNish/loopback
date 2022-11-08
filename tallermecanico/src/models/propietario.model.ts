import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Sede} from './sede.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Propietario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idPropietario: string;

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
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @belongsTo(() => Sede)
  sedeId: string;

  @hasOne(() => Vehiculo)
  vehiculo: Vehiculo;

  constructor(data?: Partial<Propietario>) {
    super(data);
  }
}

export interface PropietarioRelations {
  // describe navigational properties here
}

export type PropietarioWithRelations = Propietario & PropietarioRelations;
