import { EventsHandler } from '@nestjs/cqrs';
import { <%= functions.capitalize(name) %>Created } from "../domain/events/<%= name %>-created";

@EventsHandler(<%= functions.capitalize(name) %>Created)
export class <%= functions.capitalize(name) %>EventListener {
  handle(event: <%= functions.capitalize(name) %>Created) {
    console.log('<%= name %> created', event.getAggregateId());
  }
}
