export interface SeasonData {
  name: string;
  seasonEndDate: string;
  isCurrentSeason: boolean;
  isPreviousSeason: boolean;
  memes: MemeData[];
}

export const emptySeasonData: SeasonData = {
  name: "",
  seasonEndDate: "",
  isCurrentSeason: false,
  isPreviousSeason: false,
  memes: [],
};

export interface MemeData {
  id: number;
  name: string;
  avatar: string;
  spriteSheet: string;
  rank: number;
}
