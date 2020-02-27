import { useContext, createContext } from "react";
import useMobile from "../hooks/useMobile";

const SecondTileContext = createContext(null);

function useSecondTile() {
  const isMobile = useMobile();
  const context = useContext(SecondTileContext);
  if (isMobile) return {};
  if (context === undefined) {
    throw new Error(`useSecondTile must be used within a SecondTileContext`);
  }
  return context;
}

export { SecondTileContext, useSecondTile };
