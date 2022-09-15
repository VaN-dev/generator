import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateSurveyDto {
  
  @ApiProperty({
    description: 'title of the survey',
  })
  @IsString()
  readonly title: string;
  
  @ApiProperty({
    description: 'count of the survey',
  })
  @IsNumber()
  readonly count: number;
  
}
