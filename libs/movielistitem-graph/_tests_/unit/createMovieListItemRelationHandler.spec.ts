import { CreateMovieListItemRelationHandler } from '../../src/application/handlers/createMovieListItemRelationHandler';
import { CreateMovieListItemRelationCommand } from '../../src/application/commands/createMovieListItemRelationCommand';
import { MovieListItemRelationRepository } from '../../src/domain/ports/movieListItemRelationRepository';

describe('CreateMovieListItemRelationHandler', () => {
  it('should call repo.createMovieListItemRelation with correct args', async () => {
    const repo: MovieListItemRelationRepository = {
      createMovieListItemRelation: jest.fn(),
      deleteMovieListItemRelation: jest.fn(),
    };

    const handler = new CreateMovieListItemRelationHandler(repo);
    const command = new CreateMovieListItemRelationCommand('user-1', 'movie-1');

    await handler.execute(command);

    expect(repo.createMovieListItemRelation).toHaveBeenCalledWith('user-1', 'movie-1');
  });
});
