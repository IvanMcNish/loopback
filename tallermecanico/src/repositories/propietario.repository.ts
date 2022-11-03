import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Sede, Vehiculo} from '../models';
import {SedeRepository} from './sede.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.idPropietario,
  PropietarioRelations
> {

  public readonly sede: BelongsToAccessor<Sede, typeof Propietario.prototype.idPropietario>;

  public readonly vehiculo: HasOneRepositoryFactory<Vehiculo, typeof Propietario.prototype.idPropietario>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Propietario, dataSource);
    this.vehiculo = this.createHasOneRepositoryFactoryFor('vehiculo', vehiculoRepositoryGetter);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
