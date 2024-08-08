export enum CrudCode {
  CREATE = "C",
  READ = "R",
  UPDATE = "U",
  DELETE = "D",
}

export interface Crud {
  crudKey?: CrudCode;
  uuid?: string;
}

export enum EditType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}
