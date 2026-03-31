"use client";

import React, { createContext, useContext, useState } from "react";

interface LoadingContextType {
    isExitComplete: boolean;
    setIsExitComplete: (val: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isExitComplete, setIsExitComplete] = useState(false);

    return (
        <LoadingContext.Provider value={{ isExitComplete, setIsExitComplete }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
}
