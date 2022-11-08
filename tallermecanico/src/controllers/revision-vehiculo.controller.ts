import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Revision,
  Vehiculo,
} from '../models';
import {RevisionRepository} from '../repositories';

export class RevisionVehiculoController {
  constructor(
    @repository(RevisionRepository)
    public revisionRepository: RevisionRepository,
  ) { }

  @get('/revisions/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Revision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Revision.prototype.idRevision,
  ): Promise<Vehiculo> {
    return this.revisionRepository.vehiculo(id);
  }
}
