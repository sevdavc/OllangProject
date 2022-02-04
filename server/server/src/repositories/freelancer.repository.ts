import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OllangdatabaseDataSource} from '../datasources';
import {Freelancer, FreelancerRelations} from '../models';

export class FreelancerRepository extends DefaultCrudRepository<
  Freelancer,
  typeof Freelancer.prototype.id,
  FreelancerRelations
> {
  constructor(
    @inject('datasources.ollangdatabase') dataSource: OllangdatabaseDataSource,
  ) {
    super(Freelancer, dataSource);
  }
}
