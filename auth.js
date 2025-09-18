// Authentication functionality
document.addEventListener("DOMContentLoaded", () => {
  // Function to validate form
  function validateForm(form) {
    const inputs = form.querySelectorAll("input[required]")
    for (const input of inputs) {
      if (!input.value) {
        return false
      }
    }
    return true
  }

  // Function to show loading indicator
  function showLoading(button) {
    button.disabled = true
    button.textContent = "Loading..."
    return () => {
      button.disabled = false
      button.textContent = "Submit"
    }
  }

  // Function to show notification
  function showNotification(message, type) {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
      document.body.removeChild(notification)
    }, 3000)
  }

  // Login form handler
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault()

      if (!validateForm(this)) {
        showNotification("Please fill in all required fields", "error")
        return
      }

      const formData = new FormData(this)
      const email = formData.get("email")
      const password = formData.get("password")
      const remember = formData.get("remember")

      const submitBtn = this.querySelector('button[type="submit"]')
      const hideLoading = showLoading(submitBtn)

      // Simulate API call
      setTimeout(() => {
        hideLoading()

        // Mock authentication
        const userData = {
          email: email,
          name: "John Doe",
          userType: "startup",
          loginTime: new Date().toISOString(),
        }

        localStorage.setItem("user", JSON.stringify(userData))
        if (remember) {
          localStorage.setItem("rememberMe", "true")
        }

        showNotification("Login successful! Redirecting...", "success")

        setTimeout(() => {
          window.location.href = "dashboard.html"
        }, 1500)
      }, 2000)
    })
  }

  // Signup form handler
  const signupForm = document.getElementById("signupForm")
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault()

      if (!validateForm(this)) {
        showNotification("Please fill in all required fields", "error")
        return
      }

      const formData = new FormData(this)
      const password = formData.get("password")
      const confirmPassword = formData.get("confirmPassword")

      if (password !== confirmPassword) {
        showNotification("Passwords do not match", "error")
        return
      }

      if (password.length < 8) {
        showNotification("Password must be at least 8 characters long", "error")
        return
      }

      const submitBtn = this.querySelector('button[type="submit"]')
      const hideLoading = showLoading(submitBtn)

      // Simulate API call
      setTimeout(() => {
        hideLoading()

        const userData = {
          email: formData.get("email"),
          name: `${formData.get("firstName")} ${formData.get("lastName")}`,
          userType: formData.get("userType"),
          signupTime: new Date().toISOString(),
        }

        localStorage.setItem("user", JSON.stringify(userData))
        showNotification("Account created successfully! Redirecting...", "success")

        setTimeout(() => {
          window.location.href = "dashboard.html"
        }, 1500)
      }, 2000)
    })
  }

  // Check if user is already logged in
  const user = localStorage.getItem("user")
  if (user && (window.location.pathname.includes("login.html") || window.location.pathname.includes("signup.html"))) {
    window.location.href = "dashboard.html"
  }
})
