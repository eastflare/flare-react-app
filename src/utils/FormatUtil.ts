export const convertNull = (obj: object) => {
  for (const prop in obj) {
    if (obj[prop] === null) {
      obj[prop] = "";
    }
  }
  return obj;
};
