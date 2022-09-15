import {
  Body,
  Controller,<% if (crud.includes('D')) { %>
  Delete,<% } %><% if (crud.includes('R')) { %>
  Get,<% } %>
  HttpCode,
  HttpStatus,
  Param,<% if (crud.includes('U')) { %>
  Patch,<% } %><% if (crud.includes('C')) { %>
  Post,<% } %>
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';<% if (crud.includes('C')) { %>
import {Create<%= functions.capitalize(name) %>UseCase} from "../../usecases/<%= namePlural %>/create-<%= name %>/create-<%= name %>.usecase";<% } %><% if (crud.includes('C')) { %>
import {Create<%= functions.capitalize(name) %>Dto} from "../../usecases/<%= namePlural %>/create-<%= name %>/create-<%= name %>.dto";<% } %><% if (['C', 'R', 'U', 'L'].some(r => crud.includes(r))) { %>
import {Get<%= functions.capitalize(name) %>Dto} from "../../app/dto/get-<%= name %>.dto";<% } %><% if (['R', 'D'].some(r => crud.includes(r))) { %>
import {Get<%= functions.capitalize(name) %>UseCase} from "../../usecases/<%= namePlural %>/get-<%= name %>/get-<%= name %>.usecase";<% } %><% if (crud.includes('L')) { %>
import {GetAll<%= functions.capitalize(namePlural) %>UseCase} from "../../usecases/<%= namePlural %>/get-all-<%= namePlural %>/get-all-<%= namePlural %>.usecase";<% } %><% if (crud.includes('U')) { %>
import {Edit<%= functions.capitalize(name) %>UseCase} from "../../usecases/<%= namePlural %>/edit-<%= name %>/edit-<%= name %>.usecase";<% } %><% if (crud.includes('D')) { %>
import {Delete<%= functions.capitalize(name) %>UseCase} from "../../usecases/<%= namePlural %>/delete-<%= name %>/delete-<%= name %>.usecase";<% } %><% if (crud.includes('U')) { %>
import {Edit<%= functions.capitalize(name) %>Dto} from "../../usecases/<%= namePlural %>/edit-<%= name %>/edit-<%= name %>.dto";<% } %>

@ApiTags('<%= namePlural %>')
@Controller('<%= namePlural %>')
export class <%= functions.capitalize(namePlural) %>Controller {<% if (crud.length > 0) { %>
  constructor(<% if (crud.includes('C')) { %>
    private readonly create<%= functions.capitalize(name) %>UseCase: Create<%= functions.capitalize(name) %>UseCase,<% } %><% if (crud.includes('L')) { %>
    private readonly getAll<%= functions.capitalize(namePlural) %>UseCase: GetAll<%= functions.capitalize(namePlural) %>UseCase,<% } %><% if (['R', 'D'].some(r => crud.includes(r))) { %>
    private readonly find<%= functions.capitalize(name) %>UseCase: Get<%= functions.capitalize(name) %>UseCase,<% } %><% if (crud.includes('U')) { %>
    private readonly edit<%= functions.capitalize(name) %>UseCase: Edit<%= functions.capitalize(name) %>UseCase,<% } %><% if (crud.includes('D')) { %>
    private readonly delete<%= functions.capitalize(name) %>UseCase: Delete<%= functions.capitalize(name) %>UseCase,<% } %>
  ) {}<% } %><% if (crud.includes('C')) { %>

  @Post()
  @ApiOperation({ summary: 'Create a <%= name %>' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
    type: Get<%= functions.capitalize(namePlural) %>Dto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async create(@Body() create<%= functions.capitalize(name) %>Dto: Create<%= functions.capitalize(name) %>Dto): Promise<Get<%= functions.capitalize(name) %>Dto> {
    return this.create<%= functions.capitalize(name) %>UseCase.execute(create<%= functions.capitalize(name) %>Dto);
  }
  <% } %><% if (crud.includes('L')) { %>

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve all <%= namePlural %>',
    type: [Get<%= functions.capitalize(name) %>Dto],
  })
  async findMany(): Promise<Get<%= functions.capitalize(name) %>Dto[]> {
    return this.getAll<%= functions.capitalize(namePlural) %>UseCase.execute();
  }
  <% } %><% if (crud.includes('R')) { %>

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found <%= name %>',
    type: Get<%= functions.capitalize(name) %>Dto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  async findOne(@Param('id') id: string): Promise<Get<%= functions.capitalize(name) %>Dto> {
    return this.find<%= functions.capitalize(name) %>UseCase.execute(id);
  }
  <% } %><% if (crud.includes('U')) { %>

  @Patch(':id')
  @ApiOperation({ summary: 'Update a <%= name %>' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The <%= name %> has been successfully updated.',
    type: Get<%= functions.capitalize(name) %>Dto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async edit<%= functions.capitalize(name) %>(@Param('id') <%= name %>Id, @Body() edit<%= functions.capitalize(name) %>Dto: Edit<%= functions.capitalize(name) %>Dto): Promise<Get<%= functions.capitalize(name) %>Dto> {
    return this.edit<%= functions.capitalize(name) %>UseCase.execute(<%= name %>Id, edit<%= functions.capitalize(name) %>Dto);
  }
  <% } %><% if (crud.includes('D')) { %>

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a <%= name %>' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The <%= name %> has been successfully deleted.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Forbidden.' })
  async delete<%= functions.capitalize(name) %>(@Param('id') id: string): Promise<void> {
    const <%= name %> = await this.find<%= functions.capitalize(name) %>UseCase.execute(id);

    await this.delete<%= functions.capitalize(name) %>UseCase.execute(<%= name %>.id);
  }
  <% } %>
}
