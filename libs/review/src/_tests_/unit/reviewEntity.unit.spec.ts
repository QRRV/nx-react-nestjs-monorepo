import { Review } from '../../domain/entities/review'

describe('Review', () => {
  const baseData = {
    _id: 'abc-123',
    userId: 'user1',
    movieId: 'movie1',
    comment: 'Testcomment',
    reviewDate: new Date()
  }

  it('should throw if rating is less than 1', () => {
    expect(() =>
      new Review(baseData._id, baseData.userId, baseData.movieId, 0, baseData.comment, baseData.reviewDate)
    ).toThrow('Rating must be between 1 and 10')
  })

  it('should throw if rating is more than 10', () => {
    expect(() =>
      new Review(baseData._id, baseData.userId, baseData.movieId, 11, baseData.comment, baseData.reviewDate)
    ).toThrow('Rating must be between 1 and 10')
  })

  it('should create review if rating is valid', () => {
    const review = new Review(baseData._id, baseData.userId, baseData.movieId, 6.6, baseData.comment, baseData.reviewDate)

    expect(review.rating).toBe(6.6)
    expect(review.comment).toBe('Testcomment')
    expect(review._id).toBe('abc-123')
  })
})
