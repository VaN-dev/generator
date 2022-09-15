import { ApiProperty } from '@nestjs/swagger';
import { Survey } from "../../domain/survey";

export class GetSurveyDto {
  static fromEntity({ id, props }: Survey): GetSurveyDto {
    return {
      id: id.toString(),
      ...props,
    };
  }

  @ApiProperty({ example: 'survey-806a6860-ea25-47f9-8fd7-b20ac6094bcb', description: 'The ID of the survey' })
  id?: string;
  
  @ApiProperty({ example: 'New survey', description: 'Title of the survey' })
  title: string;
  
  @ApiProperty({ example: 'New survey', description: 'Title of the survey' })
  count: number;
  
}
