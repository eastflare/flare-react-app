import { Menu } from "models/system/Menu";

const nest = (menuData: Menu[], mnuId = "000000", link = "upprMnuId") => menuData.filter(item => item[link] === mnuId).map(item => ({ ...item, children: nest(menuData, item.mnuId) }));

function toAbsolutePath(path: string) {
  if (path === "") {
    return path;
  }

  return path.startsWith("/") ? path : "/" + path;
}

export { nest, toAbsolutePath };
