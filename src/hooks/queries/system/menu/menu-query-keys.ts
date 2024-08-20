export const MenuQueryKeys = {
  key: ["menu"] as const,
  menuAll: () => [...MenuQueryKeys.key, "menuAll"] as const,
};
