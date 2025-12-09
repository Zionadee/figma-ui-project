// LOGIN HANDLER (Offline mode - no API needed)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = e.target.email.value.trim();
      const password = e.target.password.value;
      const msg = document.getElementById("msg");
      const submitBtn = form.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');

      submitBtn.disabled = true;
      if (btnText) btnText.textContent = "Signing in...";
      if (btnLoader) btnLoader.classList.remove('hidden');
      msg.textContent = "";
      msg.className = "text-center text-sm mt-4";

      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check if user exists in localStorage (registered before)
      const users = JSON.parse(localStorage.getItem('eduflow_users') || '{}');
      
      // Allow demo user or registered users
      const isDemo = email === "demo@eduflow.com" && password === "demo123";
      const isRegistered = users[email] && users[email] === password;

      if (isDemo || isRegistered) {
        localStorage.setItem("token", "offline_token_" + Date.now());
        localStorage.setItem("userEmail", email);
        if (!localStorage.getItem("userName")) {
          localStorage.setItem("userName", email.split('@')[0]);
        }
        msg.className = "text-center text-sm mt-4 text-emerald-400";
        msg.textContent = "✓ Login successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 500);
      } else {
        msg.className = "text-center text-sm mt-4 text-red-400";
        msg.textContent = "Invalid credentials. Try: demo@eduflow.com / demo123";
      }

      submitBtn.disabled = false;
      if (btnText) btnText.textContent = "Sign In";
      if (btnLoader) btnLoader.classList.add('hidden');
    });
  }
});

// REGISTER HANDLER (Offline mode - no API needed)
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
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');

      msg.textContent = "";
      msg.className = "text-center text-sm mt-4";

      // Validation
      if (!name) {
        msg.className = "text-center text-sm mt-4 text-red-400";
        msg.textContent = "Please enter your name.";
        return;
      }

      if (password.length < 6) {
        msg.className = "text-center text-sm mt-4 text-red-400";
        msg.textContent = "Password must be at least 6 characters.";
        return;
      }

      if (password !== confirm) {
        msg.className = "text-center text-sm mt-4 text-red-400";
        msg.textContent = "Passwords do not match.";
        return;
      }

      submitBtn.disabled = true;
      if (btnText) btnText.textContent = "Creating account...";
      if (btnLoader) btnLoader.classList.remove('hidden');

      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 800));

      // Save user to localStorage
      const users = JSON.parse(localStorage.getItem('eduflow_users') || '{}');
      
      if (users[email]) {
        msg.className = "text-center text-sm mt-4 text-red-400";
        msg.textContent = "Email already registered. Please login instead.";
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = "Create Account";
        if (btnLoader) btnLoader.classList.add('hidden');
        return;
      }

      // Register the user
      users[email] = password;
      localStorage.setItem('eduflow_users', JSON.stringify(users));
      localStorage.setItem("token", "offline_token_" + Date.now());
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      
      msg.className = "text-center text-sm mt-4 text-emerald-400";
      msg.textContent = "✓ Account created! Redirecting...";
      
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);
    });
  }
});
