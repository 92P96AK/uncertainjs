export interface IPasswordOptions {
  includeUppercase?: boolean;
  includeNumbers?: boolean;
  includeSpecialChars?: boolean;
  length?: number;
}

type AUDIO_FILE_TYPE = "wav";

export interface IRandomNoiseOptions {
  duration?: number;
  sampleRate?: number;
  fileName?: string;
  type?: AUDIO_FILE_TYPE;
}
export interface IRandomNoise {
  duration: number;
  sampleRate: number;
  fileName: string;
  type: AUDIO_FILE_TYPE;
}

export interface IRandomImageOptions {
  height?: number;
  width?: number;
}

export interface ILatLong {
  latitude: number;
  longitude: number;
}

export interface RelationalSchema {
  [key: string]:
    | {
        type: ObjectT;
        min?: number;
        max?: number;
        callback?: (result: string, error: Error) => void;
        include?: Array<string>;
        exclude?: Array<string>;
        isPrimary?: true;
        foreignKey?: string;
      }
    | RelationalSchema
    | RelationalSchema[];
}

export interface Schema {
  [key: string]: ObjectT | Schema | Schema[];
}

export type ObjectT =
  | "name"
  | "username"
  | "fullName"
  | "firstName"
  | "lastName"
  | "serName"
  | "date"
  | "graph"
  | "cordinates"
  | "country"
  | "city"
  | "age"
  | "rgb"
  | "hex"
  | "hls"
  | "emoji"
  | "imageUrl"
  | "age"
  | "gender"
  | "email"
  | "uuid"
  | "shortDescription"
  | "longDescription"
  | "boolean"
  | "string"
  | "postalCode"
  | "password"
  | "number";

export interface IFPayload {
  min?: number;
  max?: number;
  length?: number;
}

export interface IFParsePayload {
  min: number;
  max: number;
  length: number;
}

export interface IGenEmailPayload {
  startWith?: string;
  includeNumbers?: boolean;
  length?: number;
  hostDomains?: Array<string>;
  excludeEmails?: Array<string>;
}

export interface IFullNamePayload {
  firstnameLength?: number;
  lastNameLength?: number;
}
export interface IRandomUsername {
  includeNumbers?: boolean;
  length?: number;
}
