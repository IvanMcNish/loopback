import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {JefeOperaciones, JefeOperacionesRelations, Sede, Revision} from '../models';
import {SedeRepository} from './sede.repository';
import {RevisionRepository} from './revision.repository';

export class JefeOperacionesRepository extends DefaultCrudRepository<
  JefeOperaciones,
  typeof JefeOperaciones.prototype.idJefe,
  JefeOperacionesRelations
> {

  public readonly sede: HasOneRepositoryFactory<Sede, typeof JefeOperaciones.prototype.idJefe>;

  public readonly revisions: HasManyRepositoryFactory<Revision, typeof JefeOperaciones.prototype.idJefe>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(JefeOperaciones, dataSource);
    this.revisions = this.createHasManyRepositoryFactoryFor('revisions', revisionRepositoryGetter,);
    this.registerInclusionResolver('revisions', this.revisions.inclusionResolver);
    this.sede = this.createHasOneRepositoryFactoryFor('sede', sedeRepositoryGetter);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
