import { EntityEventSubscriber } from '@coachhubio/nestjs-typeorm-subscription';
import { DomainEvents } from '@coachhubio/shared-ddd';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { <%= functions.capitalize(name) %>TypeOrmEntity } from './<%= name %>.typeorm.entity';
import { <%= functions.capitalize(name) %>Id } from '../../domain/<%= name %>.id';

@Injectable()
export class <%= functions.capitalize(namePlural) %>EventSubscriber extends EntityEventSubscriber<<%= functions.capitalize(name) %>TypeOrmEntity> {
  constructor(private readonly publisher: EventPublisher) {
    super(<%= functions.capitalize(name) %>TypeOrmEntity);
  }

  inserted(entity: <%= functions.capitalize(name) %>TypeOrmEntity): void | Promise<void> {
    DomainEvents.dispatchEventsForAggregate(<%= functions.capitalize(name) %>Id.fromString(entity.id), this.publisher);
  }

  updated(entity: <%= functions.capitalize(name) %>TypeOrmEntity): void | Promise<void> {
    DomainEvents.dispatchEventsForAggregate(<%= functions.capitalize(name) %>Id.fromString(entity.id), this.publisher);
  }
}
