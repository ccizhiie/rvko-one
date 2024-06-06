import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Forgot3 from "../Forgot3";
import { click } from "@testing-library/user-event/dist/click";
import "@testing-library/jest-dom";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../../language/en/global.json";
import es from "../../language/es/global.json";
import nl from "../../language/nl/global.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        global: en,
      },
      es: {
        global: es,
      },
      nl: {
        global: nl,
      },
    },
  });

describe("menguji tampilan forgot password ", () => {

  it("mengecek apakah button tampil", async () => {
    render(
      <I18nextProvider i18n={i18next}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
          <Route path="/" element={<Forgot3 />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    );
   
    const button = screen.getByRole("button", { name: /password/i });
    expect(button).toBeInTheDocument();

  });

  it("memeriksa apakah 2 input ada", async () => {
    render(
      <I18nextProvider i18n={i18next}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
          <Route path="/" element={<Forgot3 />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    );

    const myElement1 = document.querySelector('[name="passforgot"]');
    expect(myElement1).toBeInTheDocument();
    const myElement2 = document.querySelector('[name="passforgot2"]');
    expect(myElement2).toBeInTheDocument();
  }, 5000);
});
