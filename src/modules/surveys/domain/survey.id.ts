import { UniqueEntityId } from '@coachhubio/shared-ddd';
import { uuid } from 'short-uuid';

export class SurveyId extends UniqueEntityId {
  static PREFIX = 'sur';
  static fromString(id: string) {
    return new SurveyId(id);
  }
  static create(): SurveyId {
    return new SurveyId(`${SurveyId.PREFIX}-${uuid()}`);
  }
  private constructor(id: string) {
    super(id);
  }
}
