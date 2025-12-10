const API_URL = 'http://localhost:4000/api';

// Save token in localStorage
const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();

  if (data.token) {
    saveToken(data.token);
    alert('Login successful!');
    window.location.href = 'upload.html';
  } else {
    alert(data.error || 'Login failed');
  }
});

// Register
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();

  if (data.message) {
    alert('Registration successful! You can now log in.');
    window.location.href = 'index.html';
  } else {
    alert(data.error || 'Registration failed');
  }
});