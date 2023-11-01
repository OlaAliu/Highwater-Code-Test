import React, { createContext, useContext, useEffect, useState } from "react";

const HookContext = createContext(null);

export const Hook = ({ children }) => {

    const api = "http://127.0.0.1:8000/";

    return (
        <HookContext.Provider value={{ api }}>
            {children}
        </HookContext.Provider>
    )
}

export const useHook = () => {
    return useContext(HookContext);
}