import { OpenPopupTypeCode, PageItem } from "store/pageMapStore";

export function openWindow(pageItem: PageItem) {
  const arrParams = new Array();

  const parentCallback = pageItem.params?.callback;
  const popupTypeCode = pageItem.options?.popupType;
  let objPopup;
  console.log("파람스의 callback", parentCallback);

  if (pageItem.params) {
    Object.entries(pageItem.params).forEach(([key, value]) => {
      // key가 "callback"인 경우 현재 반복을 건너뛰고 다음 반복으로 넘어감
      if (key === "callback") {
        return; // forEach에서의 return은 현재 반복을 건너뜀
      }
      //arrParams에 "key=value" 형식으로 추가
      arrParams.push(key + "=" + value);
    });
  }
  arrParams.push("openTypeCode=WINDOW");

  const url = pageItem.pathname + "?" + arrParams.join("&");

  let width = pageItem.options?.width ?? 800;
  let height = pageItem.options?.height ?? 600;

  const screenLeft = top?.window.screenLeft != undefined ? top?.window.screenLeft : top?.screenLeft;
  const screenTop = top?.window.screenTop != undefined ? top?.window.screenTop : top?.screenTop;

  const windowWidth =
    top?.window.innerWidth || top?.document.documentElement.clientWidth || top?.screen.width || 800;
  const windowHeight =
    top?.window.innerHeight ??
    top?.document.documentElement.clientHeight ??
    top?.screen.height ??
    600;

  const posTop = windowHeight / 2 - height / 2 + (screenTop ?? 0);
  const posleft = windowWidth / 2 - width / 2 + (screenLeft ?? 0);

  if (width == 0 && height == 0) {
    width = screen.width;
    height = screen.height;
    if (pageItem.options) {
      pageItem.options.fullscreen = "yes";
    }
  } else {
    if (height) {
      height = height + 45;
    }
  }

  const features = new Array();
  features.push("width=" + pageItem.options?.width);
  features.push("height=" + pageItem.options?.height);
  features.push("top=" + posTop);
  features.push("left=" + posleft);
  features.push("scrollbars=" + pageItem.options?.scrollbars || "no");
  features.push("resizable=" + pageItem.options?.resizable || "yes");
  features.push("menubar=" + pageItem.options?.menubar || "no");
  features.push("toolbar=" + pageItem.options?.toolbar || "no");
  features.push("location=" + pageItem.options?.location || "no");
  features.push("directories=" + pageItem.options?.directories || "no");
  features.push("status=" + pageItem.options?.status || "no");
  features.push("fullscreen=" + pageItem.options?.fullscreen || "no");

  switch (popupTypeCode) {
    case OpenPopupTypeCode.TAB:
      objPopup = window.open(url);
      break;
    case OpenPopupTypeCode.NORMAL:
      objPopup = window.open(url, "_blank", features.join(","));
      break;
    default:
      objPopup = window.open(url, "_blank", features.join(","));
      break;
  }

  if (objPopup) {
    console.log("페어런트 콜팩이 추가가 됐나요?", parentCallback);
    objPopup.parentCallback = parentCallback;
  }

  return objPopup;
}
