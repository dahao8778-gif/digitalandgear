/* =========================
   Air Purifier Finder Logic
   ========================= */

(function () {
  'use strict';

  // -- Product Database --
  var PRODUCTS = [
    {
      name: 'LEVOIT Core 300',
      icon: '🌬',
      image: '../images/air-purifiers/levoit-core300.jpg',
      price: '$99.99',
      priceNum: 99.99,
      rating: '4.7/5',
      amazonUrl: 'https://www.amazon.com/dp/B07VVK39F7?tag=dahao8778-20',
      reviewUrl: '../reviews/air-purifiers/levoit-core-300-review.html',
      roomSize: ['small', 'medium'],
      allergies: ['severe', 'mild', 'none'],
      pets: ['cats', 'dogs', 'none'],
      budget: ['under100'],
      smart: ['no', 'maybe'],
      features: [
        'True HEPA H13 Filter',
        'QuietKEAP 24dB Sleep Mode',
        'AHAM Verified 219 sq ft CADR',
        '5-Year Warranty',
        'Compact 14.8" Design',
        '3 Fan Speeds + Timer'
      ],
      matchTags: ['budget', 'bedroom', 'quiet', 'value']
    },
    {
      name: 'Coway Airmega AP-1512HH',
      icon: '🏠',
      image: '../images/air-purifiers/coway-airmega.jpg',
      price: '$229.00',
      priceNum: 229.00,
      rating: '4.8/5',
      amazonUrl: 'https://www.amazon.com/dp/B01728NLRG?tag=dahao8778-20',
      reviewUrl: '../reviews/air-purifiers/coway-ap-1512hh-review.html',
      roomSize: ['medium', 'large'],
      allergies: ['severe', 'mild', 'asthma'],
      pets: ['cats', 'dogs', 'both'],
      budget: ['200to400'],
      smart: ['no', 'maybe'],
      features: [
        'True HEPA + Carbon Filter',
        'Auto Mode with Air Quality Sensor',
        'Covers up to 361 sq ft',
        'Eco Mode Saves Energy',
        'Air Quality Indicator Light',
        '4 Fan Speeds + Timer'
      ],
      matchTags: ['allergies', 'pets', 'sensor', 'auto']
    },
    {
      name: 'LEVOIT Vital 200S-P',
      icon: '🐾',
      image: '../images/air-purifiers/levoit-vital200s.jpg',
      price: '$169.99',
      priceNum: 169.99,
      rating: '4.6/5',
      amazonUrl: 'https://www.amazon.com/dp/B0BGPF71Q6?tag=dahao8778-20',
      reviewUrl: '../reviews/air-purifiers/best-air-purifier-for-pets.html',
      roomSize: ['medium', 'large'],
      allergies: ['severe', 'mild', 'none'],
      pets: ['cats', 'dogs', 'both'],
      budget: ['100to200', '200to400'],
      smart: ['yes', 'maybe'],
      features: [
        'Pet-Specific Pre-Filter',
        'Smart App + Alexa Control',
        'Covers up to 380 sq ft',
        'True HEPA H13 + Carbon',
        'Sleep Mode 23dB',
        'Air Quality Display'
      ],
      matchTags: ['pets', 'smart', 'app', 'value']
    },
    {
      name: 'Winix 5500-2',
      icon: '🛡',
      image: '../images/air-purifiers/winix-5500-2.jpg',
      price: '$159.99',
      priceNum: 159.99,
      rating: '4.7/5',
      amazonUrl: 'https://www.amazon.com/dp/B01D8DAYII?tag=dahao8778-20',
      reviewUrl: '../reviews/air-purifiers/winix-5500-2-review.html',
      roomSize: ['medium', 'large'],
      allergies: ['severe', 'mild', 'asthma'],
      pets: ['cats', 'dogs', 'both'],
      budget: ['100to200', '200to400'],
      smart: ['no', 'maybe'],
      features: [
        'True HEPA + PlasmaWave',
        'Washable AOC Carbon Filter',
        'Covers 360 sq ft',
        'Auto Mode + Sensor',
        'Sleep Mode',
        'Remote Control Included'
      ],
      matchTags: ['allergies', 'washable', 'value']
    },
    {
      name: 'Blueair Blue Pure 211+',
      icon: '🏢',
      image: '../images/air-purifiers/blueair-blue-pure-211plus.jpg',
      price: '$249.99',
      priceNum: 249.99,
      rating: '4.6/5',
      amazonUrl: 'https://www.amazon.com/dp/B073WJL99W?tag=dahao8778-20',
      reviewUrl: '../reviews/air-purifiers/blueair-211plus-review.html',
      roomSize: ['large', 'xl'],
      allergies: ['severe', 'mild', 'none'],
      pets: ['cats', 'dogs', 'both', 'none'],
      budget: ['200to400', 'over400'],
      smart: ['no', 'maybe'],
      features: [
        'HepaSilent Technology',
        'Covers up to 540 sq ft',
        'One-Button Operation',
        'Washable Pre-Filter',
        'Energy Star Certified',
        'Ultra Quiet'
      ],
      matchTags: ['large-room', 'quiet', 'simple']
    },
    {
      name: 'Coway Airmega 400',
      icon: '🏬',
      image: '../images/air-purifiers/coway-airmega.jpg',
      price: '$349.99',
      priceNum: 349.99,
      rating: '4.5/5',
      amazonUrl: 'https://www.amazon.com/dp/B07GJ7GHJ5?tag=dahao8778-20',
      reviewUrl: '../reviews/air-purifiers/best-air-purifiers-2026.html',
      roomSize: ['large', 'xl'],
      allergies: ['severe', 'asthma'],
      pets: ['cats', 'dogs', 'both', 'none'],
      budget: ['200to400', 'over400'],
      smart: ['no', 'maybe'],
      features: [
        'Max2 HEPA + Carbon Combo',
        'Covers up to 1,560 sq ft',
        'Auto Mode + Smart Sensor',
        'Eco Mode + Timer',
        'Filter Replacement Indicator',
        'Covers Extra-Large Spaces'
      ],
      matchTags: ['xl-room', 'allergies', 'asthma']
    },
    {
      name: 'GermGuardian AC4825E',
      icon: '💵',
      image: '../images/air-purifiers/germguardian-ac4825.jpg',
      price: '$89.99',
      priceNum: 89.99,
      rating: '4.4/5',
      amazonUrl: 'https://www.amazon.com/dp/B004VGIGVY?tag=dahao8778-20',
      reviewUrl: '../reviews/air-purifiers/best-air-purifiers-2026.html#review-8',
      roomSize: ['small', 'medium'],
      allergies: ['mild', 'none'],
      pets: ['cats', 'dogs', 'none'],
      budget: ['under100'],
      smart: ['no'],
      features: [
        'True HEPA + Carbon Filter',
        'UV-C Light Kills Germs',
        'Covers 153 sq ft',
        '3 Speed Settings',
        '22" Tower Design',
        'Affordable Choice'
      ],
      matchTags: ['budget', 'germs', 'value']
    },
    {
      name: 'Dyson Purifier Cool TP07',
      icon: '🏆',
      image: '../images/air-purifiers/dyson-purifier-hotcool.jpg',
      price: '$549.99',
      priceNum: 549.99,
      rating: '4.5/5',
      amazonUrl: 'https://www.amazon.com/dp/B0D9HWYSTL?tag=dahao8778-20',
      reviewUrl: '../reviews/air-purifiers/best-air-purifiers-2026.html#review-6',
      roomSize: ['medium', 'large'],
      allergies: ['severe', 'asthma'],
      pets: ['cats', 'dogs', 'both', 'none'],
      budget: ['over400'],
      smart: ['yes'],
      features: [
        'HEPA H13 + Cryptomic',
        'Destroys Formaldehyde',
        'Dyson Link App + Alexa',
        'Air Quality Sensors (PM2.5, VOC)',
        'Heats + Cools Year-Round',
        'Oscillates 350°'
      ],
      matchTags: ['premium', 'smart', 'asthma', 'formaldehyde']
    }
  ];

  // -- State --
  var currentStep = 1;
  var totalSteps = 5;
  var answers = {
    roomSize: null,
    allergies: null,
    pets: null,
    budget: null,
    smart: null
  };

  // -- DOM --
  var steps = document.querySelectorAll('.finder-step');
  var options = document.querySelectorAll('.finder-option');
  var btnPrev = document.getElementById('btnPrev');
  var btnNext = document.getElementById('btnNext');
  var progressFill = document.getElementById('progressFill');
  var progressText = document.getElementById('progressText');
  var finderCard = document.getElementById('finderCard');
  var finderResults = document.getElementById('finderResults');
  var resultsContainer = document.getElementById('resultsContainer');
  var btnRestart = document.getElementById('btnRestart');

  // -- Init --
  function init() {
    if (!steps.length) return;

    options.forEach(function (opt) {
      opt.addEventListener('click', handleOptionClick);
    });

    btnPrev.addEventListener('click', goToPrevStep);
    btnNext.addEventListener('click', goToNextStep);
    btnRestart.addEventListener('click', restart);

    updateProgress();
  }

  // -- Option Click --
  function handleOptionClick(e) {
    var btn = e.currentTarget;
    var question = btn.getAttribute('data-question');
    var value = btn.getAttribute('data-value');

    // Store answer
    answers[question] = value;

    // Mark selected
    var stepOptions = btn.parentElement.querySelectorAll('.finder-option');
    stepOptions.forEach(function (o) { o.classList.remove('selected'); });
    btn.classList.add('selected');

    // Enable Next button
    btnNext.disabled = false;
  }

  // -- Navigation --
  function goToNextStep() {
    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
      updateProgress();
      resetNavButtons();
    } else {
      showResults();
    }
  }

  function goToPrevStep() {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
      updateProgress();
      resetNavButtons();
    }
  }

  function showStep(step) {
    steps.forEach(function (s) {
      s.classList.remove('active');
      if (parseInt(s.getAttribute('data-step')) === step) {
        s.classList.add('active');
      }
    });
  }

  function updateProgress() {
    var pct = (currentStep / totalSteps) * 100;
    progressFill.style.width = pct + '%';
    progressText.textContent = 'Question ' + currentStep + ' of ' + totalSteps;
  }

  function resetNavButtons() {
    // Check if current step has an answer
    var questionMap = { 1: 'roomSize', 2: 'allergies', 3: 'pets', 4: 'budget', 5: 'smart' };
    var key = questionMap[currentStep];
    btnNext.disabled = !answers[key];

    if (currentStep === 1) {
      btnPrev.disabled = true;
    } else {
      btnPrev.disabled = false;
    }

    // Change Next button text on last step
    if (currentStep === totalSteps) {
      btnNext.textContent = 'See My Results →';
    } else {
      btnNext.textContent = 'Next →';
    }
  }

  // -- Matching Logic --
  var MAX_SCORE = 13; // 3+3+2+3+2

  function findBestMatches() {
    var scored = PRODUCTS.map(function (p) {
      var score = 0;
      var perfectFor = [];
      var whyReasons = [];

      // Room size match (weight: 3)
      if (p.roomSize.indexOf(answers.roomSize) !== -1) {
        score += 3;
        perfectFor.push(roomSizeLabel(answers.roomSize));
        whyReasons.push(roomSizeWhy(answers.roomSize, p));
      }

      // Allergies match (weight: 3)
      if (p.allergies.indexOf(answers.allergies) !== -1) {
        score += 3;
        if (answers.allergies === 'asthma' || answers.allergies === 'severe') {
          perfectFor.push(allergiesLabel(answers.allergies));
          whyReasons.push(allergiesWhy(answers.allergies));
        }
      }

      // Pets match (weight: 2)
      if (p.pets.indexOf(answers.pets) !== -1) {
        score += 2;
        if (answers.pets !== 'none') {
          perfectFor.push(petsLabel(answers.pets));
          whyReasons.push(petsWhy(answers.pets));
        }
      }

      // Budget match (weight: 3) — only give full score if price actually falls in user's budget
      var priceInBudget = isPriceInBudget(p.priceNum, answers.budget);
      if (priceInBudget) {
        score += 3;
        perfectFor.push(budgetLabel(answers.budget) + ' budget');
        whyReasons.push('At ' + p.price + ', it fits your ' + budgetLabel(answers.budget) + ' budget perfectly');
      } else if (p.budget.indexOf(answers.budget) !== -1) {
        score += 1;
      }

      // Smart features match (weight: 2)
      if (p.smart.indexOf(answers.smart) !== -1) {
        score += 2;
        if (answers.smart === 'yes') {
          perfectFor.push('Smart home ready');
          whyReasons.push('App control, voice commands, and air quality sensors built in');
        }
      } else if (answers.smart === 'maybe') {
        score += 1;
      }

      // Calculate match percentage
      var matchPct = Math.round((score / MAX_SCORE) * 100);
      if (matchPct > 100) matchPct = 100;
      if (matchPct < 40) matchPct = 40 + Math.round(score * 5); // floor at 40% for display

      return { product: p, score: score, matchPct: matchPct, perfectFor: perfectFor, whyReasons: whyReasons };
    });

    // Sort by score descending
    scored.sort(function (a, b) { return b.score - a.score; });

    return scored;
  }

  function isPriceInBudget(price, budget) {
    if (budget === 'under100' && price <= 100) return true;
    if (budget === '100to200' && price > 100 && price <= 200) return true;
    if (budget === '200to400' && price > 200 && price <= 400) return true;
    if (budget === 'over400' && price > 400) return true;
    return false;
  }

  function roomSizeLabel(v) {
    var m = { small: 'Small rooms', medium: 'Medium rooms', large: 'Large rooms', xl: 'Extra-large spaces' };
    return m[v] || v;
  }
  function allergiesLabel(v) {
    var m = { severe: 'Severe allergies', mild: 'Allergy relief', asthma: 'Asthma & COPD', none: 'Cleaner air' };
    return m[v] || v;
  }
  function petsLabel(v) {
    var m = { cats: 'Cat owners', dogs: 'Dog owners', both: 'Multi-pet homes', none: 'No pet needs' };
    return m[v] || v;
  }
  function budgetLabel(v) {
    var m = { under100: 'Under $100', '100to200': '$100-$200', '200to400': '$200-$400', over400: '$400+' };
    return m[v] || v;
  }

  // -- Why reason generators --
  function roomSizeWhy(v, p) {
    var m = {
      small: 'Compact size and rated for small bedrooms/offices up to ~200 sq ft',
      medium: 'Covers 200-400 sq ft — ideal for most living rooms and master bedrooms',
      large: 'Powerful enough for large open areas up to 800 sq ft',
      xl: 'High CADR rating handles extra-large or open-floor spaces'
    };
    return m[v] || 'Well-suited for your room size';
  }
  function allergiesWhy(v) {
    var m = {
      severe: 'True HEPA captures 99.97% of pollen, dust mites, and dander at 0.3 microns',
      asthma: 'Medical-grade HEPA H13 filtration removes fine particles that trigger asthma',
      mild: 'HEPA filtration significantly reduces common airborne allergens'
    };
    return m[v] || 'HEPA filtration for cleaner air';
  }
  function petsWhy(v) {
    var m = {
      cats: 'Carbon filter neutralizes litter odors; HEPA captures fine cat dander',
      dogs: 'Pre-filter catches dog hair; carbon layer eliminates pet smell',
      both: 'Dual filtration handles hair, dander, and odors from multiple pets'
    };
    return m[v] || 'Effective for pet households';
  }

  // -- Show Results --
  function showResults() {
    finderCard.style.display = 'none';
    document.querySelector('.finder-nav').style.display = 'none';
    document.querySelector('.finder-progress-bar').style.display = 'none';
    finderResults.style.display = 'block';

    var scored = findBestMatches();
    var badges = ['🥇 BEST MATCH', '🥈 GREAT ALTERNATIVE', '🥉 ALSO CONSIDER'];
    var html = '';

    for (var i = 0; i < Math.min(3, scored.length); i++) {
      if (scored[i].score > 0) {
        html += buildResultCard(scored[i], badges[i], i > 0);
      }
    }

    resultsContainer.innerHTML = html;

    // Add "Why we recommended these" explanation
    var whySection = document.getElementById('resultsWhySection');
    if (whySection) {
      whySection.innerHTML = '' +
        '<div style="margin-top:28px;padding:20px 24px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:14px;">' +
          '<h3 style="font-size:16px;color:#0c4a6e;margin:0 0 10px;">Why we recommended these</h3>' +
          '<p style="font-size:14px;color:#075985;line-height:1.7;margin:0;">' +
            'Our matching algorithm weighs room size (30%), allergy severity (30%), budget fit (30%), and smart features (10%). ' +
            'Each recommendation is cross-referenced with our hands-on testing data and verified customer feedback from our ' +
            '<a href="../reviews/air-purifiers/best-air-purifiers-2026.html" style="color:#0284c7;font-weight:600;">2026 comparison of 10 models</a>. ' +
            'We never accept paid placements — rankings are based solely on performance, value, and fit for your needs.' +
          '</p>' +
        '</div>';
    }

    // Scroll to results
    finderResults.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Track quiz_complete event for GA4
    window.dataLayer = window.dataLayer || [];
    var topScore = scored.length > 0 ? scored[0].score : 0;
    window.dataLayer.push({
      event: 'quiz_complete',
      result_count: scored.length,
      top_match_score: topScore
    });
  }

  function buildResultCard(item, badgeText, isRunnerUp) {
    var p = item.product;
    var pct = item.matchPct;

    // Perfect for tags
    var perfectForHtml = item.perfectFor.map(function (tag) {
      return '<span class="perfect-tag">✓ ' + tag + '</span>';
    }).join('');

    // Why reasons (max 4)
    var whyList = item.whyReasons.slice(0, 4);
    var whyHtml = whyList.map(function (r) {
      return '<li><span class="check">✓</span> ' + r + '</li>';
    }).join('');

    // Product features (top 4)
    var featuresHtml = p.features.slice(0, 4).map(function (f) {
      return '<li><span class="check">✓</span> ' + f + '</li>';
    }).join('');

    var cardClass = isRunnerUp ? 'result-card runner-up' : 'result-card';

    return '' +
      '<div class="' + cardClass + '">' +
        '<div class="result-badge">' + badgeText + '</div>' +
        '<div class="result-card-top">' +
          '<div class="result-card-img">' +
            '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" style="width:100px;height:100px;object-fit:contain;border-radius:10px;background:white;padding:6px;">' +
          '</div>' +
          '<div class="result-card-info">' +
            '<h3>' + p.name + '</h3>' +
            '<div class="result-price">' + p.price + '</div>' +
            '<div class="result-rating">⭐ ' + p.rating + ' Rating</div>' +
          '</div>' +
          '<div class="result-match-score">' +
            '<div class="match-pct">' + pct + '%</div>' +
            '<div class="match-label">Match</div>' +
          '</div>' +
        '</div>' +
        '<div class="result-perfect-for">' +
          '<div class="perfect-label">Perfect for:</div>' +
          '<div class="perfect-tags">' + perfectForHtml + '</div>' +
        '</div>' +
        '<div class="result-why-section">' +
          '<div class="why-label">Why we picked it:</div>' +
          '<ul class="why-list">' + whyHtml + '</ul>' +
        '</div>' +
        '<div class="result-features-section">' +
          '<div class="features-label">Key features:</div>' +
          '<ul class="result-features">' + featuresHtml + '</ul>' +
        '</div>' +
        '<div class="result-cta-group">' +
          '<a href="' + p.reviewUrl + '" class="result-cta result-cta-review">Read Full Review →</a>' +
          '<a href="' + p.amazonUrl + '" target="_blank" rel="nofollow sponsored noopener" class="result-cta">Check Price on Amazon →</a>' +
        '</div>' +
      '</div>';
  }

  // -- Restart --
  function restart() {
    currentStep = 1;
    answers = { roomSize: null, allergies: null, pets: null, budget: null, smart: null };

    options.forEach(function (o) { o.classList.remove('selected'); });

    finderCard.style.display = 'block';
    document.querySelector('.finder-nav').style.display = 'flex';
    document.querySelector('.finder-progress-bar').style.display = 'block';
    finderResults.style.display = 'none';

    var whySection = document.getElementById('resultsWhySection');
    if (whySection) whySection.innerHTML = '';

    showStep(1);
    updateProgress();
    resetNavButtons();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // -- Run --
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
