import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Division} from '../models';
import {DivisionRepository} from '../repositories';

export class DivisionController {
  constructor(
    @repository(DivisionRepository)
    public divisionRepository : DivisionRepository,
  ) {}

  @post('/division', {
    responses: {
      '200': {
        description: 'Division model instance',
        content: {'application/json': {schema: getModelSchemaRef(Division)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Division, {
            title: 'NewDivision',
            exclude: ['id'],
          }),
        },
      },
    })
    division: Omit<Division, 'id'>,
  ): Promise<Division> {
    return this.divisionRepository.create(division);
  }

  @get('/division/count', {
    responses: {
      '200': {
        description: 'Division model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Division) where?: Where<Division>,
  ): Promise<Count> {
    return this.divisionRepository.count(where);
  }

  @get('/division', {
    responses: {
      '200': {
        description: 'Array of Division model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Division, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Division) filter?: Filter<Division>,
  ): Promise<Division[]> {
    return this.divisionRepository.find(filter);
  }

  @patch('/division', {
    responses: {
      '200': {
        description: 'Division PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Division, {partial: true}),
        },
      },
    })
    division: Division,
    @param.where(Division) where?: Where<Division>,
  ): Promise<Count> {
    return this.divisionRepository.updateAll(division, where);
  }

  @get('/division/{id}', {
    responses: {
      '200': {
        description: 'Division model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Division, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Division, {exclude: 'where'}) filter?: FilterExcludingWhere<Division>
  ): Promise<Division> {
    return this.divisionRepository.findById(id, filter);
  }

  @patch('/division/{id}', {
    responses: {
      '204': {
        description: 'Division PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Division, {partial: true}),
        },
      },
    })
    division: Division,
  ): Promise<void> {
    await this.divisionRepository.updateById(id, division);
  }

  @put('/division/{id}', {
    responses: {
      '204': {
        description: 'Division PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() division: Division,
  ): Promise<void> {
    await this.divisionRepository.replaceById(id, division);
  }

  @del('/division/{id}', {
    responses: {
      '204': {
        description: 'Division DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.divisionRepository.deleteById(id);
  }
}
