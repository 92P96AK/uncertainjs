import { DATA_TYPES } from "../constants";
import {
  ObjectT,
  FieldSchema,
  SerialFieldSchema,
  NonSerialFieldSchema,
} from "../interface";

function isObjectT(value: any): value is ObjectT {
  return DATA_TYPES.includes(value);
}

function isSerialFieldSchema(field: FieldSchema): field is SerialFieldSchema {
  return field.type === "serial";
}
function isNonSerialFieldSchema(
  field: FieldSchema
): field is NonSerialFieldSchema {
  return isObjectT(field.type) && field.type !== "serial";
}

function validateFieldSchema(field: any): field is FieldSchema {
  if (field && typeof field === "object" && isObjectT(field.type)) {
    if (isSerialFieldSchema(field)) {
      return true;
    }
    if (isNonSerialFieldSchema(field)) {
      return true;
    }
  }
  return false;
}

export function validateRelationalSchema(schema: any): Array<object> | null {
  const errors: Array<object> = [];
  if (schema && typeof schema === "object") {
    for (const tableKey in schema) {
      if (schema.hasOwnProperty(tableKey)) {
        const table = schema[tableKey];
        if (typeof table !== "object") {
          errors.push({
            type: "table",
            error: `Table ${tableKey} should be an object`,
          });
          continue;
        }

        for (const fieldKey in table) {
          if (table.hasOwnProperty(fieldKey)) {
            const field = table[fieldKey];
            if (
              field &&
              ((field.type === "user-defined" && field.oneOf.length) ||
                field.type == "json" ||
                field.type == "jsonb")
            ) {
              continue;
            }
            if (!validateFieldSchema(field)) {
              errors.push({
                type: "field",
                error: `Invalid field schema for ${fieldKey} in table ${tableKey}`,
              });
            }
          }
        }
      }
    }
  } else {
    errors.push({
      type: "schema",
      error: `Schema should be an object`,
    });
  }
  return errors.length ? errors : null;
}
