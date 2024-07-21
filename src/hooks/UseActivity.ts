import { useContext } from "react";

import { ActivityContext } from "../context/ContextActivity";

export const useAcivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error(
      "El hook useActivity debe ser utilizado en un ActivtyProvider"
    );
  }
  return context;
};
