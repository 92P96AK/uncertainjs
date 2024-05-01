import fs from "fs";
import {
  CONSONANTS,
  LOWER_CASE_CHARS,
  NUMERIC_CHARS,
  SPECIAL_CHARS,
  UPPER_CASE_CHARS,
  VOWELS,
  randomImageUrls,
} from "./constants";
import {
  IFParsePayload,
  IFPayload,
  ILatLong,
  IPasswordOptions,
  IRandomImageOptions,
  IRandomNoise,
  IRandomNoiseOptions,
  ObjectSchema,
} from "./interface";
import path from "path";

export class Random {
  constructor() {}

  private parseAudioProps(props?: IRandomNoiseOptions): IRandomNoise {
    const prop = {} as IRandomNoise;
    prop.duration = props?.duration ?? 5;
    prop.sampleRate = props?.sampleRate ?? 44100;
    prop.fileName = props?.fileName ?? "random_noise";
    prop.type = props?.type ?? "wav";
    return prop;
  }

  private getRandomvalue(type: string): string | number | boolean {
    switch (type) {
      case "string":
        return this.generateRandomString();
      case "number":
        return this.generateRandomNumber();
      case "boolean":
        return this.generateRandomBoolean();
      default:
        return "";
    }
  }
  private parsePayload(payload?: IFPayload): IFParsePayload {
    const resp = {} as IFParsePayload;
    resp.min = payload?.min ?? 0;
    resp.max = payload?.max ?? 1000;
    resp.length = payload?.length ?? this.getRandomInt(resp.min, resp.max);
    return resp;
  }
  public getRandomElement<T>(obj: { [key: string]: T[] }): {
    [key: string]: T;
  } {
    const result: { [key: string]: T } = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const array = obj[key];
        if (array) {
          result[key] = array[Math.floor(Math.random() * array.length)] as T;
        }
      }
    }
    return result;
  }

  public getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  public getRandomCharacter(chars: string): string {
    const length = chars.length;
    return chars.charAt(Math.floor(Math.random() * length));
  }

  public getRandomDate(
    startDate: Date = new Date(0),
    endDate: Date = new Date()
  ): Date {
    try {
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();
      return new Date(startTime + Math.random() * (endTime - startTime));
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public generateRandomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  public generateRandomGraph(
    numVertices: number = 5,
    density: number = 0.5
  ): number[][] {
    const graph: number[][] = Array.from({ length: numVertices }, () =>
      Array(numVertices).fill(0)
    );

    for (let i = 0; i < numVertices; i++) {
      for (let j = i + 1; j < numVertices; j++) {
        const randomValue = Math.random();
        if (randomValue < density) {
          graph[i][j] = 1;
          graph[j][i] = 1;
        }
      }
    }

    return graph;
  }

  public generateRandomCoordinates(
    minLat = -90,
    maxLat = 90,
    minLng = -180,
    maxLng = 180
  ): ILatLong {
    const randomLat = Math.random() * (maxLat - minLat) + minLat;
    const randomLng = Math.random() * (maxLng - minLng) + minLng;
    return { latitude: randomLat, longitude: randomLng };
  }

  public generateRandomNormal(mean: number, standardDeviation: number): number {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * standardDeviation + mean;
  }

  public generateRandomRGBColor(): string {
    const red = this.getRandomInt(0, 255);
    const green = this.getRandomInt(0, 255);
    const blue = this.getRandomInt(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  public generateRandomHEXColor(): string {
    const red = this.getRandomInt(0, 255).toString(16).padStart(2, "0");
    const green = this.getRandomInt(0, 255).toString(16).padStart(2, "0");
    const blue = this.getRandomInt(0, 255).toString(16).padStart(2, "0");
    return `#${red}${green}${blue}`;
  }

  public generateRandomHSLColor(): string {
    const hue = this.getRandomInt(0, 360);
    const saturation = this.getRandomInt(30, 90);
    const lightness = this.getRandomInt(30, 70);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  public generateRandomPassword(
    length: number,
    options: IPasswordOptions
  ): string {
    let allChars = LOWER_CASE_CHARS;
    if (options.includeUppercase) allChars += UPPER_CASE_CHARS;
    if (options.includeNumbers) allChars += NUMERIC_CHARS;
    if (options.includeSpecialChars) allChars += SPECIAL_CHARS;

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
    }

    return password;
  }

  public generateRandomEmoticon(): string {
    return String.fromCodePoint(
      Math.floor(Math.random() * (0x1f600 - 0x1f64f + 1)) + 0x1f600
    );
  }

  public generateRandomNoise(props?: IRandomNoiseOptions): string {
    try {
      const { duration, sampleRate, fileName, type } =
        this.parseAudioProps(props);
      const filePath = path.join(process.cwd(), fileName + "." + type);
      const numSamples = duration * sampleRate;
      const samples = new Float32Array(numSamples);
      for (let i = 0; i < numSamples; i++) {
        samples[i] = Math.random() * 2 - 1;
      }
      const header = Buffer.alloc(44);
      const data = Buffer.alloc(samples.length * 2);

      header.write("RIFF", 0);
      header.writeUInt32LE(36 + data.length, 4);
      header.write("WAVE", 8);
      header.write("fmt ", 12);
      header.writeUInt32LE(16, 16);
      header.writeUInt16LE(1, 20);
      header.writeUInt16LE(1, 22);
      header.writeUInt32LE(sampleRate, 24);
      header.writeUInt32LE(sampleRate * 2, 28);
      header.writeUInt16LE(2, 32);
      header.writeUInt16LE(16, 34);
      header.write("data", 36);
      header.writeUInt32LE(data.length, 40);
      for (let i = 0; i < samples.length; i++) {
        const value = Math.max(-1, Math.min(1, samples[i]));
        data.writeInt16LE(Math.floor(value * 32767), i * 2);
      }
      const wavBuffer = Buffer.concat([header, data]);
      fs.writeFileSync(filePath, wavBuffer);
      return filePath;
    } catch (error) {
      throw new Error(`error`);
    }
  }

  public generateRandomImageUrl(props?: IRandomImageOptions): string {
    try {
      const height = props?.height ?? 600;
      const width = props?.width ?? 800;
      const { randomImageUrls: baseUrl } = this.getRandomElement({
        randomImageUrls,
      });
      return `${baseUrl}/${width}/${height}?random=${Math.floor(
        Math.random() * 10000000
      )}`;
    } catch (error) {
      throw new Error(`error`);
    }
  }
  public generateRandomString(length: number = 10): string {
    const characters = LOWER_CASE_CHARS + UPPER_CASE_CHARS + NUMERIC_CHARS;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  public generateRandomNumber(
    min: number = 0,
    max: number = 100000000
  ): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public generateRandomObject(schema: ObjectSchema): Record<string, any> {
    const result: Record<string, any> = {};
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const typeOrArray = schema[key];
        if (Array.isArray(typeOrArray)) {
          result[key] =
            typeOrArray[Math.floor(Math.random() * typeOrArray.length)];
        } else if (typeof typeOrArray === "object") {
          result[key] = this.generateRandomObject(typeOrArray);
        } else {
          result[key] = this.getRandomvalue(typeOrArray as string);
        }
      }
    }
    return result;
  }

  public generateRandomName(payload?: IFPayload) {
    const { length } = this.parsePayload(payload);
    let name = "";
    for (let i = 0; i < length; i++) {
      if (i % 2 === 0) {
        name += this.getRandomCharacter(CONSONANTS);
      } else {
        name += this.getRandomCharacter(VOWELS);
      }
    }
    return name;
  }

  public generateRandomSerName(payload?: IFPayload) {
    const { length } = this.parsePayload(payload);
    let sername = "";
    for (let i = 0; i < length; i++) {
      if (i % 3 === 0 || i === 0) {
        sername += this.getRandomCharacter(CONSONANTS);
      } else {
        sername += this.getRandomCharacter(VOWELS);
      }
    }

    return sername;
  }

  public generateRandomFullName(payload?: IFPayload) {
    return `${new String(
      this.generateRandomName(payload) +
        " " +
        this.generateRandomSerName(payload)
    )}`;
  }
}
