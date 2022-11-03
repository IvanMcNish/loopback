import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Propietario,
  Sede,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioSedeController {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/sede', {
    responses: {
      '200': {
        description: 'Sede belonging to Propietario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sede)},
          },
        },
      },
    },
  })
  async getSede(
    @param.path.string('id') id: typeof Propietario.prototype.idPropietario,
  ): Promise<Sede> {
    return this.propietarioRepository.sede(id);
  }
}
