'use client'

import { createContext, ReactNode, useContext, useState } from "react";

export interface TabControlContextType {
    currentTab: number;
    setTab: (val: number) => void;
}

const TabControlContext = createContext<TabControlContextType | undefined>(undefined);

export const TabControlProvider = ({children} : {children: ReactNode}) => {
    const [currentTab, setCurrentTab] = useState(1);

    const setTab = (val:number) => {
        setCurrentTab(val);
    }

    return (
        <TabControlContext.Provider value={{currentTab, setTab}}>
            {children}
        </TabControlContext.Provider>
    )
}

export const useTabControl = (): TabControlContextType => {
    const context = useContext(TabControlContext);
    if (!context) throw new Error("TabcontrolContext must be inside the TabcontrolProvider");
    return context;
}