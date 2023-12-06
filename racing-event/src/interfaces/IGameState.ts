export interface IGameState {
  score: number;
  highScore: number;
  currentDriver: string | null;
  driverOptions: {
    name: string;
    image: string;
    correct: boolean;
  }[];
}