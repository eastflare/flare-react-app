export const returnByteLength = (str: string) => {
  let byteLength = 0;

  for (let i = 0; i < str.length; ++i) {
    str.charCodeAt(i) > 127 ? (byteLength += 3) : byteLength++;
  }

  return byteLength;
};
