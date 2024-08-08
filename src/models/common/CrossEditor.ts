interface SizeInfo {
  width: number;
  height: number;
}

/**
 * @typedef ImageInfo
 * @property {HTMLImageElement | null} type;
 * @property {number} size
 * @property {path} string
 */
interface ImageInfo {
  element: HTMLImageElement | null;
  type: number;
  size: number;
  path: string;
}

export interface CrossEditorParams {
  AccessibilityOption?: number;
  ActiveTab?: number;
  AddMenu?: string;
  AjaxCacheSetup?: boolean;
  AlertCopyPasteImg?: boolean;
  AllowBrowserContextMenu?: boolean;
  AllowContentIframe?: boolean;
  AllowContentScript?: boolean;
  AttributeBlockList?: string[];
  AttrImage?: boolean;
  AutoInstall?: boolean;
  AutoSavePeriod?: number;
  BlankSpanRemove?: boolean;
  CBInsertedImage?: (img: HTMLImageElement, type: number) => void;
  CBInsertedImageEx?: (imageInfo: ImageInfo) => void;
  CBResizeEditor?: (sizeInfo: SizeInfo) => void;
  CheckNbspInPTag?: boolean;
  Chevron?: boolean;
  ClipBoardClearFormatting?: boolean;
  ConfigXmlURL?: string;
  CreateTab?: number;
  CreateToolbar?: string;
  Css?: string;
  Csslist?: string;
  DefaultDocType?: string;
  DefaultFont?: string;
  DefaultFontSize?: string;
  DefaultWordBreak?: boolean;
  DeleteCommand?: string[];
  DisableInputIdClass?: boolean;
  DisplayLoadingBar?: boolean;
  DisplayNoneTarget?: HTMLElement;
  DocBaseURL?: string;
  DocTitle?: string;
  EditorBaseURL?: string;
  EmoticonPath?: string;
  event?: Record<string, any>;
  ExceptionMsg?: string;
  FixedWidth?: number;
  Font?: Record<string, string>;
  FontColor?: string;
  FontSizeList?: string[];
  FullScreen?: boolean;
  Height?: number;
  HideAddImageCheckbox?: boolean;
  HideNoneBoardTable?: boolean;
  HTMLTabByTableLock?: boolean;
  HTMLTabContents?: string;
  HyperLinkDefaultTarget?: "none" | "_blank" | "_self" | "_parent" | "_top";
  IconColor?: string;
  ImageSavePath?: string;
  ImageWidthLimit?: number;
  ImgLineColor?: string;
  IndentPaddingValue?: number;
  InsertOnlyIframeSource?: boolean;
  IsQuestAutoSave?: boolean;
  LayeredListIndentOutdent?: boolean;
  LimitClipboardNodeCount?: number;
  LineHeight?: number;
  LineHeightList?: string[];
  Menu?: boolean;
  MenuInEditor?: boolean;
  NoImage?: boolean;
  NoScrollFocus?: boolean;
  NoSpellCheck?: boolean;
  NoUseImageDefaultStyle?: boolean;
  NoUseInsertParagraph?: boolean;
  NoUseIOSScroll?: boolean;
  NoUseToolBarPanelHTML?: boolean;
  ParagraphTagStyle?: Record<string, string>;
  ParentEditor?: HTMLElement;
  Placeholder?: string;
  PluginPosition?: HTMLIFrameElement;
  PluginPrintSize?: Record<string, number>;
  PluginTopPosition?: boolean;
  PreventEditorHotKey?: string;
  ProfanityStr?: string;
  PutStyleInBody?: boolean;
  Readonly?: boolean;
  RemovePathFromForm?: boolean;
  RemoveScriptBlock?: boolean;
  RemoveTableAlignInIE11?: boolean;
  ResizeBar?: boolean;
  ReturnKeyActionBR?: boolean;
  ServerUrl?: number;
  SetColorPicker?: { palette: string[]; extend: boolean };
  SetColorPickerPlette?: Array<string[]>;
  SetDebug?: boolean;
  SetFocus?: boolean;
  ShowDisplayNoneObj?: boolean | number;
  ShowEditorBodyScroll?: boolean;
  ShowFixedWidth?: boolean;
  ShowRuler?: boolean;
  Skin?: string;
  SpanGrammarIgnore?: boolean;
  StrutsAction?: string;
  SupportBrowser?: number;
  TableBGColor?: string;
  TableLineColor?: string;
  TableMaxSize?: number;
  TagBlockList?: string[];
  Template?: Array<Record<string, string>>;
  UploadEtcFileExecutePath?: string;
  UploadFileExecutePath?: string;
  UploadFileExtBlockList?: string[];
  UploadFileNameType?: string;
  UploadFileSizeLimit?: string;
  UploadFileSubDir?: boolean;
  UseCssExpression?: boolean;
  UserLang?: string;
  UserSkinColor?: string;
  UserToolbar?: boolean;
  WebLanguage?: string;
  WebServerInfo?: string;
  WebsourcePath?: string;
  Width?: any;
}
