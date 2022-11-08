import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Propietario} from './propietario.model';
import {Revision} from './revision.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idPlaca: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'number',
    required: true,
  })
  anio: number;

  @property({
    type: 'number',
    required: true,
  })
  capacidadPasajeros: number;

  @property({
    type: 'string',
    required: true,
  })
  cilindraje: string;

  @property({
    type: 'string',
    required: true,
  })
  paisOrigen: string;

  @property({
    type: 'string',
    required: true,
  })
  accesorios: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @hasMany(() => Revision)
  revisions: Revision[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
