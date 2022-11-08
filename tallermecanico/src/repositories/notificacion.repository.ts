import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Notificacion, NotificacionRelations, Revision} from '../models';
import {RevisionRepository} from './revision.repository';

export class NotificacionRepository extends DefaultCrudRepository<
  Notificacion,
  typeof Notificacion.prototype.idNotificacion,
  NotificacionRelations
> {

  public readonly revision: BelongsToAccessor<Revision, typeof Notificacion.prototype.idNotificacion>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(Notificacion, dataSource);
    this.revision = this.createBelongsToAccessorFor('revision', revisionRepositoryGetter,);
    this.registerInclusionResolver('revision', this.revision.inclusionResolver);
  }
}
