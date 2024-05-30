import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from "../Login";
import Forgot2 from '../Forgot2';
import Register from '../Register';
import { click } from '@testing-library/user-event/dist/click';
import '@testing-library/jest-dom';

describe('Menguji semua kemungkinan interaksi user dan halaman Login', () => {
    beforeEach(() => {
        render(
            <I18nextProvider i18n={i18next}>
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path="/" element={<Language />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </MemoryRouter>
            </I18nextProvider >
        )
        const btn = screen.getByRole('button', { name: /login/i});
            userEvent.click(btn)
    })

    it('Jika user melakukan click terhadap tombol sign in seharusnya pindah ke halaman register', async () => {
        <I18nextProvider i18n={i18next}>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                </Routes>
            </MemoryRouter>
        </I18nextProvider >
        const btn = screen.getByRole('link', { name: /Sign Up/i});
        expect(btn).toHaveAttribute('href','/Register');
            userEvent.click(btn);
        const text = await screen.findByText(/Register/);
        expect(text).toBeInTheDocument();
    })

    it('Jika user melakukan click terhadap forgot password seharusnya pindah ke halaman forgot password', async () => {
        <I18nextProvider i18n={i18next}>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/Forgot2" element={<Forgot2 />} />
                </Routes>
            </MemoryRouter>
        </I18nextProvider >
        const btn = screen.getByRole('link', { name: /Forgot Password?/})
        expect(btn).toHaveAttribute('href', '/Forgot2');
            userEvent.click(btn);
        const text = await screen.findByText('Forgot Password');
        expect(text).toBeInTheDocument();
    })

    it('Jika user melakukan click terhadap login tanpa inputan seharusnya ada error', async () => {
        <I18nextProvider i18n={i18next}>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
        </I18nextProvider >
        const btn = screen.getByRole('button', { name: /Login/i})
            userEvent.click(btn);
        expect(text).toBeInTheDocument('Please fill out this field');
    })
})