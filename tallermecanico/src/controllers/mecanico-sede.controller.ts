import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mecanico,
  Sede,
} from '../models';
import {MecanicoRepository} from '../repositories';

export class MecanicoSedeController {
  constructor(
    @repository(MecanicoRepository)
    public mecanicoRepository: MecanicoRepository,
  ) { }

  @get('/mecanicos/{id}/sede', {
    responses: {
      '200': {
        description: 'Sede belonging to Mecanico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sede)},
          },
        },
      },
    },
  })
  async getSede(
    @param.path.string('id') id: typeof Mecanico.prototype.idMecanico,
  ): Promise<Sede> {
    return this.mecanicoRepository.sede(id);
  }
}
