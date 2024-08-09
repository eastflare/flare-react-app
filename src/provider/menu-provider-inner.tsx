import { useMenuAccessEffect } from "./use-menu-access-effect";
import { useMenuPathEffect } from "./use-menu-path-effect";

type MenuProviderInnerProps = {
  children: React.ReactNode;
};

function MenuProviderInner({ children }: MenuProviderInnerProps) {
  useMenuAccessEffect();
  useMenuPathEffect();

  return <>{children}</>;
}

export { MenuProviderInner };
