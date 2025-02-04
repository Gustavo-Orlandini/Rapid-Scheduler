import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";
import { ReactNode } from "react";
import { createContext } from "react";

interface ApiProviderProps {
    client: AxiosInstance;
}

export const ApiContext = createContext({} as ApiProviderProps);

export function ApiProvider({ children }: { children: ReactNode }) {
    const client = useMemo(() => {
        const client = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
        });

        return client;
    }, []);

    return (
        <ApiContext.Provider
            value={{
                client,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
}
