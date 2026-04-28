export interface TvMazeSearchResult {
  score: number;
  show: TvMazeShow;
}

export interface TvMazeShow {
  id: number;
  name: string;
  type: string;
  language: string | null;
  genres: string[];
  status: string;
  runtime: number | null;
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  schedule: { time: string; days: string[] };
  rating: { average: number | null };
  image: { medium: string; original: string } | null;
  summary: string | null;
  network: {
    id: number;
    name: string;
    country: { name: string; code: string };
  } | null;
  webChannel: {
    id: number;
    name: string;
    country: { name: string; code: string } | null;
  } | null;
}
