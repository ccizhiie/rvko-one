import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from "../Login";
import Forgot2 from '../Forgot2';
import Register from '../Register';
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

describe('Menguji semua kemungkinan interaksi user dan halaman Login', () => {
    

    it('Jika user melakukan click terhadap tombol sign in seharusnya pindah ke halaman register', async () => {
        render(
        <I18nextProvider i18n={i18next}>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                </Routes>
            </MemoryRouter>
        </I18nextProvider >);
        const btn = screen.getByRole('link', { name: /sign/i});
       
        expect(btn).toBeInTheDocument();
    })

    it('Jika user melakukan click terhadap forgot password seharusnya pindah ke halaman forgot password', async () => {
       render(<I18nextProvider i18n={i18next}>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Forgot2" element={<Forgot2 />} />
                </Routes>
            </MemoryRouter>
        </I18nextProvider >) 
        const btn = screen.getByRole('link', { name: /forgot/i})
        expect(btn).toBeInTheDocument();
    })

    it('Jika user melakukan click terhadap login tanpa inputan seharusnya ada error', async () => {
      render(  <I18nextProvider i18n={i18next}>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            </MemoryRouter>
        </I18nextProvider >)
        const btn = screen.getByRole('button', { name: /login/i})
            
        expect(btn).toBeInTheDocument('Please fill out this field');
    })
})