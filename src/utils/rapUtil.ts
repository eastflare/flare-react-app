import { v4 as uuid } from "uuid";
import { sha256 as jsSha256 } from "js-sha256";

export const getUuid = (prefix?: string): string => {
    return prefix ? prefix + uuid() : uuid();
};

export async function sha256(message: string = "") {
    return jsSha256(message);
}
