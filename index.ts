import fs from "fs";
import crypto from "crypto";

import {
  ADJECTIVES,
  CONSONANTS,
  DISPOSABLE_EMAIL_PROVIDER,
  LOWER_CASE_CHARS,
  NOUNS,
  NUMERIC_CHARS,
  SPECIAL_CHARS,
  UPPER_CASE_CHARS,
  VERBS,
  VOWELS,
  RANDOM_IMAGE_BASE_URLS,
  CITIES,
  COUNTRIES,
} from "./constants";
import {
  IFParsePayload,
  IFPayload,
  IFullNamePayload,
  IGenEmailPayload,
  ILatLong,
  IPasswordOptions,
  IRandomImageOptions,
  IRandomNoise,
  IRandomNoiseOptions,
  IRandomUsername,
  RelationalSchema,
  Schema,
} from "./interface";
import path from "path";
export { Schema, RelationalSchema } from "./interface";
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

  private hex(value: number, length: number) {
    const str = value.toString(16);
    return "0".repeat(length - str.length) + str;
  }

  private uuidToBytes(uuid: string) {
    return Uint8Array.from(uuid.split("-").map((hex) => parseInt(hex, 16)));
  }

  private stringToBytes(str: string) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }

  private bytesToUUID(bytes: Buffer) {
    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  private getRandomvalue(
    type: string
  ): string | number | boolean | Date | number[][] | Object {
    switch (type) {
      case "string":
        return this.generateRandomString();
      case "number":
        return this.generateRandomNumber();
      case "boolean":
        return this.generateRandomBoolean();
      case "age":
        return this.generateRandomAge();
      case "gender":
        return this.generateRandomGender();
      case "email":
        return this.generateRandomEmail();
      case "uuid":
        return this.UUIDV4();
      case "shortDescription":
        return this.generateRandomShortDescrption();
      case "longDescription":
        return this.generateRandomLongDescription();
      case "postalCode":
        return this.generateRandomNumber(1111, 9999);
      case "password":
        return this.generateRandomPassword();
      case "date":
        return this.getRandomDate();
      case "graph":
        return this.generateRandomGraph();
      case "cordinates":
        return this.generateRandomCoordinate();
      case "rgb":
        return this.generateRandomRGBColor();
      case "hex":
        return this.generateRandomHEXColor();
      case "hls":
        return this.generateRandomHSLColor();
      case "emoji":
        return this.generateRandomEmoticon();
      case "imageUrl":
        return this.generateRandomImageUrl();
      case "serName":
        return this.generateRandomSerName();
      case "fullName":
        return this.generateRandomFullName();
      case "name":
        return this.generateRandomFullName();
      case "username":
        return this.generateRandomUserName();
      case "lastName":
        return this.generateRandomSerName();
      case "firstName":
        return this.generateRandomName();
      case "city":
        return this.generateRandomCity();
      case "country":
        return this.generateRandomCountry();
      default:
        return "";
    }
  }

  private getRandomvalueWithProps({
    type,
    min,
    max,
  }: {
    type: string;
    min?: number;
    max?: number;
  }): string | number | boolean | Date | number[][] | Object {
    switch (type) {
      case "string":
        return this.generateRandomString();
      case "number":
        return this.generateRandomNumber(min, max);
      case "boolean":
        return this.generateRandomBoolean();
      case "age":
        return this.generateRandomAge({
          min,
          max,
        });
      case "gender":
        return this.generateRandomGender();
      case "email":
        return this.generateRandomEmail();
      case "uuid":
        return this.UUIDV4();
      case "shortDescription":
        return this.generateRandomShortDescrption();
      case "longDescription":
        return this.generateRandomLongDescription();
      case "postalCode":
        return this.generateRandomNumber(1111, 9999);
      case "password":
        return this.generateRandomPassword();
      case "date":
        return this.getRandomDate();
      case "graph":
        return this.generateRandomGraph();
      case "cordinates":
        return this.generateRandomCoordinate();
      case "rgb":
        return this.generateRandomRGBColor();
      case "hex":
        return this.generateRandomHEXColor();
      case "hls":
        return this.generateRandomHSLColor();
      case "emoji":
        return this.generateRandomEmoticon();
      case "imageUrl":
        return this.generateRandomImageUrl();
      case "serName":
        return this.generateRandomSerName();
      case "fullName":
        return this.generateRandomFullName();
      case "name":
        return this.generateRandomFullName();
      case "username":
        return this.generateRandomUserName();
      case "lastName":
        return this.generateRandomSerName();
      case "firstName":
        return this.generateRandomName();
      case "city":
        return this.generateRandomCity();
      case "country":
        return this.generateRandomCountry();
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

  public generateRandomGender(): "M" | "F" {
    return Math.random() < 0.5 ? "M" : "F";
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

  public generateRandomCoordinate(
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

  public generateRandomPassword(options: IPasswordOptions = {}): string {
    const {
      includeUppercase = true,
      includeNumbers = true,
      includeSpecialChars = true,
      length = 7,
    } = options;

    let allChars = LOWER_CASE_CHARS;
    if (includeUppercase) allChars += UPPER_CASE_CHARS;
    if (includeNumbers) allChars += NUMERIC_CHARS;
    if (includeSpecialChars) allChars += SPECIAL_CHARS;

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
      const { RANDOM_IMAGE_BASE_URLS: baseUrl } = this.getRandomElement({
        RANDOM_IMAGE_BASE_URLS,
      });
      return `${baseUrl}/${width}/${height}?random=${Math.floor(
        Math.random() * 10000000
      )}`;
    } catch (error) {
      throw new Error(`error`);
    }
  }

  public generateRandomString(
    length: number = 10,
    upperCase = true,
    numeric = true
  ): string {
    let characters = LOWER_CASE_CHARS;
    if (upperCase) {
      characters += UPPER_CASE_CHARS;
    }
    if (numeric) {
      characters += NUMERIC_CHARS;
    }
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

  public generateRandomObject(schema: Schema): Record<string, any> {
    const result: Record<string, any> = {};
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const typeOrArray = schema[key];
        if (Array.isArray(typeOrArray)) {
          result[key] = [
            ...typeOrArray.map((arr) => this.generateRandomObject(arr)),
          ];
        } else if (typeof typeOrArray === "object") {
          result[key] = this.generateRandomObject(typeOrArray);
        } else {
          result[key] = this.getRandomvalue(typeOrArray);
        }
      }
    }
    return result;
  }

  public generateRandomObjectWithRelation(
    schema: RelationalSchema,
    numberOfData = 1
  ): Record<string, Array<Record<string, any>>> {
    const result: Record<string, Array<Record<string, any>>> = {};
    const relationObject: Record<string, any> = {};
    for (const table in schema) {
      if (schema.hasOwnProperty(table)) {
        result[`${table}`] = Array.from({ length: numberOfData }).map(() => {
          const data: Record<string, any> = {};
          const tableObject = schema[table];
          for (const colKey in tableObject) {
            const colObj = tableObject[colKey];
            if (tableObject.hasOwnProperty(colKey)) {
              if (colObj?.isPrimary) {
                relationObject[`${table}`] = colKey;
              }
              if (colObj?.foreignKey) {
                const [relationalTable, relationalKey, ..._] =
                  colObj.foreignKey.split(".");
                const { relData } = this.getRandomElement({
                  relData: result[`${relationalTable}`] || [],
                });
                data[`${colKey}`] = relData[`${relationalKey}`];
                continue;
              }
              const res =
                !!(colObj.required === undefined || colObj.required) ||
                colObj.isPrimary
                  ? this.getRandomvalueWithProps({
                      type: colObj.type,
                      min: colObj?.min,
                      max: colObj?.max,
                    })
                  : null;
              if (colObj?.callback && !colObj.isPrimary) {
                data[`${colKey}`] = colObj.callback(res);
              } else {
                data[`${colKey}`] = res;
              }
              if (!res && colObj?.default) {
                data[`${colKey}`] = colObj.default;
              }
            }
          }
          // implement include exclude
          return data;
        });
      }
    }
    return result;
  }

  public generateRandomName(length = 7) {
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

  public generateRandomCity() {
    const { CITIES: city } = this.getRandomElement({ CITIES });
    return city;
  }

  public generateRandomCountry() {
    const { COUNTRIES: country } = this.getRandomElement({ COUNTRIES });
    return country;
  }

  public generateRandomSerName(length = 7) {
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

  public generateRandomFullName(payload: IFullNamePayload = {}) {
    const { firstnameLength = 5, lastNameLength = 5 } = payload;
    return `${new String(
      this.generateRandomName(firstnameLength) +
        " " +
        this.generateRandomSerName(lastNameLength)
    )}`;
  }

  public generateRandomUserName(payload: IRandomUsername = {}) {
    const { includeNumbers = true, length = 7 } = payload;
    let username = this.generateRandomString(length, false, false);

    if (includeNumbers) {
      const randomNumber = this.getRandomInt(100, 9999999999);
      username = username
        .substring(0, length - 3)
        .concat(`${randomNumber}`)
        .substring(0, length);
    }
    return username;
  }

  public generateRandomShortDescrption(payload?: IFPayload) {
    const {
      ADJECTIVES: randomAdjective,
      NOUNS: randomNoun,
      VERBS: randomVerb,
    } = this.getRandomElement({ ADJECTIVES, NOUNS, VERBS });

    return `${randomAdjective} ${randomNoun} that ${randomVerb} your life.`;
  }

  public generateRandomLongDescription(payload?: IFPayload) {
    const { length } = this.parsePayload(payload);
    let description = "";
    for (let i = 0; i < length; i++) {
      const {
        ADJECTIVES: randomAdjective,
        NOUNS: randomNoun,
        VERBS: randomVerb,
      } = this.getRandomElement({ ADJECTIVES, NOUNS, VERBS });

      const tempdescription =
        description +
        `${randomAdjective} ${randomNoun} that ${randomVerb} your ${randomNoun} and ${randomVerb} your ${randomAdjective} ${randomNoun}.`;
      if (tempdescription.length > length) {
        break;
      }
      description += tempdescription;
    }
    return description.trim();
  }

  public generateRandomAge(payload?: IFPayload) {
    return this.getRandomInt(payload?.min ?? 18, payload?.max ?? 99);
  }

  public generateRandomEmail(payload: IGenEmailPayload = {}): string {
    try {
      const {
        startWith = "",
        includeNumbers = true,
        length = 7,
        hostDomains = DISPOSABLE_EMAIL_PROVIDER,
        excludeEmails = [],
      } = payload;
      let { hostDomains: domain } = this.getRandomElement({
        hostDomains,
      });
      domain = domain.split("@").reverse()[0];
      let email = startWith;
      const usernameLength = Math.max(length - startWith.length, 6);
      email += this.generateRandomString(usernameLength, false, false);
      if (includeNumbers) {
        const randomNumber = this.getRandomInt(100, 9999999999);
        email = email
          .substring(0, usernameLength - 3)
          .concat(`${randomNumber}`)
          .substring(0, usernameLength);
      } else {
        email = email.substring(0, usernameLength);
      }
      email = `${email}@${domain}`;
      if (excludeEmails.includes(email)) {
        return this.generateRandomEmail({
          startWith,
          includeNumbers,
          length,
          hostDomains,
          excludeEmails,
        });
      }
      return email;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public UUIDV2(uid = 0, gid = 0) {
    const timestamp = new Date().getTime();
    const posixUid = uid;
    const posixGid = gid;
    const uuidTimeLow = timestamp & 0xffffffff;
    const uuidTimeMid = (timestamp >> 32) & 0xfffff;
    const uuidTimeHiAndVersion = ((timestamp >> 48) & 0x0fff) | 0x1000;
    const uuidClockSeqHiAndReserved = (posixUid << 24) | (posixGid << 16);
    const uuidClockSeqLow = 0;
    return (
      this.hex(uuidTimeLow, 8) +
      "-" +
      this.hex(uuidTimeMid % 0x10000, 4) +
      "-" +
      this.hex(uuidTimeHiAndVersion, 4) +
      "-" +
      this.hex(uuidClockSeqHiAndReserved, 4) +
      "-" +
      this.hex(uuidClockSeqLow, 8)
    );
  }

  public UUIDV3(namespace: string, name: string) {
    const namespaceBytes = this.uuidToBytes(namespace);
    const nameBytes = this.stringToBytes(name);
    const combinedBytes = new Uint8Array(
      namespaceBytes.length + nameBytes.length
    );
    combinedBytes.set(namespaceBytes);
    combinedBytes.set(nameBytes, namespaceBytes.length);
    const md5Hash = crypto.createHash("md5").update(combinedBytes).digest();
    md5Hash[6] &= 0x0f;
    md5Hash[6] |= 0x30;
    md5Hash[8] &= 0x3f;
    md5Hash[8] |= 0x80;

    return this.bytesToUUID(md5Hash);
  }

  public UUIDV4() {
    const uuidTime = new Date().getTime();
    const uuidClockSeq = Math.floor(Math.random() * 16384);
    const uuidNode = Math.floor(Math.random() * 16777216);
    const uuidTimestamp = uuidTime * 10000 + 0x01b21dd213814000;
    const uuidClockSeqHi = (uuidClockSeq & 0x3fff) | 0x8000;
    const uuidNodeHi = ((uuidNode & 0xffffff) | 0x01000000) % 0x1000000;

    return (
      this.hex(uuidTimestamp, 16) +
      "-" +
      this.hex(uuidClockSeq, 4) +
      "-" +
      this.hex(uuidClockSeqHi, 4) +
      "-" +
      this.hex(uuidNode, 6) +
      "-" +
      this.hex(uuidNodeHi, 6)
    );
  }

  public UUIDV5(namespace: string, name: string) {
    const namespaceBytes = this.uuidToBytes(namespace);
    const nameBytes = this.stringToBytes(name);
    const combinedBytes = new Uint8Array(
      namespaceBytes.length + nameBytes.length
    );
    combinedBytes.set(namespaceBytes);
    combinedBytes.set(nameBytes, namespaceBytes.length);
    const sha1Hash = crypto.createHash("sha1").update(combinedBytes).digest();
    sha1Hash[6] &= 0x0f;
    sha1Hash[6] |= 0x50;
    sha1Hash[8] &= 0x3f;
    sha1Hash[8] |= 0x80;
    return this.bytesToUUID(sha1Hash);
  }
}
