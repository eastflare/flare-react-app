import { RouteCondition } from "@/models/system/Route";

export const routeQueryKeys = {
  key: ["route"] as const,
  routes: ({ ruteId, ruteNm, rutePathNm, cpntPathNm, lazyLodYn, useYn }: RouteCondition) => [...routeQueryKeys.key, "routes", { ruteId, ruteNm, rutePathNm, cpntPathNm, lazyLodYn, useYn }] as const,
};
