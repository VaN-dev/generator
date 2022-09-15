import { ApiProperty } from '@nestjs/swagger';
import { <%= [...new Set(properties
    .filter((property) => ['string', 'number', 'boolean', 'array', 'Date'].includes(property.type))
    .map(p => `Is${functions.capitalize(p.type)}`)
)].join(', ') %> } from 'class-validator';

export class Create<%= functions.capitalize(name) %>Dto {
  <% for (const property of properties) { %>
  @ApiProperty({
    description: '<%= property.name %> of the <%= name %>',
  })<% if (['string', 'number', 'boolean', 'array', 'Date'].includes(property.type)) { %>
  @Is<%= functions.capitalize(property.type) %>()<% } %>
  readonly <%= property.name %>: <%= property.type %>;
  <% } %>
}
