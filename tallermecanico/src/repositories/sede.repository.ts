import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sede, SedeRelations, JefeOperaciones, Propietario, Mecanico} from '../models';
import {JefeOperacionesRepository} from './jefe-operaciones.repository';
import {PropietarioRepository} from './propietario.repository';
import {MecanicoRepository} from './mecanico.repository';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.idSede,
  SedeRelations
> {

  public readonly jefeOperaciones: HasOneRepositoryFactory<JefeOperaciones, typeof Sede.prototype.idSede>;

  public readonly propietarios: HasManyRepositoryFactory<Propietario, typeof Sede.prototype.idSede>;

  public readonly mecanicos: HasManyRepositoryFactory<Mecanico, typeof Sede.prototype.idSede>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('JefeOperacionesRepository') protected jefeOperacionesRepositoryGetter: Getter<JefeOperacionesRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('MecanicoRepository') protected mecanicoRepositoryGetter: Getter<MecanicoRepository>,
  ) {
    super(Sede, dataSource);
    this.mecanicos = this.createHasManyRepositoryFactoryFor('mecanicos', mecanicoRepositoryGetter,);
    this.registerInclusionResolver('mecanicos', this.mecanicos.inclusionResolver);
    this.propietarios = this.createHasManyRepositoryFactoryFor('propietarios', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietarios', this.propietarios.inclusionResolver);
    this.jefeOperaciones = this.createHasOneRepositoryFactoryFor('jefeOperaciones', jefeOperacionesRepositoryGetter);
    this.registerInclusionResolver('jefeOperaciones', this.jefeOperaciones.inclusionResolver);
  }
}
