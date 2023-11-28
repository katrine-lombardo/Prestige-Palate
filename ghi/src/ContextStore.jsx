import { useState, useContext, createContext } from 'react'

const ContextStore = createContext(null);

export default function ContextProvider({ children }) {

    const store = {
        
    }

    return (
        <ContextStore.Provider value={store}>
            {children}
        </ContextStore.Provider>
    )
}

export const useStore = () => useContext(ContextStore)
