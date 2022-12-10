import { IsString, IsNotEmpty, IsNumber, Min, IsUUID } from "class-validator";

interface B3RealEstateFunds {
  company: string;
  asset: string;
  segment: string;
  code: string;
}
interface B3Stock {
  code: string;
  sector: string;
  subSector: string;
  segment: string;
}

interface Investiment {
  asset: B3RealEstateFunds | B3Stock;
}

export class CreateInvestimentDto {
  @IsUUID()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly investiment: Investiment;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;
}
