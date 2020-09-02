import {DefaultCrudRepository} from '@loopback/repository';
import {Division, DivisionRelations} from '../models';
import {ApihrDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DivisionRepository extends DefaultCrudRepository<
  Division,
  typeof Division.prototype.id,
  DivisionRelations
> {
  constructor(
    @inject('datasources.apihrDS') dataSource: ApihrDsDataSource,
  ) {
    super(Division, dataSource);
  }
}
