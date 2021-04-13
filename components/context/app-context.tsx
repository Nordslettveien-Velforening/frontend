import React from "react";
import { MainMenuItem } from "../../integrations/sanityClient";

type AppContextType = {
    mainMenuItems: MainMenuItem[]
}

export const AppContext = React.createContext<AppContextType>({ mainMenuItems: [] });

export const AppContextProvider = ({ mainMenuItems, children }) => {
    return <AppContext.Provider value={{mainMenuItems}}>{children}</AppContext.Provider>
}
