// Dashboard functionality
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"))
  if (!user) {
    window.location.href = "login.html"
    return
  }

  // Update user name
  const userNameElement = document.getElementById("userName")
  if (userNameElement && user.name) {
    userNameElement.textContent = user.name
  }

  // Simple portfolio chart using canvas
  const canvas = document.getElementById("portfolioChart")
  if (canvas) {
    const ctx = canvas.getContext("2d")

    // Sample data for portfolio performance
    const data = [100, 120, 110, 140, 135, 160, 155, 180, 175, 200, 195, 220]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Set canvas size
    canvas.width = 400
    canvas.height = 200

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2

    // Find min and max values
    const minValue = Math.min(...data)
    const maxValue = Math.max(...data)
    const valueRange = maxValue - minValue

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.stroke()
    }

    // Draw the line chart
    ctx.strokeStyle = "#8b5cf6"
    ctx.lineWidth = 3
    ctx.beginPath()

    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw data points
    ctx.fillStyle = "#8b5cf6"
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    })

    // Add labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"

    // X-axis labels (months)
    for (let i = 0; i < months.length; i += 2) {
      const x = padding + (chartWidth / (data.length - 1)) * i
      ctx.fillText(months[i], x, canvas.height - 10)
    }

    // Y-axis labels (values)
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (valueRange / 5) * (5 - i)
      const y = padding + (chartHeight / 5) * i + 5
      ctx.fillText("$" + Math.round(value) + "K", padding - 10, y)
    }
  }

  // Declare showNotification function
  function showNotification(message, type) {
    console.log(`Notification: ${message} (Type: ${type})`)
    // Implement notification logic here
  }

  // Logout functionality
  window.logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("rememberMe")
    showNotification("Logged out successfully", "success")
    setTimeout(() => {
      window.location.href = "index.html"
    }, 1000)
  }

  // Add click handlers for interactive elements
  const activityItems = document.querySelectorAll(".activity-item")
  activityItems.forEach((item) => {
    item.addEventListener("click", () => {
      showNotification("Feature coming soon!", "warning")
    })
  })

  const messageItems = document.querySelectorAll(".message-item")
  messageItems.forEach((item) => {
    item.addEventListener("click", () => {
      window.location.href = "messages.html"
    })
  })

  const recommendationItems = document.querySelectorAll(".recommendation-item")
  recommendationItems.forEach((item) => {
    item.addEventListener("click", () => {
      window.location.href = "discover.html"
    })
  })
})
