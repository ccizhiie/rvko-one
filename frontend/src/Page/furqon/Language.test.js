import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Routes, Route } from 'react-router-dom';
import Language from '../Language';
import Login from '../Login';

describe(Language, () => {
  it('testing if the login button redirect us to login page', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Routes>
          <Route path="/" element={<Language />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );

    const button = screen.getByRole('button', { name: /login/i });
    userEvent.click(button);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });

    const loginText = await screen.findByText(/Already have Account?/i);
    expect(loginText).toBeInTheDocument();
  })
})
