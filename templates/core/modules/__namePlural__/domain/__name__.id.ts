import { UniqueEntityId } from '@coachhubio/shared-ddd';
import { uuid } from 'short-uuid';

export class <%= functions.capitalize(name) %>Id extends UniqueEntityId {
  static PREFIX = '<%= prefix %>';
  static fromString(id: string) {
    return new <%= functions.capitalize(name) %>Id(id);
  }
  static create(): <%= functions.capitalize(name) %>Id {
    return new <%= functions.capitalize(name) %>Id(`${<%= functions.capitalize(name) %>Id.PREFIX}-${uuid()}`);
  }
  private constructor(id: string) {
    super(id);
  }
}
