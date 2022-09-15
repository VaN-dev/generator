import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { SurveyTypeOrmEntity } from "./survey.typeorm.entity";

@EntityRepository(SurveyTypeOrmEntity)
export class SurveysTypeOrmRepository extends BaseRepository<SurveyTypeOrmEntity> {}
