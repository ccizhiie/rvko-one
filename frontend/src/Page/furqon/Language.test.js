import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Language from '../Language';
import Login from "../Login";
import Register from "../Register";
import { click } from '@testing-library/user-event/dist/click';
import '@testing-library/jest-dom';
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




describe('melakukan testing apa saja kemungkinan interaksi user di halaman language', () => {
  it('menguji apakah tombol login mengarahkan kita ke halaman login', async () => {
    render(
      <I18nextProvider i18n={i18next}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Language />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
      </I18nextProvider >
    );
  
    const button = screen.getByRole('button', { name: /login/i });
      userEvent.click(button);
    const textada = await screen.findByText(/login/i);
  });

  it('menguji apakah tombol register mengarahkan kita ke halaman register', async () => {
    render(
      <I18nextProvider i18n={i18next}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Language />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
      </I18nextProvider>
    );

    const button = screen.getByRole('button', { name: /register/i });
      userEvent,click(button);
    const text = await screen.findByText(/register/i);
  })

  it('memeriksa apakah fitur translate bahasa belanda berjalan dengan baik', async () => {
    render(
      <I18nextProvider i18n={i18next}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Language />} />
        </Routes>
      </MemoryRouter>
      </I18nextProvider >
    )

    const translatebtn = screen.getByRole('combobox', { name: /Language selection/i });
    userEvent.selectOptions(translatebtn, 'nl');
    expect(translatebtn.value).toBe('nl');
   const translatedText = await screen.findByText(/Inloggen/i);
  expect(translatedText).toBeInTheDocument();
  }, 5000)

  it('memeriksa apakah fitur translate bahasa spanyol berjalan dengan baik', async () => {
    render(
      <I18nextProvider i18n={i18next}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Language />} />
        </Routes>
      </MemoryRouter>
      </I18nextProvider>
    )

    const translatebtn = screen.getByRole('combobox', { name: /Language selection/i });
    userEvent.selectOptions(translatebtn, 'es');
    expect(translatebtn.value).toBe('es');
   const translatedText = await screen.findByText(/Inicio de sesión/i);
 expect(translatedText).toBeInTheDocument();
  }, 5000)
}) 

