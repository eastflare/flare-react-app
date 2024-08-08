import i18n from "i18n";
import _ from "lodash";
import { Emptiable } from "models/common/FalsyGeneric";

export const translate = (messageCode: Emptiable<string>): string => {
  const t = i18n.t;

  if (_.isEmpty(messageCode)) {
    return "";
  }

  return t(messageCode as string);
};
