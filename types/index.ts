export type RandomGeneratedType = {
  getRandomElement<T>(obj: { [key: string]: T[] }): { [key: string]: T };
  getRandomInt(min: number, max: number): number;
  getRandomFloat(min: number, max: number): number;
  getRandomCharacter(chars: string): string;
  getRandomDate(startDate?: Date, endDate?: Date): Date;
  getRandomBoolean(): boolean;
  generateRandomGraph(numVertices?: number, density?: number): number[][];
  generateRandomCoordinates(
    minLat?: number,
    maxLat?: number,
    minLng?: number,
    maxLng?: number
  ): { latitude: number; longitude: number };
  generateRandomNormal(mean: number, standardDeviation: number): number;
  generateRandomRGBColor(): string;
  generateRandomHEXColor(): string;
  generateRandomHSLColor(): string;
};
