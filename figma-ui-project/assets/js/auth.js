// LOGIN HANDLER
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const msg = document.getElementById("msg");
      const submitBtn = form.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.textContent = "Logging in...";
      msg.textContent = "";

      try {
        const res = await fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("token", data.token);
          localStorage.setItem("userEmail", email);
          msg.className = "text-center text-sm mt-2 text-green-600";
          msg.textContent = "✅ Login successful! Redirecting...";
          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 500);
        } else {
          msg.className = "text-center text-sm mt-2 text-red-600";
          msg.textContent = "❌ Login failed. Try: eve.holt@reqres.in / cityslicka";
        }
      } catch (error) {
        msg.className = "text-center text-sm mt-2 text-red-600";
        msg.textContent = "❌ Network error. Please check your connection.";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Login";
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
      const name = e.target.name.value.trim();
      const email = e.target.email.value.trim();
      const password = e.target.password.value;
      const confirm = e.target.confirm.value;
      const msg = document.getElementById("regMsg");
      const submitBtn = registerForm.querySelector('button[type="submit"]');

      msg.textContent = "";

      if (!name) {
        msg.className = "text-center text-sm mt-2 text-red-600";
        msg.textContent = "❌ Please enter your name.";
        return;
      }

      if (password.length < 6) {
        msg.className = "text-center text-sm mt-2 text-red-600";
        msg.textContent = "❌ Password must be at least 6 characters.";
        return;
      }

      if (password !== confirm) {
        msg.className = "text-center text-sm mt-2 text-red-600";
        msg.textContent = "❌ Passwords do not match.";
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Creating account...";

      try {
        const res = await fetch("https://reqres.in/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
          msg.className = "text-center text-sm mt-2 text-red-600";
          msg.textContent = "❌ Registration failed. Try: eve.holt@reqres.in / pistol";
          submitBtn.disabled = false;
          submitBtn.textContent = "Sign Up";
          return;
        }

        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        
        msg.className = "text-center text-sm mt-2 text-green-600";
        msg.textContent = "✅ Account created! Redirecting...";
        
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 500);
      } catch (err) {
        msg.className = "text-center text-sm mt-2 text-red-600";
        msg.textContent = "❌ Network error. Please try again.";
        submitBtn.disabled = false;
        submitBtn.textContent = "Sign Up";
      }
    });
  }
});