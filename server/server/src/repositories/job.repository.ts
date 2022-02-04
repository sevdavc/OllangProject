import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OllangdatabaseDataSource} from '../datasources';
import {Job, JobRelations} from '../models';

export class JobRepository extends DefaultCrudRepository<
  Job,
  typeof Job.prototype.id,
  JobRelations
> {
  constructor(
    @inject('datasources.ollangdatabase') dataSource: OllangdatabaseDataSource,
  ) {
    super(Job, dataSource);
  }
}
