import { OpenPopupTypeCode, PopupItem } from "stores/usePageMapStore";

export function openWindow(windowUrl: string, windowItem: PopupItem) {
  const arrParams = new Array();

  const parentCallback = windowItem.params?.callback;
  const popupTypeCode = windowItem.options?.popupType;

  let objPopup;
  if (windowItem.params) {
    Object.entries(windowItem.params).forEach(([key, value]) => {
      // key가 "callback"인 경우 현재 반복을 건너뛰고 다음 반복으로 넘어감
      if (key === "callback") {
        return; // continue;
      }
      arrParams.push(key + "=" + value);
    });
  }
  arrParams.push("openTypeCode=WINDOW");

  const url = windowUrl + "?" + arrParams.join("&");

  let width = windowItem.options?.width ?? 800;
  let height = windowItem.options?.height ?? 600;

  const screenLeft = top?.window.screenLeft != undefined ? top?.window.screenLeft : top?.screenLeft;
  const screenTop = top?.window.screenTop != undefined ? top?.window.screenTop : top?.screenTop;

  const windowWidth = top?.window.innerWidth || top?.document.documentElement.clientWidth || top?.screen.width || 800;
  const windowHeight = top?.window.innerHeight ?? top?.document.documentElement.clientHeight ?? top?.screen.height ?? 600;

  const posTop = windowHeight / 2 - height / 2 + (screenTop ?? 0);
  const posleft = windowWidth / 2 - width / 2 + (screenLeft ?? 0);

  if (width == 0 && height == 0) {
    width = screen.width;
    height = screen.height;
    if (windowItem.options) {
      windowItem.options.fullscreen = "yes";
    }
  } else {
    if (height) {
      height = height + 45;
    }
  }

  const features = new Array();
  features.push("width=" + windowItem.options?.width);
  features.push("height=" + windowItem.options?.height);
  features.push("top=" + posTop);
  features.push("left=" + posleft);
  features.push("scrollbars=" + windowItem.options?.scrollbars || "no");
  features.push("resizable=" + windowItem.options?.resizable || "yes");
  features.push("menubar=" + windowItem.options?.menubar || "no");
  features.push("toolbar=" + windowItem.options?.toolbar || "no");
  features.push("location=" + windowItem.options?.location || "no");
  features.push("directories=" + windowItem.options?.directories || "no");
  features.push("status=" + windowItem.options?.status || "no");
  features.push("fullscreen=" + windowItem.options?.fullscreen || "no");

  switch (popupTypeCode) {
    case OpenPopupTypeCode.TAB:
      objPopup = window.open(url);
      break;
    case OpenPopupTypeCode.NORMAL:
      objPopup = window.open(url, windowItem.id, features.join(","));
      break;
    default:
      objPopup = window.open(url, windowItem.id, features.join(","));
      break;
  }

  if (objPopup) {
    objPopup.parentCallback = parentCallback;
  }

  return objPopup;
}
