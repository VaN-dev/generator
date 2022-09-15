import { ApiProperty } from '@nestjs/swagger';
import { <%= functions.capitalize(name) %> } from "../../domain/<%= name %>";

export class Get<%= functions.capitalize(name) %>Dto {
  static fromEntity({ id, props }: <%= functions.capitalize(name) %>): Get<%= functions.capitalize(name) %>Dto {
    return {
      id: id.toString(),
      ...props,
    };
  }

  @ApiProperty({ example: '<%= name %>-806a6860-ea25-47f9-8fd7-b20ac6094bcb', description: 'The ID of the <%= name %>' })
  id?: string;
  <% for (const property of properties) { %>
  @ApiProperty({ example: 'New <%= name %>', description: 'Title of the <%= name %>' })
  <%= property.name %>: <%= property.type %>;
  <% } %>
}
