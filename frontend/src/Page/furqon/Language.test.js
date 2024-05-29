import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Language from '../Language';
import Login from "../Login";

test('menguji apakah tombol login mengarahkan kita ke halaman login', async () => {
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
