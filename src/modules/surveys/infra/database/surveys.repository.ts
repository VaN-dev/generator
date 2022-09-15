import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Survey } from '../../domain/survey';
import { SurveyId } from '../../domain/survey.id';
import { SurveyTypeOrmEntity } from './survey.typeorm.entity';
import { SurveysRepository } from '../../domain/surveys.repository.interface';
import { SurveysTypeOrmRepository } from './surveys.typeorm.repository';
import { SurveyNotFoundError } from '../../domain/errors/survey-not-found.error';

@Injectable()
export class SurveysRepositoryService extends SurveysRepository {
  constructor(
    private readonly surveysRepository: SurveysTypeOrmRepository
  ) {
    super();
  }
  
  @Transactional()
  async save(survey: Survey): Promise<Survey> {
    const createdSurvey = this.surveysRepository.create(SurveyTypeOrmEntity.fromEntity(survey));
    const savedSurveys = await this.surveysRepository.save([createdSurvey]);

    return SurveyTypeOrmEntity.toEntity(savedSurveys[0]);
  }
  
  
  async findOneByIdOrFail(id: SurveyId): Promise<Survey> {
    try {
      const foundSurvey = await this.surveysRepository.findOneOrFail(id.toString());

      return SurveyTypeOrmEntity.toEntity(foundSurvey);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new SurveyNotFoundError(id);
      }

      throw error;
    }
  }
  
  async delete(id: string): Promise<void> {
    await this.surveysRepository.delete(id);
  }
  
}
