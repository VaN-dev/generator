import { Column, Entity } from 'typeorm';
import { BaseTypeOrmEntity } from '../../../../shared/infra/database/base.typeorm.entity';
import {<%= functions.capitalize(name) %>} from "../../domain/<%= name %>";
import {<%= functions.capitalize(name) %>Id} from "../../domain/<%= name %>.id";

@Entity('<%= name %>')
export class <%= functions.capitalize(name) %>TypeOrmEntity extends BaseTypeOrmEntity {
  static fromEntity({ id, props }: <%= functions.capitalize(name) %>): <%= functions.capitalize(name) %>TypeOrmEntity {
    return new <%= functions.capitalize(name) %>TypeOrmEntity({
      id: id.toString(),<% for (const property of properties) { %>
      <%= property.name %>: props.<%= property.name %>,
      <% } %>});
  }

  static toEntity(<%= name %>Entity: <%= functions.capitalize(name) %>TypeOrmEntity): <%= functions.capitalize(name) %> {
    return <%= functions.capitalize(name) %>.create({<% for (const property of properties) { %>
      <%= property.name %>: <%= name %>Entity.<%= property.name %>,
    <% } %>}, <%= functions.capitalize(name) %>Id.fromString(<%= name %>Entity.id)
    );
  }

  <% for (const property of properties) { %>
  @Column({ length: 100 })
  <%= property.name %>: <%= property.type %>;
  <% } %>

  constructor(props: Partial<<%= functions.capitalize(name) %>TypeOrmEntity>) {
    super();
    Object.assign(this, props);
  }
}
