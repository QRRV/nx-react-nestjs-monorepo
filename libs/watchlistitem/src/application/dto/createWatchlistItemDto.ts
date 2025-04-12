import { IsString, IsOptional, IsInt, Min, IsNotEmpty } from 'class-validator';

export class createWatchlistItemDto {
  @IsNotEmpty()
  @IsString()
  movieId!: string

  @IsOptional()
  @IsInt()
  @Min(1)
  priority?: number
}
