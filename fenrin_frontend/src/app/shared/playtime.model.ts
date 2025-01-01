export interface PlaytimeModel {
  playtimeId: string;
  year: number;
  weekNumber: number;
  timePlayed: number;
  absent: boolean;
}

export interface PlayerData {
  playerName: string;
  playtimes: PlaytimeModel[];
}

export interface ProcessedPlayerData {
  name: string;
  playtimeThisWeek: string;
  totalPlaytime: string;
}
