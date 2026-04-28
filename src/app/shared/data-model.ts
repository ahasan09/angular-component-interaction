import { TvMazeShow } from './tvmaze.models';

export class Movie {
  [key: string]: string | number;

  id: number;
  name: string;
  image: string;
  network: string;
  summary: string;
  status: string;

  constructor(show: TvMazeShow) {
    this.id = show.id;
    this.name = show.name;
    this.image = show.image?.medium ?? '';
    this.network = show.network?.name ?? show.webChannel?.name ?? '';
    this.summary = show.summary ?? '';
    this.status = show.status;
  }
}
