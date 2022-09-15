import { IDomainEvent, UniqueEntityId } from '@coachhubio/shared-ddd';
import { <%= functions.capitalize(name) %> } from "../<%= name %>";

export class <%= functions.capitalize(name) %>Created implements IDomainEvent {
  public timestamp: Date;
  public <%= name %>: <%= functions.capitalize(name) %>;

  constructor(<%= name %>: <%= functions.capitalize(name) %>) {
    this.timestamp = new Date();
    this.<%= name %> = <%= name %>;
  }

  getAggregateId(): UniqueEntityId {
    return this.<%= name %>.id;
  }
}
