/* ============================================================
   BHARATH CHANDRA KATAM — PORTFOLIO JAVASCRIPT
   ============================================================ */

/* ── HEADER SCROLL ── */
(function () {
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.style.borderBottomColor = window.scrollY > 20
      ? 'rgba(0,255,136,0.2)'
      : 'rgba(0,255,136,0.12)';
  }, { passive: true });
})();

/* ── MOBILE NAV ── */
(function () {
  const btn = document.querySelector('.hamburger');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── CI PIPELINE RUNNER ── */
(function () {
  const body   = document.getElementById('ci-body');
  const status = document.getElementById('ci-status');
  const runNum = document.getElementById('run-num');
  const dur    = document.getElementById('ci-duration');
  const passed = document.getElementById('ci-passed');
  if (!body) return;

  const TESTS = [
    { suite: 'selenium-regression',    tests: ['LoginFlow',       'CheckoutFlow',     'CartValidation',    'SessionTimeout'      ], tool: 'Selenium' },
    { suite: 'playwright-e2e',         tests: ['NavBar',          'FormSubmit',        'APIResponse',       'CrossBrowser'        ], tool: 'Playwright' },
    { suite: 'cypress-ui',             tests: ['ComponentRender', 'ButtonClick',       'ModalBehaviour',    'Responsive'          ], tool: 'Cypress' },
    { suite: 'api-validation',         tests: ['GET /users',      'POST /subscribe',   'PATCH /plan',       'DELETE /session'     ], tool: 'Postman' },
    { suite: 'sql-integrity',          tests: ['RowCount',        'NullCheck',         'FKConstraint',      'TransformAccuracy'   ], tool: 'SQL' },
    { suite: 'etl-reconciliation',     tests: ['SrcToTarget',     'StagingOutput',     'DataCompleteness',  'PipelineLoad'        ], tool: 'ODI' },
  ];

  const colors = {
    suite:  '#4B5563',
    pass:   '#00FF88',
    fail:   '#FF4444',
    info:   '#6B7A90',
    tool:   '#8B5CF6',
    time:   '#4B5563',
  };

  function colorize(text, color) {
    return `<span style="color:${color}">${text}</span>`;
  }

  let totalPassed = 0;
  let totalTests  = 0;
  let seconds     = 0;
  let timerRef    = null;

  function startTimer() {
    timerRef = setInterval(() => {
      seconds++;
      dur.textContent = `Duration: ${seconds}s`;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerRef);
  }

  function appendLine(html) {
    body.innerHTML += html + '\n';
    body.scrollTop = body.scrollHeight;
  }

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async function runSuite(suite) {
    appendLine(
      colorize(`\n  ▶ ${suite.suite}`, colors.suite) +
      colorize(` [${suite.tool}]`, colors.tool)
    );
    await sleep(180);

    for (const test of suite.tests) {
      await sleep(120 + Math.random() * 180);
      // 96% pass rate
      const pass = Math.random() > 0.04;
      totalTests++;
      if (pass) totalPassed++;
      const icon   = pass ? '✓' : '✗';
      const col    = pass ? colors.pass : colors.fail;
      const ms     = Math.floor(60 + Math.random() * 340);
      appendLine(
        `    ${colorize(icon, col)} ${colorize(test, pass ? '#CBD5E1' : colors.fail)}` +
        colorize(` (${ms}ms)`, colors.time)
      );
      passed.textContent = `✓ ${totalPassed} passed`;
    }
  }

  async function runPipeline() {
    body.innerHTML = '';
    totalPassed = 0; totalTests = 0; seconds = 0;
    runNum.textContent = String(247 + Math.floor(Math.random() * 12));
    status.textContent = '● running';
    status.style.color = '#FBC124';
    dur.textContent = 'Duration: 0s';
    passed.textContent = '✓ 0 passed';
    startTimer();

    appendLine(colorize('$ npm run test:all --reporter=spec', '#4B5563'));
    await sleep(300);
    appendLine(colorize('\n  Environment: CI · Node 20 · Headless Chrome', colors.info));
    await sleep(200);

    for (const suite of TESTS) {
      await runSuite(suite);
    }

    await sleep(250);
    stopTimer();

    const allPassed = totalPassed === totalTests;
    appendLine(
      colorize(`\n  ════════════════════════════════`, colors.info)
    );
    appendLine(
      colorize(`  ${totalPassed}/${totalTests} tests passed`, allPassed ? colors.pass : colors.fail) +
      colorize(`  ·  ${seconds}s`, colors.time)
    );

    status.textContent = allPassed ? '● passing' : '● partial';
    status.style.color = allPassed ? '#00FF88' : '#FBC124';
  }

  // Kick off on load, then loop
  window.addEventListener('load', async () => {
    await sleep(600);
    while (true) {
      await runPipeline();
      await sleep(4000);
    }
  });
})();

/* ── SCROLL REVEAL ── */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

/* ── COUNTER ANIMATION ── */
(function () {
  const counters = document.querySelectorAll('.count[data-target]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1400;
      let start    = null;
      function step(ts) {
        if (!start) start = ts;
        const p     = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
})();

/* ── SMOOTH SCROLL ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
