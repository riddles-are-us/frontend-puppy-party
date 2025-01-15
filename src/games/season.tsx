export interface SeasonData {
  name: string;
  seasonEndDate: string;
  isCurrentSeason: boolean;
  isPreviousSeason: boolean;
  memes: MemeData[];
}

export interface MemeData {
  name: string;
  cover: string;
  animationIndex: number | -1;
  index: number;
}
