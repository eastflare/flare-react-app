export const convertNull = (obj: any) => {
  for (const prop in obj) {
    if (obj[prop] === null) {
      obj[prop] = "";
    }
  }
  return obj;
};
