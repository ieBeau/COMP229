import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMockLocalStorage } from './test-helpers';

import { UserProvider } from '../context/UserContext';
import Login from '../scenes/Login';

const mockNavigate = jest.fn();

// This lets us assert that successful login redirects home.
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

describe('Login', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    mockNavigate.mockClear();

    Object.defineProperty(window, 'localStorage', {
      value: createMockLocalStorage(),
      writable: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('lets the user fill out each field', () => {
    render(
      <UserProvider>
        <Login />
      </UserProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Step 1: show the component react to typing.
    fireEvent.change(emailInput, { target: { name: 'email', value: 'student@test.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: '123456' } });

    expect(emailInput).toHaveValue('student@test.com');
    expect(passwordInput).toHaveValue('123456');
  });

  test('submits the form and login', async () => {
    // Mock fetch by inspecting the requested URL so all in-component
    // requests (validate -> register -> signin) are handled correctly.
    global.fetch.mockImplementation((url, options) => {
      if (String(url).includes('/validate')) {
        // validate token called from useEffect when provider mounts
        return Promise.resolve({ ok: false, json: async () => null });
      }

      if (String(url).includes('/api/users')) {
        // register endpoint
        return Promise.resolve({ ok: true, json: async () => ({}) });
      }

      if (String(url).includes('/auth/signin') || String(url).includes('/signin')) {
        // signin endpoint called by login
        return Promise.resolve({
          ok: true,
          json: async () => ({ token: 'new-token', user: { username: 'student', email: 'student@test.com' } })
        });
      }

      // default fallback for any other fetch
      return Promise.resolve({ ok: false, json: async () => null });
    });

    render(
      <UserProvider>
        <Login />
      </UserProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { name: 'email', value: 'student@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { name: 'password', value: '123456' } });

    // Step 2: submit and expect a happy-path flow.
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    // Wait for the register request to have been made
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/auth/signin', expect.objectContaining({ method: 'POST' }));
    });

    // Then wait for the login flow to complete and localStorage to be written
    await waitFor(() => {
      expect(window.localStorage.setItem).toHaveBeenCalledWith('username', 'student');
      expect(window.localStorage.setItem).toHaveBeenCalledWith('email', 'student@test.com');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
