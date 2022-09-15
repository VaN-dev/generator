import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateSurveyUseCase } from './usecases/surveys/create-survey/create-survey.usecase';
import { SurveysTypeOrmRepository } from './infra/database/surveys.typeorm.repository';
import { SurveysRepository } from './domain/surveys.repository.interface';
import { SurveysRepositoryService } from './infra/database/surveys.repository';
import { SurveysController } from './infra/controllers/surveys.controller';
import { GetSurveyUseCase } from './usecases/surveys/get-survey/get-survey.usecase';
import { EditSurveyUseCase } from './usecases/surveys/edit-survey/edit-survey.usecase';
import { DeleteSurveyUseCase } from './usecases/surveys/delete-survey/delete-survey.usecase';

export const surveyUseCases = [
  CreateSurveyUseCase,
  GetSurveyUseCase,
  EditSurveyUseCase,
  DeleteSurveyUseCase,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([SurveysTypeOrmRepository]),
  ],
  providers: [
    {
      provide: SurveysRepository,
      useClass: SurveysRepositoryService,
    },
    ...surveyUseCases,
  ],
  controllers: [SurveysController],
  exports: [SurveysRepository],
})
export class SurveysModule {}
