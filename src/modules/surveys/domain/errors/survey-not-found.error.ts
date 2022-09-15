import { SurveyId } from '../survey.id';

export class SurveyNotFoundError extends Error {
  constructor(surveyId: SurveyId) {
    super(`Survey ${surveyId} not found`);
  }
}
