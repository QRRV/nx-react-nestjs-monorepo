import { IsOptional, IsBoolean, IsInt, Min, IsString } from 'class-validator'

export class updateWatchlistItemDto {
  @IsString()
  userId!: string

  @IsOptional()
  @IsBoolean()
  watched?: boolean

  @IsOptional()
  @IsInt()
  @Min(1)
  priority?: number
}
