export const FileQueryKeys = {
  key: ["file"] as const,
  findFiles: (atchFileGrId: string) => [...FileQueryKeys.key, "findFiles", atchFileGrId],
};
