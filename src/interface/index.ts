import { DATA_TYPES } from "../constants";

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

export type ObjectT = (typeof DATA_TYPES)[number];

export type BaseFieldSchema = {
  min?: number;
  max?: number;
  callback?: (result: any) => void;
  isPrimary?: true;
  foreignKey?: string;
  required?: boolean;
  default?: any;
};

export type SerialFieldSchema = BaseFieldSchema & {
  type: "serial";
  serialStartFrom?: number;
};

export type NonSerialFieldSchema = BaseFieldSchema & {
  type: Exclude<ObjectT, "serial">;
  serialStartFrom?: never;
};

export type FieldSchema = SerialFieldSchema | NonSerialFieldSchema;

export interface RelationalSchema {
  [key: string]: {
    [key: string]: FieldSchema;
  };
}

export interface Schema {
  [key: string]: ObjectT | Schema | Schema[];
}

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