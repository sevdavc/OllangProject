import {TokenService} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Job} from '../models';
import {JobRepository} from '../repositories';

export class JobControllerController {
  constructor(
    @repository(JobRepository)
    public jobRepository : JobRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService
  ) {}

  //Creates a new job
  @post('/jobs/{token}')
  @response(200, {
    description: 'Job model instance',
    content: {'application/json': {schema: getModelSchemaRef(Job)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema:Object
        },
      },
    })
    job: Job,
    @param.path.string('token') token: string,
  ): Promise<Job> {
    const verifiedToken=await this.jwtService.verifyToken(token);
    const newJob={
      name:job.name,
      description:job.description,
      clientId:verifiedToken.id,
      state:true
    }
    return this.jobRepository.create(newJob);
  }

  @get('/jobs/count')
  @response(200, {
    description: 'Job model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Job) where?: Where<Job>,
  ): Promise<Count> {
    return this.jobRepository.count(where);
  }

  @get('/jobs')
  @response(200, {
    description: 'Array of Job model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Job, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Job) filter?: Filter<Job>,
  ): Promise<Job[]> {
    return this.jobRepository.find(filter);
  }

  @patch('/jobs')
  @response(200, {
    description: 'Job PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Job, {partial: true}),
        },
      },
    })
    job: Job,
    @param.where(Job) where?: Where<Job>,
  ): Promise<Count> {
    return this.jobRepository.updateAll(job, where);
  }

  @get('/jobs/{id}')
  @response(200, {
    description: 'Job model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Job, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Job, {exclude: 'where'}) filter?: FilterExcludingWhere<Job>
  ): Promise<Job> {
    return this.jobRepository.findById(id, filter);
  }

  //Updating a jobs attributes (this one is for to assign false to the value of the status of the job)
  @patch('/jobs/{id}')
  @response(204, {
    description: 'Job PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: Object,
        },
      },
    })
    job: Job,
  ): Promise<void> {
    const filter={where: {id:id}}
    const idjob=this.jobRepository.find(filter);
    const freelancer=await this.jwtService.verifyToken(job.freelancerId);
    const newJob={
      id:(await idjob)[0].id,
      name:(await idjob)[0].name,
      description:(await idjob)[0].description,
      clientId:(await idjob)[0].clientId,
      state:false,
      freelancerId:freelancer.id,
    }
    await this.jobRepository.updateById(id, newJob);
  }

  @put('/jobs/{id}')
  @response(204, {
    description: 'Job PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() job: Job,
  ): Promise<void> {
    await this.jobRepository.replaceById(id, job);
  }

  @del('/jobs/{id}')
  @response(204, {
    description: 'Job DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.jobRepository.deleteById(id);
  }

  //Returns the client's jobs (for client dashboard)
  @get('/jobs/client/{token}')
  @response(200, {
    description: 'Client job filter',
    content: {'application/json': {schema: getModelSchemaRef(Job, {partial: true})}},
  })
  async getclientjobs(
    @param.path.string('token') token: string,
  ): Promise<Job[]> {
    const verifiedToken = await this.jwtService.verifyToken(token);
    const filter={where: {clientId:verifiedToken.id}}
    return this.jobRepository.find(filter);
  }

  //returns jobs with status true (for freelancer dashboard)
  @get('/jobs/freelancer')
  @response(200, {
    description: 'Client job filter',
    content: {'application/json': {schema: getModelSchemaRef(Job, {partial: true})}},
  })
  async getfreelancejobs(
  ): Promise<Job[]> {
    const filter={where: {state:true}}
    return this.jobRepository.find(filter);
  }
}
