import { create } from "zustand";
import { Session, LangType, GridNoRowsTemplateData } from "@/models/common/Session";
import { Menu } from "@/models/system/Menu";

interface SessionState {
  userId: string;
  empNm: string;
  langCd: LangType | "";
  roleCodes: string[];
  menus: Menu[];
  headerMenus: Menu[];
  timeZoneCd: string;
  userCopCd: string;
  userDeptCd: string;
  empNo?: string;
  empEngNm?: string;
  empCngNm?: string;
  deptCd?: string;
  deptNm?: string;
  deptEngNm?: string;
  deptCngNm?: string;
  copCd?: string;
  jtiCd?: string;
  jtiNm?: string;
  jtiEngNm?: string;
  jtiCngNm?: string;
  jpsCd?: string;
  jpsNm?: string;
  jpsEngNm?: string;
  jpsCngNm?: string;
  upprEmpNo?: string;
  upprUserId?: string;
  onduRegnCd?: string;
  onduRegnNm?: string;
  ctryCd?: string;
  teamYn: string;
  tldYn: string;
  leasTeamYn: string;
  leasTldYn: string;
  gleasTeamYn: string;
  gleasTldYn: string;
  mgrDeptCd: string;
  resetSession: () => void;
  setSession: (session: Session) => void;
  setLangCd: (langCd: LangType) => void;
  setMenus: (menus: Menu[]) => void;
  gridNoRowsTemplate: GridNoRowsTemplateData;
}

export const homeMenu: Menu = {
  mnuId: "",
  mnuNm: "HOME",
  mnuUrl: "",
};

export const useSessionStore = create<SessionState>(set => {
  return {
    userId: "",
    empNm: "",
    langCd: "",
    roleCodes: [],
    menus: [],
    headerMenus: [],
    timeZoneCd: "",
    userCopCd: "",
    userDeptCd: "",
    empNo: "",
    empEngNm: "",
    empCngNm: "",
    deptCd: "",
    deptNm: "",
    deptEngNm: "",
    deptCngNm: "",
    copCd: "",
    jtiCd: "",
    jtiNm: "",
    jtiEngNm: "",
    jtiCngNm: "",
    jpsCd: "",
    jpsNm: "",
    jpsEngNm: "",
    jpsCngNm: "",
    upprEmpNo: "",
    upprUserId: "",
    onduRegnCd: "",
    onduRegnNm: "",
    ctryCd: "",
    teamYn: "",
    tldYn: "",
    leasTeamYn: "",
    leasTldYn: "",
    gleasTeamYn: "",
    gleasTldYn: "",
    mgrDeptCd: "",
    gridNoRowsTemplate: GridNoRowsTemplateData.ko,
    resetSession: async () => {
      set({
        userId: "",
        empNm: "",
        langCd: "",
        roleCodes: [],
        menus: [],
        headerMenus: [],
        timeZoneCd: "",
        userCopCd: "",
        userDeptCd: "",
        empNo: "",
        empEngNm: "",
        empCngNm: "",
        deptCd: "",
        deptNm: "",
        deptEngNm: "",
        deptCngNm: "",
        copCd: "",
        jtiCd: "",
        jtiNm: "",
        jtiEngNm: "",
        jtiCngNm: "",
        jpsCd: "",
        jpsNm: "",
        jpsEngNm: "",
        jpsCngNm: "",
        upprEmpNo: "",
        upprUserId: "",
        onduRegnCd: "",
        onduRegnNm: "",
        ctryCd: "",
        teamYn: "",
        tldYn: "",
        leasTeamYn: "",
        leasTldYn: "",
        gleasTeamYn: "",
        gleasTldYn: "",
        mgrDeptCd: "",
        gridNoRowsTemplate: GridNoRowsTemplateData.ko,
      });
    },
    setSession: (session: Session) => {
      const headerMenuList = session.menus?.filter(item => item["upprMnuId"] === "000000") ?? [];

      set({
        userId: session.userId,
        empNm: session.empNm,
        langCd: session.langCd,
        roleCodes: session.roleCodes,
        menus: session.menus,
        headerMenus: headerMenuList,
        timeZoneCd: session.timeZoneCd,
        userCopCd: session.userCopCd,
        userDeptCd: session.userDeptCd,
        empNo: session.empNo,
        empEngNm: session.empEngNm,
        empCngNm: session.empCngNm,
        deptCd: session.deptCd,
        deptNm: session.deptNm,
        deptEngNm: session.deptEngNm,
        deptCngNm: session.deptCngNm,
        copCd: session.copCd,
        jtiCd: session.jtiCd,
        jtiNm: session.jtiNm,
        jtiEngNm: session.jtiEngNm,
        jtiCngNm: session.jtiCngNm,
        jpsCd: session.jpsCd,
        jpsNm: session.jpsNm,
        jpsEngNm: session.jpsEngNm,
        jpsCngNm: session.jpsCngNm,
        upprEmpNo: session.upprEmpNo,
        upprUserId: session.upprUserId,
        onduRegnCd: session.onduRegnCd,
        onduRegnNm: session.onduRegnNm,
        ctryCd: session.ctryCd,
        teamYn: session.teamYn,
        tldYn: session.tldYn,
        leasTeamYn: session.leasTeamYn,
        leasTldYn: session.leasTldYn,
        gleasTeamYn: session.gleasTeamYn,
        gleasTldYn: session.gleasTldYn,
        mgrDeptCd: session.mgrDeptCd,
        gridNoRowsTemplate: GridNoRowsTemplateData[session.langCd || "ko"],
      });
    },
    setLangCd: (langCd: LangType) => {
      set(prev => ({ ...prev, langCd: langCd }));
    },
    setMenus(menus: Menu[]) {
      set(prev => ({ ...prev, menus: menus }));
    },
  };
});
export default useSessionStore;
