import { MovieGraphCommandRepository } from '../../../domain/ports/movieGraphCommandRepository';
import axios from 'axios';


export class HttpNeo4jMovieCommandRepository implements MovieGraphCommandRepository {

  private readonly baseUrl = 'https://rcmnd-backend-eac4fgeycmf2gdee.westeurope-01.azurewebsites.net/api';

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
