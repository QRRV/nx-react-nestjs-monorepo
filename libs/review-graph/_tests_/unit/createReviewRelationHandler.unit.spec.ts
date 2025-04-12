import { DeleteReviewRelationCommand, DeleteReviewRelationHandler } from '../../src';
import { ReviewRelationRepository } from '../../src/domain/ports/reviewRelationRepository';

describe('DeleteReviewRelationHandler', () => {
  let handler: DeleteReviewRelationHandler;
  let repo: ReviewRelationRepository;

  beforeEach(() => {
    repo = {
      deleteReviewRelation: jest.fn(),
      createReviewRelation: jest.fn(),
    };

    handler = new DeleteReviewRelationHandler(repo);
  });

  it('should delete a review relation and call the repository', async () => {
    const command = new DeleteReviewRelationCommand('user-1', 'movie-123');

    await handler.execute(command);

    expect(repo.deleteReviewRelation).toHaveBeenCalledWith('user-1', 'movie-123');
  });
});
