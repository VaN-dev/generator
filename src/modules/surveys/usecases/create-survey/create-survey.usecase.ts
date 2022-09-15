import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './create-survey.dto';
import { GetSurveyDto } from '../../../app/dto/get-survey.dto';
import { Survey } from '../../../domain/survey';
import { SurveysRepository } from '../../../domain/surveys.repository.interface';

@Injectable()
export class CreateSurveyUseCase {
  constructor(readonly surveysRepository: SurveysRepository) {}

  async execute(dto: CreateSurveyDto): Promise<GetSurveyDto> {
    // if required, contain any additional validation logic here

    const survey = Survey.create({
      title: dto.title, count: dto.count, 
    });

    const savedSurvey = await this.surveysRepository.save(survey);
    return GetSurveyDto.fromEntity(savedSurvey);
  }
}
