import { <%= functions.capitalize(name) %> } from "./<%= name %>";
import { <%= functions.capitalize(name) %>Id } from "./<%= name %>.id";

export abstract class <%= functions.capitalize(namePlural) %>Repository {<% if (['C', 'U'].some(r => crud.includes(r))) { %>
  abstract save(<%= name %>: <%= functions.capitalize(name) %>): Promise<<%= functions.capitalize(name) %>>;<% } %><% if (crud.includes('L')) { %>
  abstract findAll(): Promise<<%= functions.capitalize(name) %>[]>;<% } %>
  abstract findOneByIdOrFail(id: <%= functions.capitalize(name) %>Id): Promise<<%= functions.capitalize(name) %>>;<% if (crud.includes('D')) { %>
  abstract delete(id: string): Promise<void>;<% } %>
}
