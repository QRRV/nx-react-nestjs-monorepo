import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ReviewGraphWriteRepository } from '../../../domain/ports/reviewGraphWriteRepository';

@Injectable()
export class HttpReviewGraphWriteRepository
  implements ReviewGraphWriteRepository
{
  private readonly baseUrl = process.env['RCMND_API_URL'];

  async createReviewRelation(
    movieId: string,
    rating: number,
    reviewId: string,
    token: string
  ): Promise<void> {
    await axios.post(
      `${this.baseUrl}/review/relations`,
      { movieId, rating, reviewId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  async deleteReviewRelation(reviewId: string, token: string): Promise<void> {
    await axios.delete(`${this.baseUrl}/review/relations/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }



}
