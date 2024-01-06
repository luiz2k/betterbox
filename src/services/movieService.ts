import MovieRepository from '../repositories/movieRepository';

import type { addToWatched } from './movieService.d';

export default class MovieService {
  private movieRepository: MovieRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
  }

  public async addToWatched(data: addToWatched, userId: number) {
    const movie = await this.movieRepository.getMovieById({ id: data.id });

    if (!movie)
      await this.movieRepository.addMovie({
        id: data.id,
        name: data.name,
      });

    await this.movieRepository.addToWatched({
      userId,
      movieId: data.id,
      watchedDate: new Date(),
    });
  }
}
