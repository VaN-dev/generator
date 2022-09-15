import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { <%= functions.capitalize(name) %> } from '../../domain/<%= name %>';
import { <%= functions.capitalize(name) %>Id } from '../../domain/<%= name %>.id';
import { <%= functions.capitalize(name) %>TypeOrmEntity } from './<%= name %>.typeorm.entity';
import { <%= functions.capitalize(namePlural) %>Repository } from '../../domain/<%= namePlural %>.repository.interface';
import { <%= functions.capitalize(namePlural) %>TypeOrmRepository } from './<%= namePlural %>.typeorm.repository';
import { <%= functions.capitalize(name) %>NotFoundError } from '../../domain/errors/<%= name %>-not-found.error';

@Injectable()
export class <%= functions.capitalize(namePlural) %>RepositoryService extends <%= functions.capitalize(namePlural) %>Repository {
  constructor(
    private readonly <%= namePlural %>Repository: <%= functions.capitalize(namePlural) %>TypeOrmRepository
  ) {
    super();
  }
  <% if (['C', 'U'].some(r => crud.includes(r))) { %>
  @Transactional()
  async save(<%= name %>: <%= functions.capitalize(name) %>): Promise<<%= functions.capitalize(name) %>> {
    const created<%= functions.capitalize(name) %> = this.<%= namePlural %>Repository.create(<%= functions.capitalize(name) %>TypeOrmEntity.fromEntity(<%= name %>));
    const saved<%= functions.capitalize(namePlural) %> = await this.<%= namePlural %>Repository.save([created<%= functions.capitalize(name) %>]);

    return <%= functions.capitalize(name) %>TypeOrmEntity.toEntity(saved<%= functions.capitalize(namePlural) %>[0]);
  }
  <% } %>
  <% if (crud.includes('L')) { %>
  async findAll(): Promise<<%= functions.capitalize(name) %>[]> {
    const <%= namePlural %> = await this.<%= namePlural %>Repository.find();

    return <%= namePlural %>.map(<%= functions.capitalize(name) %>TypeOrmEntity.toEntity);
  }
  <% } %>
  async findOneByIdOrFail(id: <%= functions.capitalize(name) %>Id): Promise<<%= functions.capitalize(name) %>> {
    try {
      const found<%= functions.capitalize(name) %> = await this.<%= namePlural %>Repository.findOneOrFail(id.toString());

      return <%= functions.capitalize(name) %>TypeOrmEntity.toEntity(found<%= functions.capitalize(name) %>);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new <%= functions.capitalize(name) %>NotFoundError(id);
      }

      throw error;
    }
  }
  <% if (crud.includes('D')) { %>
  async delete(id: string): Promise<void> {
    await this.<%= namePlural %>Repository.delete(id);
  }
  <% } %>
}
