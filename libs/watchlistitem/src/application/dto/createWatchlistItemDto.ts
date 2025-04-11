import { IsString, IsOptional, IsInt, Min } from 'class-validator'

export class createWatchlistItemDto {
  @IsString()
  userId!: string

  @IsString()
  movieId!: string

  @IsOptional()
  @IsInt()
  @Min(1)
  priority?: number
}
