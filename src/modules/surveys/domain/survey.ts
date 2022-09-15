import { AggregateRoot, UniqueEntityId } from '@coachhubio/shared-ddd';
import { SurveyId } from "./survey.id";

export interface SurveyProps {
  title: string;
  count: number;
}

export class Survey extends AggregateRoot<SurveyProps> {
  public static create(props: SurveyProps, id?: SurveyId): Survey {
    const survey = new Survey({ ...props }, id);
    

    return survey;
  }

  private constructor(props: SurveyProps, id?: UniqueEntityId) {
    super(props, id ? id : SurveyId.create());
  }

  
  public updateTitle(title: string) {
    this.props.title = title;
  }
  public updateCount(count: number) {
    this.props.count = count;
  }
}
