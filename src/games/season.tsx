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
  name: string;
  avatar: string;
  spriteSheet: string;
  index: number;
}
