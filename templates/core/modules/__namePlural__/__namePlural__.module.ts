import { CqrsModule<% if (useEvents) { %>, EventPublisher<% } %> } from '@nestjs/cqrs';<% if (useEvents) { %>
import { TypeOrmSubscriptionModule } from '@coachhubio/nestjs-typeorm-subscription';<% } %>
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';<% if (useEvents) { %>
import { Connection } from 'typeorm';<% } %><% if (crud.includes('C')) { %>
import { Create<%= functions.capitalize(name) %>UseCase } from './usecases/<%= namePlural %>/create-<%= name %>/create-<%= name %>.usecase';<% } %>
import { <%= functions.capitalize(namePlural) %>TypeOrmRepository } from './infra/database/<%= namePlural %>.typeorm.repository';
import { <%= functions.capitalize(namePlural) %>Repository } from './domain/<%= namePlural %>.repository.interface';
import { <%= functions.capitalize(namePlural) %>RepositoryService } from './infra/database/<%= namePlural %>.repository';
import { <%= functions.capitalize(namePlural) %>Controller } from './infra/controllers/<%= namePlural %>.controller';<% if (useEvents) { %>
import { <%= functions.capitalize(namePlural) %>EventSubscriber } from './infra/database/<%= namePlural %>-typeorm-events-subscriber';<% } %><% if (useEvents) { %>
import { <%= functions.capitalize(name) %>EventListener } from './infra/<%= name %>-events-listener';<% } %><% if (crud.includes('L')) { %>
import { GetAll<%= functions.capitalize(namePlural) %>UseCase } from './usecases/<%= namePlural %>/get-all-<%= namePlural %>/get-all-<%= namePlural %>.usecase';<% } %><% if (['R', 'D'].some(r => crud.includes(r))) { %>
import { Get<%= functions.capitalize(name) %>UseCase } from './usecases/<%= namePlural %>/get-<%= name %>/get-<%= name %>.usecase';<% } %><% if (crud.includes('U')) { %>
import { Edit<%= functions.capitalize(name) %>UseCase } from './usecases/<%= namePlural %>/edit-<%= name %>/edit-<%= name %>.usecase';<% } %><% if (crud.includes('D')) { %>
import { Delete<%= functions.capitalize(name) %>UseCase } from './usecases/<%= namePlural %>/delete-<%= name %>/delete-<%= name %>.usecase';<% } %>

export const <%= name %>UseCases = [<% if (crud.includes('C')) { %>
  Create<%= functions.capitalize(name) %>UseCase,<% } %><% if (crud.includes('L')) { %>
  GetAll<%= functions.capitalize(namePlural) %>UseCase,<% } %><% if (['R', 'D'].some(r => crud.includes(r))) { %>
  Get<%= functions.capitalize(name) %>UseCase,<% } %><% if (crud.includes('U')) { %>
  Edit<%= functions.capitalize(name) %>UseCase,<% } %><% if (crud.includes('D')) { %>
  Delete<%= functions.capitalize(name) %>UseCase,<% } %>
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([<%= functions.capitalize(namePlural) %>TypeOrmRepository]),<% if (useEvents) { %>
    TypeOrmSubscriptionModule.registerAsync({
      imports: [CqrsModule],
      inject: [Connection, EventPublisher],
      useFactory: (connection, publisher) => ({
        subscriberClass: new <%= functions.capitalize(namePlural) %>EventSubscriber(publisher),
        connection,
      }),
    }),<% } %>
  ],
  providers: [
    {
      provide: <%= functions.capitalize(namePlural) %>Repository,
      useClass: <%= functions.capitalize(namePlural) %>RepositoryService,
    },<% if (useEvents) { %>
    <%= functions.capitalize(name) %>EventListener,<% } %>
    ...<%= name %>UseCases,
  ],
  controllers: [<%= functions.capitalize(namePlural) %>Controller],
  exports: [<%= functions.capitalize(namePlural) %>Repository],
})
export class <%= functions.capitalize(namePlural) %>Module {}
