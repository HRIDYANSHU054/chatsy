import { createContext, useContext, useReducer, useState } from "react";

const ThemeContext = createContext({
  theme: undefined,
  changeTheme: (theme) => {},
});

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("chat-theme") || "dracula",
  );

  function changeTheme(theme) {
    localStorage.setItem("chat-theme", theme);
    setTheme(theme);
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useThemeContext() {
  const value = useContext(ThemeContext);
  if (!value.theme)
    throw new Error("useThemeContext hook used outside of FakeAuthProvider");
  return value;
}

export { ThemeProvider, useThemeContext };
