import {TokenService} from '@loopback/authentication';
import {
  MyUserService, TokenServiceBindings, User, UserServiceBindings
} from '@loopback/authentication-jwt';
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
import {SecurityBindings, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import {Freelancer} from '../models';
import {FreelancerRepository} from '../repositories';

export class FreelancerControllerController {
  constructor(
    @repository(FreelancerRepository)
    public freelancerRepository : FreelancerRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
  ) {}

  @post('/freelancers')
  @response(200, {
    description: 'Client model instance',
    content: {'application/json': {schema: getModelSchemaRef(Freelancer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Freelancer, {
            title: 'NewClient',
            exclude: ['id'],
          }),
        },
      },
    })
    client: Omit<Freelancer, 'id'>,
  ): Promise<Freelancer> {
    const Salt=await genSalt();
    const password = await hash(client.password, Salt);
    const newClient={
      name: client.name,
      email:client.email,
      password:password,
      jobs:[],
      salt:Salt,
    }
    return this.freelancerRepository.create(newClient);
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

  @post('/freelancers/whoIam')
  @response(200, {
    description: 'Freelancer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Freelancer)}},
  })
  async verifyingToken(
    @requestBody({
      content: {
        'text/plain':{}
      },
    })
    token: string,
    @param.filter(Freelancer, {exclude: 'where'}) filter?: FilterExcludingWhere<Freelancer>
  ): Promise<Object> {
    const gettoken = await this.jwtService.verifyToken(token);
    const client=this.freelancerRepository.findById(gettoken.id, filter);
    const info={
      id:(await client).id,
      name:(await client).name,
      email:(await client).email
    }
    return info;
  }

  @post('/freelancers/password')
  @response(200, {
    description: 'Client model instance',
    content: {'application/json': {schema: getModelSchemaRef(Freelancer)}},
  })
  async generatePassword(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Freelancer, {
            title: 'NewClient',
            exclude: ['id'],
          }),
        },
      },
    })
    client: Omit<Freelancer, 'id'>,
  ): Promise<String> {

    const password = await hash(client.password, client.salt);
    return password;
  }

  @post('/freelancers/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Freelancer, {partial: true}),
        },
      },
    }) credentials: User,
  ): Promise<String> {
    const userProfile = this.userService.convertToUserProfile(credentials);
    const token = await this.jwtService.generateToken(userProfile);
    return token;
  }

}
