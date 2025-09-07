<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sign Up - EduFlow</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 flex items-center justify-center min-h-screen">

  <div class="bg-white p-8 rounded shadow w-96">
    <h1 class="text-2xl font-bold mb-4 text-center">Create Account</h1>

    <form id="registerForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Full Name</label>
        <input type="text" name="name" class="w-full border px-3 py-2 rounded" placeholder="Adekoya Zion" required>
      </div>

      <div>
        <label class="block text-sm font-medium">Email</label>
        <input type="email" name="email" class="w-full border px-3 py-2 rounded" placeholder="eve.holt@reqres.in" required>
      </div>

      <div>
        <label class="block text-sm font-medium">Password</label>
        <input type="password" name="password" class="w-full border px-3 py-2 rounded" placeholder="pistol" required>
      </div>

      <div>
        <label class="block text-sm font-medium">Confirm Password</label>
        <input type="password" name="confirm" class="w-full border px-3 py-2 rounded" placeholder="pistol" required>
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Sign Up</button>

      <p class="text-center text-sm mt-3">
        Already have an account? <a href="login.html" class="text-blue-600">Login</a>
      </p>
      <p id="regMsg" class="text-center text-sm mt-2 text-red-600"></p>
    </form>
  </div>

  <script src="assets/js/auth.js"></script>
</body>
</html>


// LOGIN HANDLER
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const msg = document.getElementById("msg");
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token); // save session token
        window.location.href = "dashboard.html";   // redirect after login
      } else {
        msg.textContent = "❌ Login failed. Try email: eve.holt@reqres.in / cityslicka";
      }
    });
  }
});

// REGISTER HANDLER
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = e.target.email.value.trim();
      const password = e.target.password.value;
      const confirm = e.target.confirm.value;

      const msg = document.getElementById("regMsg");

      if (password !== confirm) {
        msg.textContent = "❌ Passwords do not match.";
        return;
      }

      try {
        const res = await fetch("https://reqres.in/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
          msg.textContent = "❌ Registration failed. Use email: eve.holt@reqres.in and any password (e.g., pistol).";
          return;
        }

        const data = await res.json(); // { id, token }
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
      } catch (err) {
        msg.textContent = "❌ Network error. Please try again.";
      }
    });
  }
});
