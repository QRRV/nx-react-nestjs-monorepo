import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Neo4jModule, Neo4jScheme } from 'nest-neo4j';
import { ReviewGraphModule } from '@moviebuddy/review-graph';
import { CreateReviewRelationController } from './review/controllers/createReviewRelationController';
import { AuthSupportModule } from '@moviebuddy/auth';
import { DeleteReviewRelationController } from './review/controllers/deleteReviewRelationController';
import {
  CreateMovieListItemRelationController
} from './movielistitem/controllers/createMovieListItemRelationController';
import { MovieListItemGraphModule } from '@moviebuddy/movielistitem-graph';
import {
  DeleteMovieListItemRelationController
} from './movielistitem/controllers/deleteMovieListItemRelationController';
import { GetRecommendationsController } from './recommendation/controllers/getRecommendationsController';
import { RecommendationGraphModule } from '@moviebuddy/recommendation-graph';
import { AddFriendController } from './user/controllers/addFriendController';
import { GetFriendsController } from './user/controllers/getFriendsController';
import { RemoveFriendController } from './user/controllers/removeFriendController';
import { SharedModule } from '@moviebuddy/shared';
import { UserGraphModule } from '@moviebuddy/user-graph';
import { MovieGraphModule } from '@moviebuddy/movie-graph';
import { CreateMovieGraphController } from './movie/createMovieGraphController';
import {} from '@nestjs/config'

const reviewControllers = [
  CreateReviewRelationController,
  DeleteReviewRelationController
];

const movieListItemControllers = [
  CreateMovieListItemRelationController,
  DeleteMovieListItemRelationController,
];

const recommendationControllers = [
  GetRecommendationsController,
];

const userGraphControllers = [
  AddFriendController,
  GetFriendsController,
  RemoveFriendController,
];

const movieGraphControllers = [
  CreateMovieGraphController
];

@Module({
  imports: [
    CqrsModule,
    ReviewGraphModule,
    MovieListItemGraphModule,
    AuthSupportModule,
    RecommendationGraphModule,
    SharedModule,
    UserGraphModule,
    MovieGraphModule,
    Neo4jModule.forRoot({
      scheme: process.env.NEO4J_SCHEME as Neo4jScheme || 'neo4j',
      host: process.env.NEO4J_HOST || 'localhost',
      port: parseInt(process.env.NEO4J_PORT || '7687', 10),
      username: process.env.NEO4J_USERNAME || 'neo4j',
      password: process.env.NEO4J_PASSWORD || 'neo4j',
    }),


  ],
  controllers: [
    ...reviewControllers,
    ...movieListItemControllers,
    ...recommendationControllers,
    ...userGraphControllers,
    ...movieGraphControllers,
  ],
})
export class AppModule {}
