import { IsNotEmpty, IsNumber, Min, IsUUID } from "class-validator";

export class CreateInvestimentDto {
  @IsUUID()
  @IsNotEmpty()
  readonly userId: string;

  @IsUUID()
  @IsNotEmpty()
  readonly investimentId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;
}
