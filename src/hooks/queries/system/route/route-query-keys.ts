import { RouteCondition } from "@/models/system/Route";

export const routeQueryKeys = {
  key: ["route"] as const,
  routes: ({ ruteId, ruteNm, ruteUrl, useYn }: RouteCondition) => [...routeQueryKeys.key, "routes", { ruteId, ruteNm, ruteUrl, useYn }] as const,
};
