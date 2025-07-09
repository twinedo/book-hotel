import useAuthStore from "../../store/auth-store";
import { login, register } from "../../services/api/auth";
import "./styles.css";
import useUserStore from "../../store/user-store";

export function RenderAuth() {
  // const main = document.getElementById("main-content")!;
  render();
}

function render() {
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
                <input type="email" id="login-email" placeholder="Email" required class="input" />
              </div>
              <div class="form-group">
                <input type="password" id="login-password" placeholder="Password" required class="input" />
              </div>
              <button type="submit" class="auth-button">Login</button>
            </form>
            
            <!-- Register Form (hidden by default) -->
            <form id="register-form" class="auth-form">
              <div class="form-group">
                <input type="text" id="register-name" placeholder="Full Name" required class="input" />
              </div>
              <div class="form-group">
                <input type="email" id="register-email" placeholder="Email" required class="input" />
              </div>
              <div class="form-group">
                <input type="password" id="register-password" placeholder="Password" required class="input" />
              </div>
              <div class="form-group">
                <input type="password" id="register-confirm" placeholder="Confirm Password" required class="input" />
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

  // Set initial state
  updateTabs(useAuthStore.getState().currentTab);

  // Add event listeners
  loginTab.addEventListener("click", () => {
    useAuthStore.getState().setCurrentTab("login");
    updateTabs("login");
  });

  registerTab.addEventListener("click", () => {
    useAuthStore.getState().setCurrentTab("register");
    updateTabs("register");
  });

  function updateTabs(currentTab: "login" | "register") {
    if (currentTab === "login") {
      loginTab.classList.add("active");
      registerTab.classList.remove("active");
      loginForm.classList.add("active");
      registerForm.classList.remove("active");
    } else {
      registerTab.classList.add("active");
      loginTab.classList.remove("active");
      registerForm.classList.add("active");
      loginForm.classList.remove("active");
    }
  }
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

      login({ email, password })
        .then((res) => {
          if (res.status === 200) {
            useUserStore.getState().setUser(res.data.user);
            useUserStore.getState().setToken(res.data.token);
            useUserStore.getState().setIsLoggedIn(true);
            window.location.href = '/dashboard';
          }
          if (res.status === 400) {
            alert(res?.error)
          }
        })
        .catch((error) => alert(error?.error));
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

      register({ fullName: name, email, password })
        .then((res) => {
          if (res.status === 201) {
            useAuthStore.getState().setCurrentTab("login");
          }
          if (res.status === 400) {
            alert(res?.error)
          }
        })
        .catch((error) => alert(error?.error));
    });
}
