import {authenticate, TokenService} from '@loopback/authentication';
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
import {Ticket} from '../models/ticket.model';
import {TicketRepository} from '../repositories/ticket.repository';

export class TicketControllerController {
  constructor(
    @repository(TicketRepository)
    public ticketRepository : TicketRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
  ) {}

  //Creating a new ticket
  @authenticate.skip()
  @post('/tickets')
  @response(200, {
    description: 'Ticket model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ticket)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: Object
        },
      },
    })
    ticket: Ticket
  ): Promise<Ticket> {
    const verified=await this.jwtService.verifyToken(ticket.freelancerId);
    const newTicket={
      price:ticket.price,
      description:ticket.description,
      jobId:ticket.jobId,
      freelancerId:verified.id
    }
    return this.ticketRepository.create(newTicket);
  }

  @get('/tickets/count')
  @response(200, {
    description: 'Ticket model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ticket) where?: Where<Ticket>,
  ): Promise<Count> {
    return this.ticketRepository.count(where);
  }

  @get('/tickets')
  @response(200, {
    description: 'Array of Ticket model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ticket, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ticket) filter?: Filter<Ticket>,
  ): Promise<Ticket[]> {
    return this.ticketRepository.find(filter);
  }

  @patch('/tickets')
  @response(200, {
    description: 'Ticket PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticket, {partial: true}),
        },
      },
    })
    ticket: Ticket,
    @param.where(Ticket) where?: Where<Ticket>,
  ): Promise<Count> {
    return this.ticketRepository.updateAll(ticket, where);
  }

  @get('/tickets/{id}')
  @response(200, {
    description: 'Ticket model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ticket, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ticket, {exclude: 'where'}) filter?: FilterExcludingWhere<Ticket>
  ): Promise<Ticket> {
    return this.ticketRepository.findById(id, filter);
  }

  @patch('/tickets/{id}')
  @response(204, {
    description: 'Ticket PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticket, {partial: true}),
        },
      },
    })
    ticket: Ticket,
  ): Promise<void> {
    await this.ticketRepository.updateById(id, ticket);
  }

  @put('/tickets/{id}')
  @response(204, {
    description: 'Ticket PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ticket: Ticket,
  ): Promise<void> {
    await this.ticketRepository.replaceById(id, ticket);
  }

  @del('/tickets/{id}')
  @response(204, {
    description: 'Ticket DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ticketRepository.deleteById(id);
  }

  //Gets the tickets of the job
  @get('/tickets/jobs/{id}')
  @response(200, {
    description: 'Ticket model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ticket, {includeRelations: true}),
      },
    },
  })
  async findByJobId(
    @param.path.string('id') id: string,
  ): Promise<Ticket[]> {
    const filter={where: {jobId:id}}
    return this.ticketRepository.find(filter);
  }
}
