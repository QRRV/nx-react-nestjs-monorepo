import { IsOptional, IsBoolean, IsInt, Min } from 'class-validator'

export class updateWatchlistItemDto {
  @IsOptional()
  @IsBoolean()
  watched?: boolean

  @IsOptional()
  @IsInt()
  @Min(1)
  priority?: number
}
