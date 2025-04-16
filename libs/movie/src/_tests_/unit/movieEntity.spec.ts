import { Movie } from '../../domain/entities/movie'

describe('Movie Entity', () => {
  it('should create a movie with correct properties', () => {
    const movie = new Movie(
      'tt1375666',
      'Inception',
      'Dream-layered mind-bending thriller',
      new Date('2010-07-16'),
      ['Action', 'Sci-Fi', 'Thriller'],
      true
    )

    expect(movie._id).toBe('tt1375666')
    expect(movie.title).toBe('Inception')
    expect(movie.genres).toEqual(['Action', 'Sci-Fi', 'Thriller'])
    expect(movie.hasWonAwards).toBe(true)
  })

  it('should throw if IMDB ID format is invalid', () => {
    expect(() => {
      new Movie(
        'invalid_id',
        'Fake Movie',
        'This should not be allowed',
        new Date('2025-01-01'),
        ['Drama'],
        false
      )
    }).toThrow('Invalid IMDB ID format')
  })
})
