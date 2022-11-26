import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateInvestimentDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;
}
