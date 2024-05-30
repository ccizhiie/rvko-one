import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Language from "../Language";
import Login from "../Login";
import Forgot2 from "../Forgot2";
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
  it("menguji apakah panah mengarakan kita kembali", async () => {
    render(
      <I18nextProvider i18n={i18next}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Forgot2 />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    );
    const imageElement = container.querySelector("img.arrow");
    userEvent.click(imageElement);
    const textada = await screen.findByText(/login/i);
  });

  it("mengecek apakah button tampil", async () => {
    render(
      <I18nextProvider i18n={i18next}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Forgot2 />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    );

    const button = screen.getByRole("button", { name: /Send/i });
    expect(button).toBeInTheDocument();
  });

  it("memeriksa apakah input ada", async () => {
    render(
      <I18nextProvider i18n={i18next}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Forgot2 />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    );

    const inputElement = getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  }, 5000);
});
