import { useContext } from "react";
import { PermissionContext } from "../context/PermissionsContext";

export const usePermissions = () => {
  return useContext(PermissionContext);
};
