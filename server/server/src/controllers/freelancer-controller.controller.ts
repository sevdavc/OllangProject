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
  response,
} from '@loopback/rest';
import {Freelancer} from '../models';
import {FreelancerRepository} from '../repositories';

export class FreelancerControllerController {
  constructor(
    @repository(FreelancerRepository)
    public freelancerRepository : FreelancerRepository,
  ) {}

  @post('/freelancers')
  @response(200, {
    description: 'Freelancer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Freelancer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Freelancer, {
            title: 'NewFreelancer',
            exclude: ['id'],
          }),
        },
      },
    })
    freelancer: Omit<Freelancer, 'id'>,
  ): Promise<Freelancer> {
    return this.freelancerRepository.create(freelancer);
  }

  @get('/freelancers/count')
  @response(200, {
    description: 'Freelancer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Freelancer) where?: Where<Freelancer>,
  ): Promise<Count> {
    return this.freelancerRepository.count(where);
  }

  @get('/freelancers')
  @response(200, {
    description: 'Array of Freelancer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Freelancer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Freelancer) filter?: Filter<Freelancer>,
  ): Promise<Freelancer[]> {
    return this.freelancerRepository.find(filter);
  }

  @patch('/freelancers')
  @response(200, {
    description: 'Freelancer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Freelancer, {partial: true}),
        },
      },
    })
    freelancer: Freelancer,
    @param.where(Freelancer) where?: Where<Freelancer>,
  ): Promise<Count> {
    return this.freelancerRepository.updateAll(freelancer, where);
  }

  @get('/freelancers/{id}')
  @response(200, {
    description: 'Freelancer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Freelancer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Freelancer, {exclude: 'where'}) filter?: FilterExcludingWhere<Freelancer>
  ): Promise<Freelancer> {
    return this.freelancerRepository.findById(id, filter);
  }

  @patch('/freelancers/{id}')
  @response(204, {
    description: 'Freelancer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Freelancer, {partial: true}),
        },
      },
    })
    freelancer: Freelancer,
  ): Promise<void> {
    await this.freelancerRepository.updateById(id, freelancer);
  }

  @put('/freelancers/{id}')
  @response(204, {
    description: 'Freelancer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() freelancer: Freelancer,
  ): Promise<void> {
    await this.freelancerRepository.replaceById(id, freelancer);
  }

  @del('/freelancers/{id}')
  @response(204, {
    description: 'Freelancer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.freelancerRepository.deleteById(id);
  }
}
