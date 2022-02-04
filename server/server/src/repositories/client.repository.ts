import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OllangdatabaseDataSource} from '../datasources';
import {Client, ClientRelations} from '../models';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {
  constructor(
    @inject('datasources.ollangdatabase') dataSource: OllangdatabaseDataSource,
  ) {
    super(Client, dataSource);
  }
}
