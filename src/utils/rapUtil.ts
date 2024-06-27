import {v4 as uuid} from 'uuid';

export const getUuid = (prefix?:string) : string => {
    return prefix ? prefix + uuid() : uuid();
};
