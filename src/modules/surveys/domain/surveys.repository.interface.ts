import { Survey } from "./survey";
import { SurveyId } from "./survey.id";

export abstract class SurveysRepository {
  abstract save(survey: Survey): Promise<Survey>;
  abstract findOneByIdOrFail(id: SurveyId): Promise<Survey>;
  abstract delete(id: string): Promise<void>;
}
