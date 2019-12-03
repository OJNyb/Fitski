import { useContext } from "react";
import { ViewContext } from "../context/viewContext";

function useMobile() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error(`useMobile must be used within a ViewProvider`);
  }
  return context;
}

export default useMobile;
