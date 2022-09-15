import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {CreateSurveyUseCase} from "../../usecases/surveys/create-survey/create-survey.usecase";
import {CreateSurveyDto} from "../../usecases/surveys/create-survey/create-survey.dto";
import {GetSurveyDto} from "../../app/dto/get-survey.dto";
import {GetSurveyUseCase} from "../../usecases/surveys/get-survey/get-survey.usecase";
import {EditSurveyUseCase} from "../../usecases/surveys/edit-survey/edit-survey.usecase";
import {DeleteSurveyUseCase} from "../../usecases/surveys/delete-survey/delete-survey.usecase";
import {EditSurveyDto} from "../../usecases/surveys/edit-survey/edit-survey.dto";

@ApiTags('surveys')
@Controller('surveys')
export class SurveysController {
  constructor(
    private readonly createSurveyUseCase: CreateSurveyUseCase,
    private readonly findSurveyUseCase: GetSurveyUseCase,
    private readonly editSurveyUseCase: EditSurveyUseCase,
    private readonly deleteSurveyUseCase: DeleteSurveyUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a survey' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
    type: GetSurveysDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async create(@Body() createSurveyDto: CreateSurveyDto): Promise<GetSurveyDto> {
    return this.createSurveyUseCase.execute(createSurveyDto);
  }
  

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found survey',
    type: GetSurveyDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  async findOne(@Param('id') id: string): Promise<GetSurveyDto> {
    return this.findSurveyUseCase.execute(id);
  }
  

  @Patch(':id')
  @ApiOperation({ summary: 'Update a survey' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The survey has been successfully updated.',
    type: GetSurveyDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async editSurvey(@Param('id') surveyId, @Body() editSurveyDto: EditSurveyDto): Promise<GetSurveyDto> {
    return this.editSurveyUseCase.execute(surveyId, editSurveyDto);
  }
  

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a survey' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The survey has been successfully deleted.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Forbidden.' })
  async deleteSurvey(@Param('id') id: string): Promise<void> {
    const survey = await this.findSurveyUseCase.execute(id);

    await this.deleteSurveyUseCase.execute(survey.id);
  }
  
}
