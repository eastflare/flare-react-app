export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export type UnArray<T> = T extends Array<infer U> ? U : T;
