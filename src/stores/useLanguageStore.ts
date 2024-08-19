import { create } from "zustand";
import { getTranslatedMessages, changeSessionLangCd } from "apis/system/TranslatedMessage";
import i18n from "i18n";
import useSessionStore from "stores/useSessionStore";
import { LangType } from "@/models/common/Session";
import message_ko from "locales/message_ko.json";
import message_en from "locales/message_en.json";
import message_pl from "locales/message_pl.json";
import message_zhC from "locales/message_zhC.json";
import message_zhT from "locales/message_zhT.json";
// import * from '';

interface LanguageState {
  currentLanguage: LangType;
  translatedMessages: { [key: string]: string };
  setTranslatedMessages: (message: { [key: string]: string }) => void;
  initLanguage: () => void;
  changeLanguage: (newLocale: LangType, callBack?: () => void) => void;
  refreshLanguage: () => void;
}

const changeTranslatedMessages = async (newLangCd: LangType) => {
  const translations = await getTranslatedMessages(newLangCd);
  i18n.addResourceBundle(newLangCd, "translation", translations);
  i18n.changeLanguage(newLangCd);
  i18n.reloadResources();
  changeSessionLangCd(newLangCd);
  useSessionStore.getState().setLangCd(newLangCd);

  return translations;
};

const useLanguageStore = create<LanguageState>((set, get) => {
  return {
    currentLanguage: useSessionStore.getState().langCd || "ko",
    translatedMessages: {},
    setTranslatedMessages: (message: { [key: string]: string }) => {
      set({ translatedMessages: message });
    },
    initLanguage: async () => {
      // i18n.addResourceBundle('ko', 'translation', message_ko);
      /// i18n.addResourceBundle('en', 'translation', message_en);
      // i18n.addResourceBundle('pl', 'translation', message_pl);
      //  i18n.addResourceBundle('zhC', 'translation', message_zhC);
      ///  i18n.addResourceBundle('zhT', 'translation', message_zhT);
      const langCd = useSessionStore.getState().langCd || "ko";
      const translation = await changeTranslatedMessages(langCd);
      set({ translatedMessages: await translation });
      set({ currentLanguage: langCd });
      useSessionStore.getState().setLangCd(langCd);
    },
    changeLanguage: async (newLanguage: LangType, callBack?: () => void) => {
      const translation = await changeTranslatedMessages(newLanguage);
      set({ currentLanguage: newLanguage });
      set({ translatedMessages: await translation });

      useSessionStore.getState().setLangCd(newLanguage);
      callBack && callBack();
    },
    refreshLanguage: async () => {
      const { currentLanguage } = get();
      const langCd = useSessionStore.getState().langCd || currentLanguage;
      const translation = await changeTranslatedMessages(langCd);
      set({ translatedMessages: await translation });
    },
  };
});

export default useLanguageStore;
