import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OllangdatabaseDataSource} from '../datasources';
import {Ticket, TicketRelations} from '../models/ticket.model';

export class TicketRepository extends DefaultCrudRepository<
  Ticket,
  typeof Ticket.prototype.id,
  TicketRelations
> {
  constructor(
    @inject('datasources.ollangdatabase') dataSource: OllangdatabaseDataSource,
  ) {
    super(Ticket, dataSource);
  }
}
