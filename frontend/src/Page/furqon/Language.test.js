import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Language from '../Language';
import Login from "../Login";
import Register from "../Register";
import { click } from '@testing-library/user-event/dist/click';

describe('melakukan testing apa saja kemungkinan interaksi user di halaman language', () => {
  it('menguji apakah tombol login mengarahkan kita ke halaman login', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Language />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );
  
    const button = screen.getByRole('button', { name: /LANGUAGE.p3/i });
      userEvent.click(button);
    const textada = await screen.findByText(/LOGIN.p5/i);
    console.log(textada)
  });

  it('menguji apakah tombol register mengarahkan kita ke halaman register', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Language />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /LANGUAGE.p4/i });
      userEvent,click(button);
    const text = await screen.findByText(/REGISTER.p5/i);
    console.log(text)
  })

  it('memeriksa apakah fitur translate bahasa belanda berjalan dengan baik', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Language />} />
        </Routes>
      </MemoryRouter>
    )

    const translatebtn = screen.getByRole('combobox', { name: /Language selection/i });
      userEvent.click(translatebtn);
    const nlbtn = screen.getByRole('option', { name: /Netherlands/i})
      userEvent.click(nlbtn);
    const text = await screen.findByText(/LANGUAGE.p3/i);
    console.log(text.textContent)
  })
}) 

