const API_URL = 'http://localhost:4000/api';

document.addEventListener('DOMContentLoaded', () => {
  // Register
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('registerUsername').value;
      const password = document.getElementById('registerPassword').value;

      console.log("Attempting registration with:", { username, password });

      try {
        const res = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json().catch(err => {
          console.error("Failed to parse JSON:", err);
          return { error: "Invalid JSON response" };
        });

        if (!res.ok) {
          console.error("Registration failed:", data);
          alert(`Registration failed: ${data.error || res.statusText}`);
        } else {
          console.log("Registration success:", data);
          alert(data.message);
        }
      } catch (err) {
        console.error("Error during registration:", err);
        alert("Something went wrong. Check console for details.");
      }
    });
  }

  // Login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;

      console.log("Attempting login with:", { username, password });

      try {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json().catch(err => {
          console.error("Failed to parse JSON:", err);
          return { error: "Invalid JSON response" };
        });

        if (!res.ok) {
          console.error("Login failed:", data);
          alert(`Login failed: ${data.error || res.statusText}`);
        } else {
          console.log("Login success:", data);
          localStorage.setItem('token', data.token);
          alert("Login successful!");
        }
      } catch (err) {
        console.error("Error during login:", err);
        alert("Something went wrong. Check console for details.");
      }
    });
  }
});