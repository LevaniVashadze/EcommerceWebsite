import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import ProductPage from "./ProductPage";
import ProductsPage from "./ProductsPage";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";

const App = () => {
  const [language, setLanguage] = React.useState("en");
  const [theme, setTheme] = React.useState(() => {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return 'dark';
      } else {
        return 'light';
      }
    }
  );

  useEffect(() => {
    setLanguage(window.localStorage.getItem("language"));
    if ("theme" in localStorage) setTheme(window.localStorage.getItem("theme"));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("language", language);
    document.getElementsByTagName("html")[0].setAttribute("lang", language);
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  if (!language) {
    setLanguage("en");
  }

  return (
    <div className="p-0 m-o">
      <LanguageContext.Provider value={[language, setLanguage]}>
        <ThemeContext.Provider value={[theme, setTheme]}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/products" element={<ProductsPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    </div>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);
