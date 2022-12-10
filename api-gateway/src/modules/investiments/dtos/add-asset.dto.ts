import { IsString, IsNotEmpty, Min, IsUUID } from "class-validator";

export class AddAssetDto {
  @IsUUID()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  @Min(4)
  readonly code: string;

  @IsString()
  readonly company: string;

  @IsString()
  @IsNotEmpty()
  readonly asset: string;

  @IsString()
  @IsNotEmpty()
  readonly segment: string;

  @IsString()
  readonly sector: string;
}
