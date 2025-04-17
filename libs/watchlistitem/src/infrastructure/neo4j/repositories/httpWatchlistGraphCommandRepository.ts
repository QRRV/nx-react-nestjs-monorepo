import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { WatchlistGraphCommandRepository } from '../../../domain/ports/watchlistItemGraphCommandRepository';


export class HttpWatchlistGraphCommandRepository implements WatchlistGraphCommandRepository {
  private readonly baseUrl = 'https://rcmnd-backend-eac4fgeycmf2gdee.westeurope-01.azurewebsites.net/api';

  async createMovieListItemRelation(
    movieId: string,
    itemId: string,
    token: string
  ): Promise<void> {
    await axios.post(
      `${this.baseUrl}/movielistitem/relations`,
      { movieId, itemId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async deleteMovieListItemRelation(
    itemId: string,
    token: string
  ): Promise<void> {
    await axios.delete(
      `${this.baseUrl}/movielistitem/relations/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
