import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Revision,
  Mecanico,
} from '../models';
import {RevisionRepository} from '../repositories';

export class RevisionMecanicoController {
  constructor(
    @repository(RevisionRepository) protected revisionRepository: RevisionRepository,
  ) { }

  @get('/revisions/{id}/mecanico', {
    responses: {
      '200': {
        description: 'Revision has one Mecanico',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Mecanico),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mecanico>,
  ): Promise<Mecanico> {
    return this.revisionRepository.mecanico(id).get(filter);
  }

  @post('/revisions/{id}/mecanico', {
    responses: {
      '200': {
        description: 'Revision model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mecanico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Revision.prototype.idRevision,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanico, {
            title: 'NewMecanicoInRevision',
            exclude: ['idMecanico'],
            optional: ['revisionId']
          }),
        },
      },
    }) mecanico: Omit<Mecanico, 'idMecanico'>,
  ): Promise<Mecanico> {
    return this.revisionRepository.mecanico(id).create(mecanico);
  }

  @patch('/revisions/{id}/mecanico', {
    responses: {
      '200': {
        description: 'Revision.Mecanico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanico, {partial: true}),
        },
      },
    })
    mecanico: Partial<Mecanico>,
    @param.query.object('where', getWhereSchemaFor(Mecanico)) where?: Where<Mecanico>,
  ): Promise<Count> {
    return this.revisionRepository.mecanico(id).patch(mecanico, where);
  }

  @del('/revisions/{id}/mecanico', {
    responses: {
      '200': {
        description: 'Revision.Mecanico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mecanico)) where?: Where<Mecanico>,
  ): Promise<Count> {
    return this.revisionRepository.mecanico(id).delete(where);
  }
}
