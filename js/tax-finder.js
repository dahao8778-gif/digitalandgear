/* =========================
   TurboTax Finder - Tax Software Tool
   ========================= */

(function () {
  "use strict";

  var currentStep = 1;
  var totalSteps = 5;
  var answers = {};

  var AFFILIATE_TAG = "dahao8778-20";

  var products = {
    free: {
      name: "TurboTax Free Edition",
      icon: "\uD83D\uDCB5",
      price: "$0 Federal + State",
      rating: "4.5/5 Digital & Gear Score",
      description: "Perfect for simple tax returns with standard deduction and W-2 income. Free federal and state filing.",
      perfectFor: ["W-2 Employees", "Standard Deduction", "Simple Returns"],
      features: ["Guided Q&A format", "W-2 import via photo", "Standard deduction", "Free federal + state"],
      cta: "https://www.amazon.com/s?k=turbotax+free+edition&tag=" + AFFILIATE_TAG,
      reviewUrl: null
    },
    deluxe: {
      name: "TurboTax Deluxe 2025",
      icon: "\uD83D\uDCC4",
      price: "Check Amazon for current price",
      rating: "4.3/5 Digital & Gear Score",
      description: "Best for homeowners and people who itemize deductions. Covers mortgage interest, charitable donations, and medical expenses.",
      perfectFor: ["Homeowners", "Itemized Deductions", "Mortgage & Donations"],
      features: ["Itemized deductions (Schedule A)", "Mortgage interest", "Charitable donations", "Medical expense deductions", "Max refund search"],
      cta: "https://www.amazon.com/s?k=turbotax+deluxe+2025&tag=" + AFFILIATE_TAG,
      reviewUrl: "turbotax-deluxe-2025-review.html"
    },
    premier: {
      name: "TurboTax Premier 2025",
      icon: "\uD83D\uDCC8",
      price: "Check Amazon for current price",
      rating: "4.4/5 Digital & Gear Score",
      description: "Designed for investors. Handles stocks, bonds, crypto, and rental property income with step-by-step guidance.",
      perfectFor: ["Investors", "Crypto Traders", "Rental Property"],
      features: ["Stock & bond sales (Schedule D)", "Cryptocurrency gains/losses", "Rental property income (Schedule E)", "Deluxe features included", "Advanced tax search"],
      cta: "https://www.amazon.com/s?k=turbotax+premier+2025&tag=" + AFFILIATE_TAG,
      reviewUrl: null
    },
    selfEmployed: {
      name: "TurboTax Self-Employed 2025",
      icon: "\uD83D\uDCBC",
      price: "Check Amazon for current price",
      rating: "4.2/5 Digital & Gear Score",
      description: "Built for freelancers, contractors, and small business owners. Maximizes business deductions and handles Schedule C.",
      perfectFor: ["Freelancers", "Contractors", "Small Business"],
      features: ["Schedule C business income", "Self-employment tax", "Home office deduction", "Vehicle & mileage tracking", "Business expense finder", "Premier features included"],
      cta: "https://www.amazon.com/s?k=turbotax+self+employed+2025&tag=" + AFFILIATE_TAG,
      reviewUrl: null
    },
    cpa: {
      name: "Consider a Tax Professional (CPA)",
      icon: "\uD83E\uDD35",
      price: "Varies by complexity",
      rating: "Recommended for complex situations",
      description: "Your tax situation involves multiple income sources, business ownership, and investments. A CPA can maximize savings and ensure compliance.",
      perfectFor: ["Complex Returns", "Multiple Businesses", "High Net Worth"],
      features: ["Personalized strategy", "Audit representation", "Multi-state filing", "Business structure optimization", "Year-round support"],
      cta: "https://www.amazon.com/s?k=tax+professional+services&tag=" + AFFILIATE_TAG,
      reviewUrl: null
    }
  };

  function calculateRecommendation(answers) {
    var score = {
      free: 0,
      deluxe: 0,
      premier: 0,
      selfEmployed: 0,
      cpa: 0
    };

    // Income source
    switch (answers.income) {
      case "w2": score.free += 3; score.deluxe += 1; break;
      case "1099": score.selfEmployed += 3; score.premier += 1; break;
      case "business": score.selfEmployed += 3; score.cpa += 2; break;
      case "investment": score.premier += 3; score.deluxe += 1; break;
      case "mix": score.premier += 2; score.cpa += 2; score.selfEmployed += 1; break;
    }

    // Deductions
    switch (answers.deductions) {
      case "standard": score.free += 3; break;
      case "mortgage": score.deluxe += 3; break;
      case "charitable": score.deluxe += 2; score.free += 1; break;
      case "medical": score.deluxe += 2; break;
      case "multiple": score.deluxe += 3; score.cpa += 1; break;
    }

    // Investments
    switch (answers.investments) {
      case "none": score.free += 1; score.deluxe += 1; break;
      case "stocks": score.premier += 3; break;
      case "crypto": score.premier += 3; break;
      case "rental": score.premier += 3; score.cpa += 1; break;
      case "multi-invest": score.premier += 2; score.cpa += 2; break;
    }

    // Life events
    switch (answers.lifeEvents) {
      case "none": score.free += 1; break;
      case "married": score.deluxe += 1; score.free += 1; break;
      case "baby": score.deluxe += 2; break;
      case "home": score.deluxe += 3; break;
      case "business": score.selfEmployed += 3; score.cpa += 1; break;
    }

    // Comfort level
    switch (answers.comfort) {
      case "diy": score.free += 2; score.deluxe += 1; break;
      case "guidance": score.deluxe += 2; score.premier += 1; break;
      case "stepbystep": score.deluxe += 1; score.premier += 1; score.selfEmployed += 1; break;
      case "professional": score.cpa += 3; break;
    }

    // Find top recommendation and runner-up
    var ranked = Object.keys(score).sort(function (a, b) {
      return score[b] - score[a];
    });

    var topKey = ranked[0];
    var runnerUpKey = ranked[1];

    // If CPA is top but selfEmployed is close, still recommend CPA for complex
    if (topKey === "cpa" && score.selfEmployed >= score.cpa - 1) {
      // Keep CPA as top
    }

    return {
      top: topKey,
      runnerUp: runnerUpKey,
      topProduct: products[topKey],
      runnerUpProduct: products[runnerUpKey],
      matchScore: Math.min(98, Math.round(70 + score[topKey] * 4)),
      reasons: getReasons(answers, topKey)
    };
  }

  function getReasons(answers, topKey) {
    var reasons = [];

    switch (topKey) {
      case "free":
        if (answers.income === "w2") reasons.push("Your W-2 income qualifies for free filing");
        if (answers.deductions === "standard") reasons.push("Standard deduction keeps your return simple");
        reasons.push("No complex investments or business income detected");
        break;
      case "deluxe":
        if (answers.deductions === "mortgage" || answers.deductions === "multiple") reasons.push("You have itemizable deductions that Deluxe maximizes");
        if (answers.lifeEvents === "home") reasons.push("New home purchase triggers mortgage interest deductions");
        if (answers.deductions === "charitable") reasons.push("Charitable donations are covered in Deluxe");
        if (answers.deductions === "medical") reasons.push("Medical expense deductions require Schedule A (Deluxe)");
        break;
      case "premier":
        if (answers.investments === "stocks") reasons.push("Stock and bond sales need Schedule D support");
        if (answers.investments === "crypto") reasons.push("Cryptocurrency transactions are handled in Premier");
        if (answers.investments === "rental") reasons.push("Rental property income requires Schedule E (Premier)");
        if (answers.income === "investment") reasons.push("Your primary income is investment-based");
        break;
      case "selfEmployed":
        if (answers.income === "1099") reasons.push("1099 contractor income needs Schedule C");
        if (answers.income === "business") reasons.push("Small business income requires self-employment tax handling");
        if (answers.lifeEvents === "business") reasons.push("Starting a business this year needs full Schedule C support");
        reasons.push("Home office and vehicle deductions maximize your savings");
        break;
      case "cpa":
        if (answers.income === "mix") reasons.push("Multiple income sources create filing complexity");
        if (answers.investments === "multi-invest") reasons.push("Diverse investments across multiple categories");
        if (answers.comfort === "professional") reasons.push("You prefer professional guidance for peace of mind");
        reasons.push("A CPA can optimize your tax strategy year-round");
        break;
    }

    if (reasons.length === 0) {
      reasons.push("Based on your overall tax profile, this is the best match for your situation");
    }

    return reasons;
  }

  function renderResults(result) {
    var container = document.getElementById("resultsContainer");
    var whyContainer = document.getElementById("resultsWhySection");

    var top = result.topProduct;
    var runner = result.runnerUpProduct;

    var html = '';

    // Top match card
    html += '<div class="result-card" style="border-color:#fed7aa;">';
    html += '<div class="result-badge">BEST MATCH</div>';
    html += '<div class="result-card-top">';
    html += '<div class="result-card-icon">' + top.icon + '</div>';
    html += '<div class="result-card-info">';
    html += '<h3>' + top.name + '</h3>';
    html += '<p class="result-price">' + top.price + '</p>';
    html += '<p class="result-rating">' + top.rating + '</p>';
    html += '</div>';
    html += '<div class="result-match-score" style="background:linear-gradient(135deg,#059669,#10b981);">';
    html += '<div class="match-pct">' + result.matchScore + '%</div>';
    html += '<div class="match-label">Match</div>';
    html += '</div>';
    html += '</div>';
    html += '<p style="font-size:15px;color:#374151;margin:0 0 18px;line-height:1.6;">' + top.description + '</p>';

    // Perfect for
    html += '<div class="result-perfect-for">';
    html += '<span class="perfect-label">Perfect for:</span>';
    html += '<div class="perfect-tags">';
    top.perfectFor.forEach(function (tag) {
      html += '<span class="perfect-tag">' + tag + '</span>';
    });
    html += '</div></div>';

    // Features
    html += '<div class="result-features-section">';
    html += '<div class="features-label">What\'s included:</div>';
    html += '<ul class="result-features">';
    top.features.forEach(function (f) {
      html += '<li><span class="check">\u2713</span> ' + f + '</li>';
    });
    html += '</ul></div>';

    // CTA
    html += '<div class="result-cta-group">';
    html += '<a href="' + top.cta + '" target="_blank" rel="nofollow sponsored noopener" class="result-cta">Check Price on Amazon \u2192</a>';
    if (top.reviewUrl) {
      html += '<a href="' + top.reviewUrl + '" class="result-cta result-cta-review">Read Our Review \u2192</a>';
    }
    html += '</div>';
    html += '</div>';

    // Runner-up card
    html += '<div class="result-card runner-up">';
    html += '<div class="result-badge">ALSO CONSIDER</div>';
    html += '<div class="result-card-top">';
    html += '<div class="result-card-icon">' + runner.icon + '</div>';
    html += '<div class="result-card-info">';
    html += '<h3>' + runner.name + '</h3>';
    html += '<p class="result-price">' + runner.price + '</p>';
    html += '<p class="result-rating">' + runner.rating + '</p>';
    html += '</div>';
    html += '</div>';
    html += '<p style="font-size:14px;color:#6b7280;margin:0 0 16px;line-height:1.6;">' + runner.description + '</p>';
    html += '<div class="result-cta-group">';
    html += '<a href="' + runner.cta + '" target="_blank" rel="nofollow sponsored noopener" class="result-cta result-cta-review">Check Price on Amazon \u2192</a>';
    if (runner.reviewUrl) {
      html += '<a href="' + runner.reviewUrl + '" class="result-cta result-cta-review">Read Our Review \u2192</a>';
    }
    html += '</div>';
    html += '</div>';

    container.innerHTML = html;

    // Why section
    var whyHtml = '<div class="result-why-section">';
    whyHtml += '<div class="why-label">\u2705 Why this is your best match</div>';
    whyHtml += '<ul class="why-list">';
    result.reasons.forEach(function (r) {
      whyHtml += '<li><span class="check">\u2713</span> ' + r + '</li>';
    });
    whyHtml += '</ul></div>';
    whyContainer.innerHTML = whyHtml;
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", function () {
    var steps = document.querySelectorAll(".finder-step");
    var options = document.querySelectorAll(".finder-option");
    var btnPrev = document.getElementById("btnPrev");
    var btnNext = document.getElementById("btnNext");
    var btnRestart = document.getElementById("btnRestart");
    var progressFill = document.getElementById("progressFill");
    var progressText = document.getElementById("progressText");
    var finderCard = document.getElementById("finderCard");
    var finderResults = document.getElementById("finderResults");
    var finderNav = document.querySelector(".finder-nav");

    var selectedStep = {};

    function updateProgress() {
      var pct = (currentStep / totalSteps) * 100;
      progressFill.style.width = pct + "%";
      progressText.textContent = "Question " + currentStep + " of " + totalSteps;
    }

    function showStep(step) {
      steps.forEach(function (s) {
        s.classList.remove("active");
      });
      var target = document.querySelector('.finder-step[data-step="' + step + '"]');
      if (target) target.classList.add("active");
      updateProgress();

      // Enable/disable buttons
      btnPrev.disabled = (step === 1);
      btnNext.disabled = !selectedStep[step];

      // Update next button text
      if (step === totalSteps && selectedStep[step]) {
        btnNext.textContent = "See My Results \u2192";
      } else {
        btnNext.textContent = "Next \u2192";
      }
    }

    // Option click
    options.forEach(function (opt) {
      opt.addEventListener("click", function () {
        var step = parseInt(opt.closest(".finder-step").dataset.step);
        var question = opt.dataset.question;
        var value = opt.dataset.value;

        // Remove selected from siblings
        var stepOptions = opt.closest(".finder-step").querySelectorAll(".finder-option");
        stepOptions.forEach(function (o) {
          o.classList.remove("selected");
        });

        opt.classList.add("selected");
        selectedStep[step] = true;
        answers[question] = value;

        btnNext.disabled = false;

        // Auto-advance after a brief delay
        setTimeout(function () {
          if (step < totalSteps) {
            currentStep = step + 1;
            showStep(currentStep);
          } else {
            // Show results
            var result = calculateRecommendation(answers);
            finderCard.style.display = "none";
            finderNav.style.display = "none";
            finderResults.style.display = "block";
            renderResults(result);
          }
        }, 350);
      });
    });

    // Previous button
    btnPrev.addEventListener("click", function () {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });

    // Next button
    btnNext.addEventListener("click", function () {
      if (!selectedStep[currentStep]) return;

      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      } else {
        // Show results
        var result = calculateRecommendation(answers);
        finderCard.style.display = "none";
        finderNav.style.display = "none";
        finderResults.style.display = "block";
        renderResults(result);
      }
    });

    // Restart
    if (btnRestart) {
      btnRestart.addEventListener("click", function () {
        currentStep = 1;
        answers = {};
        selectedStep = {};
        document.querySelectorAll(".finder-option").forEach(function (o) {
          o.classList.remove("selected");
        });
        finderCard.style.display = "block";
        finderNav.style.display = "flex";
        finderResults.style.display = "none";
        showStep(1);
      });
    }

    showStep(1);
  });
})();
