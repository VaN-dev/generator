import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { <%= functions.capitalize(name) %>TypeOrmEntity } from "./<%= name %>.typeorm.entity";

@EntityRepository(<%= functions.capitalize(name) %>TypeOrmEntity)
export class <%= functions.capitalize(namePlural) %>TypeOrmRepository extends BaseRepository<<%= functions.capitalize(name) %>TypeOrmEntity> {}
