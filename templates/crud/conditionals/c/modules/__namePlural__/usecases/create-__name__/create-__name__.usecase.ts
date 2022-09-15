import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './create-survey.dto';
import { Get<%= functions.capitalize(name) %>Dto } from '../../../app/dto/get-<%= name %>.dto';
import { <%= functions.capitalize(name) %> } from '../../../domain/<%= name %>';
import { <%= functions.capitalize(namePlural) %>Repository } from '../../../domain/<%= namePlural %>.repository.interface';

@Injectable()
export class Create<%= functions.capitalize(name) %>UseCase {
  constructor(readonly <%= namePlural %>Repository: <%= functions.capitalize(namePlural) %>Repository) {}

  async execute(dto: Create<%= functions.capitalize(name) %>Dto): Promise<Get<%= functions.capitalize(name) %>Dto> {
    // if required, contain any additional validation logic here

    const <%= name %> = <%= functions.capitalize(name) %>.create({
      <% for (const property of properties) { %><%= property.name %>: dto.<%= property.name %>, <% } %>
    });

    const saved<%= functions.capitalize(name) %> = await this.<%= namePlural %>Repository.save(<%= name %>);
    return Get<%= functions.capitalize(name) %>Dto.fromEntity(saved<%= functions.capitalize(name) %>);
  }
}
