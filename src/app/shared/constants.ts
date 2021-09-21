import { DataFieldType, DataFieldUnit } from "./api/api";

export const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

export const DataFieldTypes = Object.keys(DataFieldType).filter(key => isNaN(Number(key)))
export const DataFieldUnits = Object.keys(DataFieldUnit).filter(key => isNaN(Number(key)))