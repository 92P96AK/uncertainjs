export const NAME = "name";
export const USER_NAME = "username";
export const FULL_NAME = "fullName";
export const FIRST_NAME = "firstName";
export const LAST_NAME = "lastName";
export const SER_NAME = "serName";
export const DATE = "date";
export const GRAPH = "graph";
export const CORDINATES = "cordinates";
export const COUNTRY = "country";
export const CITY = "city";
export const RGB = "rgb";
export const HEX = "hex";
export const HLS = "hls";
export const EMOJI = "emoji";
export const IMAGE_URL = "imageUrl";
export const AGE = "age";
export const GENDER = "gender";
export const EMAIL = "email";
export const UUID = "uuid";
export const SHORT_DESCRIPTION = "shortDescription";
export const LONG_DESCRIPTION = "longDescription";
export const BOOLEAN = "boolean";
export const STRING = "string";
export const POSTAL_CODE = "postalCode";
export const PASSWORD = "password";
export const SERIAL = "serial";
export const NUMBER = "number";

export const DATA_TYPES = [
  NAME,
  USER_NAME,
  FULL_NAME,
  FIRST_NAME,
  LAST_NAME,
  SER_NAME,
  DATE,
  GRAPH,
  CORDINATES,
  COUNTRY,
  CITY,
  RGB,
  HEX,
  HLS,
  EMOJI,
  UUID,
  SHORT_DESCRIPTION,
  LONG_DESCRIPTION,
  BOOLEAN,
  STRING,
  POSTAL_CODE,
  PASSWORD,
  SERIAL,
  NUMBER,
  IMAGE_URL,
  EMAIL,
  AGE,
] as const;

export const DATE_TYPES = {
  DATE: "DATE",
  TIMETZ: "TIMETZ",
  TIME: "TIME",
  TIMESTAMP: "TIMESTAMP",
  TIMESTAMPTZ: "TIMESTAMPTZ",
  INTERVAL: "INTERVAL",
};
