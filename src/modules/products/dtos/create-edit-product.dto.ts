import { IsArray, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

export class CreateEditProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsString()
  image: string;

  @Min(0)
  price: number;

  @IsArray()
  @IsUUID(undefined, { each: true })
  categories: string[];
}
