// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation toggle
  const navToggle = document.getElementById("navToggle")
  const navMenu = document.getElementById("navMenu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
    })

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      })
    })
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Form validation helper
  window.validateForm = (form) => {
    const inputs = form.querySelectorAll("input[required], select[required]")
    let isValid = true

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("error")
        isValid = false
      } else {
        input.classList.remove("error")
      }
    })

    return isValid
  }

  // Show loading state
  window.showLoading = (button) => {
    const originalText = button.textContent
    button.textContent = "Loading..."
    button.disabled = true

    return () => {
      button.textContent = originalText
      button.disabled = false
    }
  }

  // Show notification
  window.showNotification = (message, type = "success") => {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.classList.add("show")
    }, 100)

    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Add notification styles if they don't exist
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style")
    style.id = "notification-styles"
    style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                color: white;
                font-weight: 600;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-success {
                background: var(--color-success);
            }
            .notification-error {
                background: var(--color-error);
            }
            .notification-warning {
                background: var(--color-warning);
            }
            .form-input.error {
                border-color: var(--color-error);
            }
        `
    document.head.appendChild(style)
  }
})
