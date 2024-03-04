import { Dispatch, SetStateAction, createContext, useEffect, useMemo, useState } from "react";

export type LocalStorageContextType<T> = {
    settings: T;
    setSettings: Dispatch<SetStateAction<T>>;
}

declare global {
    interface Window { _localStorageContext: unknown; }
}

export function GetLocalStorageContext<T>(): React.Context<LocalStorageContextType<T>> {
    if (!window._localStorageContext)
        window._localStorageContext = createContext<LocalStorageContextType<T> | null>(null);
    return window._localStorageContext as React.Context<LocalStorageContextType<T>>;
}

export function LocalStorageContextWrapper<T>(
    {
        children,
        defaultValue,
        localStorageKey
    }: Readonly<{
        children: React.ReactNode,
        defaultValue: T,
        localStorageKey: string
    }>) {

    //State
    const [settings, setSettings] = useState(getFromStorage(localStorageKey, defaultValue));

    //Effect
    useEffect(() => {
        setToStorage(localStorageKey, settings);
    }, [settings, localStorageKey]);

    //Context value
    const contextValue = useMemo(() => {
        return {
            settings,
            setSettings
        };
    }, [settings]);

    //Create context
    const context = useMemo(() => {
        return GetLocalStorageContext<T>();
    }, []);

    return (
        <context.Provider value={contextValue}>
            {children}
        </context.Provider>
    )
}

function getFromStorage<T>(key: string, defaultValue: T) {
    const str = localStorage.getItem(key);
    let result: T = defaultValue;
    if (str) {
        try {
            const value = JSON.parse(str) as T;
            result = value;
        }
        catch (err) {
            console.error(err);
        }
    }
    return result;
}

function setToStorage<T>(key: string, value: T) {
    const str = JSON.stringify(value);
    console.log(`Saving to storage... '${str}'`);
    localStorage.setItem(key, str);
}