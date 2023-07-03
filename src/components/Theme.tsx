import { useState, useEffect } from "react";

export default function Theme() {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === "dark" ? "light" : "dark";
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return <button onClick={toggleDarkMode}>change</button>;
}
