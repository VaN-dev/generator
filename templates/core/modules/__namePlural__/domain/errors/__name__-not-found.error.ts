import { <%= functions.capitalize(name) %>Id } from '../<%= name %>.id';

export class <%= functions.capitalize(name) %>NotFoundError extends Error {
  constructor(<%= name %>Id: <%= functions.capitalize(name) %>Id) {
    super(`<%= functions.capitalize(name) %> ${<%= name %>Id} not found`);
  }
}
