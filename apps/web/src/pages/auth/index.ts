import "./styles.css";

export function renderAuth() {
  const main = document.getElementById("main-content")!;
  main.innerHTML = `
    <div class="auth-page">
        <div class="auth-banner">
            <div class="banner-content">
                <h1>Welcome, <br />Let's Explore your journey</h1>
            </div>
        </div>
        <div class="auth-banner">
        <div class="auth-container">
        <div class="auth-tabs">
          <button class="auth-tab active" id="login-tab">Login</button>
          <button class="auth-tab" id="register-tab">Register</button>
        </div>
        
        <div class="auth-content">
          <!-- Login Form (shown by default) -->
          <form id="login-form" class="auth-form active">
            <div class="form-group">
              <input type="email" id="login-email" placeholder="Email" required />
            </div>
            <div class="form-group">
              <input type="password" id="login-password" placeholder="Password" required />
            </div>
            <button type="submit" class="auth-button">Login</button>
          </form>
          
          <!-- Register Form (hidden by default) -->
          <form id="register-form" class="auth-form">
            <div class="form-group">
              <input type="text" id="register-name" placeholder="Full Name" required />
            </div>
            <div class="form-group">
              <input type="email" id="register-email" placeholder="Email" required />
            </div>
            <div class="form-group">
              <input type="password" id="register-password" placeholder="Password" required />
            </div>
            <div class="form-group">
              <input type="password" id="register-confirm" placeholder="Confirm Password" required />
            </div>
            <button type="submit" class="auth-button">Register</button>
          </form>
        </div>
      </div>
        </div>
      
    </div>
  `;

  setupAuthTabs();
  setupAuthForms();
}

function setupAuthTabs() {
  const loginTab = document.getElementById("login-tab")!;
  const registerTab = document.getElementById("register-tab")!;
  const loginForm = document.getElementById("login-form")!;
  const registerForm = document.getElementById("register-form")!;

  loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  });

  registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
  });
}

function setupAuthForms() {
  // Login form
  document
    .getElementById("login-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = (document.getElementById("login-email") as HTMLInputElement)
        .value;
      const password = (
        document.getElementById("login-password") as HTMLInputElement
      ).value;

      // if (auth.login(email, password)) {
      //   navigate('/');
      // } else {
      //   alert('Login failed');
      // }
    });

  // Register form
  document
    .getElementById("register-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = (
        document.getElementById("register-name") as HTMLInputElement
      ).value;
      const email = (
        document.getElementById("register-email") as HTMLInputElement
      ).value;
      const password = (
        document.getElementById("register-password") as HTMLInputElement
      ).value;
      const confirm = (
        document.getElementById("register-confirm") as HTMLInputElement
      ).value;

      if (password !== confirm) {
        alert("Passwords don't match!");
        return;
      }

      // if (auth.register(name, email, password)) {
      //   navigate('/');
      // } else {
      //   alert('Registration failed');
      // }
    });
}
