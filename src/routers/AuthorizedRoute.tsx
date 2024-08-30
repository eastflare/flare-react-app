import { RoleCode } from "@/models/system/Role";
import useSessionStore from "@/stores/useSessionStore";
import { Navigate } from "react-router-dom";

interface AuthorizedRouteProps {
  element: JSX.Element;
  allowedRoles?: RoleCode[]; // RoleCode enum의 배열 타입
}

const AuthorizedRoute = ({ element, allowedRoles }: AuthorizedRouteProps) => {
  if (!allowedRoles) return element;

  const { roleCodes } = useSessionStore();
  const hasAccess = roleCodes.some(roleCode => allowedRoles.includes(roleCode as RoleCode));
  return hasAccess ? element : <Navigate to='/unauthorized' />;
};

export default AuthorizedRoute;
