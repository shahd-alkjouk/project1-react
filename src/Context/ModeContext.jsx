import { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext(null);

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false); // الوضع الحالي
  const [isInitialized, setIsInitialized] = useState(true); // للتحقق من التحميل الأولي

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(savedMode === "true");
      document.body.classList.toggle("dark")
    }
    setIsInitialized(false);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      document.body.classList.toggle("dark",newMode)
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, isInitialized }}>
      {children}
    </DarkModeContext.Provider>
  );
};