import { Column, Entity } from 'typeorm';
import { BaseTypeOrmEntity } from '../../../../shared/infra/database/base.typeorm.entity';
import {Survey} from "../../domain/survey";
import {SurveyId} from "../../domain/survey.id";

@Entity('survey')
export class SurveyTypeOrmEntity extends BaseTypeOrmEntity {
  static fromEntity({ id, props }: Survey): SurveyTypeOrmEntity {
    return new SurveyTypeOrmEntity({
      id: id.toString(),
      title: props.title,
      
      count: props.count,
      });
  }

  static toEntity(surveyEntity: SurveyTypeOrmEntity): Survey {
    return Survey.create({
      title: surveyEntity.title,
    
      count: surveyEntity.count,
    }, SurveyId.fromString(surveyEntity.id)
    );
  }

  
  @Column({ length: 100 })
  title: string;
  
  @Column({ length: 100 })
  count: number;
  

  constructor(props: Partial<SurveyTypeOrmEntity>) {
    super();
    Object.assign(this, props);
  }
}
