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

export interface ObjectSchema {
  [key: string]:
    | SchemaType.Name
    | SchemaType.Age
    | SchemaType.Gender
    | SchemaType.Email
    | SchemaType.UUID
    | SchemaType.Number
    | SchemaType.String
    | SchemaType.Boolean
    | ObjectSchema
    | (
        | SchemaType.Name
        | SchemaType.Age
        | SchemaType.Gender
        | SchemaType.Email
        | SchemaType.UUID
        | SchemaType.Number
        | SchemaType.String
        | SchemaType.Boolean
      )[];
}
export namespace SchemaType {
  export type Name = "name";
  export type Age = "age";
  export type Gender = "gender";
  export type Email = "email";
  export type UUID = "uuid";
  export type Number = number;
  export type String = string;
  export type Boolean = boolean;
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
