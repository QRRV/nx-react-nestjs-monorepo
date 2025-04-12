import { DeleteMovieListItemRelationHandler } from '../../src/application/handlers/deleteMovieListItemRelationHandler';
import { DeleteMovieListItemRelationCommand } from '../../src/application/commands/deleteMovieListItemRelationCommand';
import { MovieListItemRelationRepository } from '../../src/domain/ports/movieListItemRelationRepository';

describe('DeleteMovieListItemRelationHandler', () => {
  it('should call repo.deleteMovieListItemRelation with correct args', async () => {
    const repo: MovieListItemRelationRepository = {
      createMovieListItemRelation: jest.fn(),
      deleteMovieListItemRelation: jest.fn(),
    };

    const handler = new DeleteMovieListItemRelationHandler(repo);
    const command = new DeleteMovieListItemRelationCommand('user-1', 'movie-1');

    await handler.execute(command);

    expect(repo.deleteMovieListItemRelation).toHaveBeenCalledWith('user-1', 'movie-1');
  });
});
