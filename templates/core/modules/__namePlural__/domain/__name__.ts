import { AggregateRoot, UniqueEntityId } from '@coachhubio/shared-ddd';
import { <%= functions.capitalize(name) %>Id } from "./<%= name %>.id";<% if (useEvents) {%>
import { <%= functions.capitalize(name) %>Created } from "./events/<%= name %>-created";<% } %>

export interface <%= functions.capitalize(name) %>Props {<% for (const property of properties) { %>
  <%= property.name %>: <%= property.type %>;<% } %>
}

export class <%= functions.capitalize(name) %> extends AggregateRoot<<%= functions.capitalize(name) %>Props> {
  public static create(props: <%= functions.capitalize(name) %>Props, id?: <%= functions.capitalize(name) %>Id): <%= functions.capitalize(name) %> {<% if (useEvents) {%>
    const isNew<%= functions.capitalize(name) %> = !!id === false;<% } %>
    const <%= name %> = new <%= functions.capitalize(name) %>({ ...props }, id);
    <% if (useEvents) {%>
    if (isNew<%= functions.capitalize(name) %>) {
      <%= name %>.emitDomainEvent(new <%= functions.capitalize(name) %>Created(<%= name %>));
    }<% } %>

    return <%= name %>;
  }

  private constructor(props: <%= functions.capitalize(name) %>Props, id?: UniqueEntityId) {
    super(props, id ? id : <%= functions.capitalize(name) %>Id.create());
  }

  <% for (const property of properties) { %>
  public update<%= functions.capitalize(property.name) %>(<%= property.name %>: <%= property.type %>) {
    this.props.<%= property.name %> = <%= property.name %>;
  }<% } %>
}
