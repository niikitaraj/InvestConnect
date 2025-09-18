// Discover page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Sample data for opportunities
  const opportunities = [
    {
      id: 1,
      type: "startup",
      name: "TechFlow AI",
      description: "Revolutionary AI platform for automated workflow optimization in enterprise environments.",
      tags: ["AI/ML", "Enterprise", "Series A"],
      seeking: "$5M",
      location: "San Francisco",
      industry: "tech",
      stage: "series-a",
    },
    {
      id: 2,
      type: "investor",
      name: "Venture Capital Partners",
      description: "Early-stage VC focused on B2B SaaS and AI startups with proven traction and strong teams.",
      tags: ["B2B SaaS", "AI/ML", "Seed-Series A"],
      investmentRange: "$1M-$10M",
      portfolio: "45 Companies",
      industry: "tech",
      stage: "seed",
    },
    {
      id: 3,
      type: "startup",
      name: "HealthTech Solutions",
      description: "Digital health platform connecting patients with healthcare providers through telemedicine.",
      tags: ["HealthTech", "Telemedicine", "Seed"],
      seeking: "$2M",
      location: "Boston",
      industry: "healthcare",
      stage: "seed",
    },
    {
      id: 4,
      type: "investor",
      name: "Growth Equity Fund",
      description: "Late-stage investor focused on scaling profitable SaaS and marketplace businesses.",
      tags: ["SaaS", "Marketplace", "Growth"],
      investmentRange: "$10M-$50M",
      portfolio: "28 Companies",
      industry: "tech",
      stage: "growth",
    },
  ]

  let filteredOpportunities = [...opportunities]

  // Filter functionality
  const categoryFilter = document.getElementById("category")
  const industryFilter = document.getElementById("industry")
  const stageFilter = document.getElementById("stage")
  const locationFilter = document.getElementById("location")
  const opportunitiesGrid = document.getElementById("opportunitiesGrid")

  function applyFilters() {
    const category = categoryFilter.value
    const industry = industryFilter.value
    const stage = stageFilter.value
    const location = locationFilter.value

    filteredOpportunities = opportunities.filter((opportunity) => {
      return (
        (!category || opportunity.type === category) &&
        (!industry || opportunity.industry === industry) &&
        (!stage || opportunity.stage === stage) &&
        (!location || (opportunity.location && opportunity.location.toLowerCase().includes(location.toLowerCase())))
      )
    })

    renderOpportunities()
  }
  // Add event listeners to filters
  ;[categoryFilter, industryFilter, stageFilter, locationFilter].forEach((filter) => {
    if (filter) {
      filter.addEventListener("change", applyFilters)
    }
  })

  // View toggle functionality
  const viewButtons = document.querySelectorAll(".view-btn")
  viewButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      viewButtons.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      const view = this.dataset.view
      opportunitiesGrid.className = view === "list" ? "opportunities-list" : "opportunities-grid"
    })
  })

  // Render opportunities
  function renderOpportunities() {
    if (!opportunitiesGrid) return

    opportunitiesGrid.innerHTML = filteredOpportunities
      .map((opportunity) => {
        if (opportunity.type === "startup") {
          return `
                    <div class="opportunity-card startup-card">
                        <div class="card-header">
                            <div class="company-logo">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <div class="company-info">
                                <h3>${opportunity.name}</h3>
                                <span class="company-type">Startup</span>
                            </div>
                            <div class="card-actions">
                                <button class="action-btn" onclick="toggleFavorite(${opportunity.id})">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-content">
                            <p class="company-description">${opportunity.description}</p>
                            <div class="company-tags">
                                ${opportunity.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                            </div>
                            <div class="company-stats">
                                <div class="stat">
                                    <span class="stat-label">Seeking</span>
                                    <span class="stat-value">${opportunity.seeking}</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-label">Location</span>
                                    <span class="stat-value">${opportunity.location}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary btn-small" onclick="viewDetails(${opportunity.id})">View Details</button>
                            <button class="btn btn-outline btn-small" onclick="contact(${opportunity.id})">Contact</button>
                        </div>
                    </div>
                `
        } else {
          return `
                    <div class="opportunity-card investor-card">
                        <div class="card-header">
                            <div class="company-logo investor-logo">
                                <i class="fas fa-building"></i>
                            </div>
                            <div class="company-info">
                                <h3>${opportunity.name}</h3>
                                <span class="company-type">Investor</span>
                            </div>
                            <div class="card-actions">
                                <button class="action-btn" onclick="toggleFavorite(${opportunity.id})">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-content">
                            <p class="company-description">${opportunity.description}</p>
                            <div class="company-tags">
                                ${opportunity.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                            </div>
                            <div class="company-stats">
                                <div class="stat">
                                    <span class="stat-label">Investment Range</span>
                                    <span class="stat-value">${opportunity.investmentRange}</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-label">Portfolio</span>
                                    <span class="stat-value">${opportunity.portfolio}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary btn-small" onclick="viewProfile(${opportunity.id})">View Profile</button>
                            <button class="btn btn-outline btn-small" onclick="connect(${opportunity.id})">Connect</button>
                        </div>
                    </div>
                `
        }
      })
      .join("")

    if (filteredOpportunities.length === 0) {
      opportunitiesGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No opportunities found</h3>
                    <p>Try adjusting your filters to see more results.</p>
                </div>
            `
    }
  }

  // Global functions for card interactions
  window.toggleFavorite = (id) => {
    showNotification("Added to favorites!", "success")
  }

  window.viewDetails = (id) => {
    window.location.href = `company-profile.html?id=${id}`
  }

  window.contact = (id) => {
    window.location.href = `messages.html?contact=${id}`
  }

  window.viewProfile = (id) => {
    window.location.href = `investor-profile.html?id=${id}`
  }

  window.connect = (id) => {
    window.location.href = `messages.html?connect=${id}`
  }

  // Declare showNotification and showLoading functions
  function showNotification(message, type) {
    console.log(`Notification: ${message} (Type: ${type})`)
  }

  function showLoading(button) {
    button.disabled = true
    button.textContent = "Loading..."
    return () => {
      button.disabled = false
      button.textContent = "Load More"
    }
  }

  // Initial render
  renderOpportunities()

  // Load more functionality
  const loadMoreBtn = document.querySelector(".load-more .btn")
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      const hideLoading = showLoading(this)

      setTimeout(() => {
        hideLoading()
        showNotification("More opportunities loaded!", "success")
      }, 1000)
    })
  }
})
