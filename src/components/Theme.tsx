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

  const toggleDarkMode = (checked: any) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <button onClick={toggleDarkMode}>
      <img
        src="../../screenshots/sun-svgrepo-com.svg"
        className="h-10 w-10 dark:bg-gray-700 rounded-md dark:hover:bg-gray-5 00 bg-gray-200 hover:bg-gray-300 "
      ></img>
    </button>
  );
}
