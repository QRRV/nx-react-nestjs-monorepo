import { CreateReviewHandler } from '../../application/handlers/createReviewHandler'
import { ReviewCommandRepository } from '../../domain/ports/reviewCommandRepository'
import { Review } from '../../domain/entities/review'
import { CreateReviewCommand } from '../../application/commands/createReviewCommand'

describe('CreateReviewHandler', () => {
  let handler: CreateReviewHandler
  let mockRepo: ReviewCommandRepository

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(async (review: Review) => review),
      delete: jest.fn(),
      update: jest.fn()
    }

    handler = new CreateReviewHandler(mockRepo)
  })

  it('should create a review and return it', async () => {
    const command = new CreateReviewCommand(
      'user123',
      'movie456',
      5.5,
      'Geweldige film'
    )

    const result = await handler.execute(command)

    expect(result.userId).toBe('user123')
    expect(result.movieId).toBe('movie456')
    expect(result.rating).toBe(5.5)
    expect(result.comment).toBe('Geweldige film')
    expect(typeof result._id).toBe('string')
    expect(result.reviewDate).toBeInstanceOf(Date)
    expect(mockRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should set empty string as default comment if none is provided', async () => {
    const command = new CreateReviewCommand(
      'user123',
      'movie456',
      4
    )

    const result = await handler.execute(command)

    expect(result.comment).toBe('')
  })

  it('should call repository with a Review instance', async () => {
    const command = new CreateReviewCommand(
      'user123',
      'movie456',
      4,
      'Prima film'
    )

    await handler.execute(command)

    const calledWith = (mockRepo.create as jest.Mock).mock.calls[0][0]
    expect(calledWith).toBeInstanceOf(Review)
    expect(calledWith.userId).toBe('user123')
  })
})
