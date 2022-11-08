import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Revision, RevisionRelations, Repuesto, Vehiculo, Mecanico, Notificacion, JefeOperaciones} from '../models';
import {RepuestoRepository} from './repuesto.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {MecanicoRepository} from './mecanico.repository';
import {NotificacionRepository} from './notificacion.repository';
import {JefeOperacionesRepository} from './jefe-operaciones.repository';

export class RevisionRepository extends DefaultCrudRepository<
  Revision,
  typeof Revision.prototype.idRevision,
  RevisionRelations
> {

  public readonly repuestos: HasManyRepositoryFactory<Repuesto, typeof Revision.prototype.idRevision>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Revision.prototype.idRevision>;

  public readonly mecanico: HasOneRepositoryFactory<Mecanico, typeof Revision.prototype.idRevision>;

  public readonly notificacions: HasManyRepositoryFactory<Notificacion, typeof Revision.prototype.idRevision>;

  public readonly jefeOperaciones: HasOneRepositoryFactory<JefeOperaciones, typeof Revision.prototype.idRevision>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('RepuestoRepository') protected repuestoRepositoryGetter: Getter<RepuestoRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('MecanicoRepository') protected mecanicoRepositoryGetter: Getter<MecanicoRepository>, @repository.getter('NotificacionRepository') protected notificacionRepositoryGetter: Getter<NotificacionRepository>, @repository.getter('JefeOperacionesRepository') protected jefeOperacionesRepositoryGetter: Getter<JefeOperacionesRepository>,
  ) {
    super(Revision, dataSource);
    this.jefeOperaciones = this.createHasOneRepositoryFactoryFor('jefeOperaciones', jefeOperacionesRepositoryGetter);
    this.registerInclusionResolver('jefeOperaciones', this.jefeOperaciones.inclusionResolver);
    this.notificacions = this.createHasManyRepositoryFactoryFor('notificacions', notificacionRepositoryGetter,);
    this.registerInclusionResolver('notificacions', this.notificacions.inclusionResolver);
    this.mecanico = this.createHasOneRepositoryFactoryFor('mecanico', mecanicoRepositoryGetter);
    this.registerInclusionResolver('mecanico', this.mecanico.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.repuestos = this.createHasManyRepositoryFactoryFor('repuestos', repuestoRepositoryGetter,);
    this.registerInclusionResolver('repuestos', this.repuestos.inclusionResolver);
  }
}
