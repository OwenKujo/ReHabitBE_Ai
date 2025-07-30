import React, { useState, createContext, useContext } from 'react';

export const LangContext = createContext();

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  
  const changeLang = (l) => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  return (
    <LangContext.Provider value={{ lang, changeLang }}>
      {children}
    </LangContext.Provider>
  );
} 