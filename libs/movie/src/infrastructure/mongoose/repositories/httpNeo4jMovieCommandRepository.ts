import { MovieGraphCommandRepository } from '../../../domain/ports/movieGraphCommandRepository';
import axios from 'axios';


export class HttpNeo4jMovieCommandRepository implements MovieGraphCommandRepository {

  private readonly baseUrl = process.env['RCMND_API_URL'];

  async createMovie(id: string, title: string, genres: string[], token: string): Promise<void> {
    await axios.post(
      `${this.baseUrl}/movies/relations`,
      { id, title, genres},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
