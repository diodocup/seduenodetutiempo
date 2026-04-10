:root {
  --bg: #f5efe4;
  --bg-soft: #fbf7ef;
  --surface: rgba(255, 251, 245, 0.92);
  --surface-strong: rgba(255, 255, 255, 0.94);
  --surface-alt: rgba(248, 242, 232, 0.96);
  --line: rgba(31, 37, 34, 0.12);
  --line-strong: rgba(31, 37, 34, 0.2);
  --text: #1f2522;
  --muted: #55615c;
  --accent: #21493a;
  --accent-2: #b58b4b;
  --inverse: #fffaf1;
  --shadow: 0 30px 70px rgba(18, 25, 22, 0.08);
  --shadow-strong: 0 26px 80px rgba(18, 25, 22, 0.16);
  --radius-xl: 34px;
  --radius-lg: 24px;
  --radius-md: 18px;
  --max-width: 1180px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  color: var(--text);
  font-family: "Manrope", system-ui, sans-serif;
  background:
    radial-gradient(circle at top left, rgba(181, 139, 75, 0.14), transparent 24%),
    radial-gradient(circle at 80% 10%, rgba(33, 73, 58, 0.1), transparent 28%),
    linear-gradient(180deg, var(--bg-soft), var(--bg));
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
}

.container {
  width: min(calc(100% - 32px), var(--max-width));
  margin: 0 auto;
}

.variant-header {
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 16px 0;
  backdrop-filter: blur(16px);
  background: rgba(251, 247, 239, 0.78);
  border-bottom: 1px solid transparent;
  transition: padding 0.25s ease, background-color 0.25s ease, border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.variant-header.is-scrolled {
  padding: 10px 0;
  background: rgba(251, 247, 239, 0.94);
  border-color: rgba(31, 37, 34, 0.08);
  box-shadow: 0 10px 30px rgba(18, 25, 22, 0.07);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0;
  text-decoration: none;
}

.header-book {
  width: 0;
  opacity: 0;
  overflow: hidden;
  margin-right: 0;
  border-radius: 10px;
  transform: translateY(6px) scale(0.9);
  transform-origin: left center;
  box-shadow: 0 12px 24px rgba(18, 25, 22, 0.1);
  transition: width 0.25s ease, opacity 0.25s ease, margin-right 0.25s ease,
    transform 0.25s ease;
}

.header-book img {
  width: 40px;
  height: auto;
  border-radius: 10px;
}

.variant-header.is-scrolled .header-book {
  width: 40px;
  opacity: 1;
  margin-right: 12px;
  transform: translateY(0) scale(1);
}

.brand-text {
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
}

.eyebrow,
.section-label,
.brand-kicker {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  font-weight: 800;
  color: var(--accent);
}

.brand-title,
.hero-title,
.section-heading h2,
.resource-card h3,
.audience-card h2,
.closing-card h2,
.chapter-group h3 {
  font-family: "Fraunces", Georgia, serif;
  letter-spacing: -0.04em;
}

.brand-title {
  font-size: 22px;
  font-weight: 600;
}

.brand-author {
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
}

.site-nav {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  color: var(--muted);
  font-size: 14px;
}

.site-nav a {
  text-decoration: none;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 24px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 800;
  border: 1px solid transparent;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.button:hover,
.button:focus-visible {
  transform: translateY(-1px);
}

.button-primary {
  background: var(--accent);
  color: var(--inverse);
  box-shadow: 0 16px 36px rgba(33, 73, 58, 0.18);
}

.button-secondary {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(31, 37, 34, 0.12);
  color: var(--text);
}

.button-header {
  flex-shrink: 0;
}

.hero {
  padding: 42px 0 20px;
}

.hero-grid {
  display: grid;
  gap: 32px;
  align-items: center;
}

.hero-copy,
.info-card,
.resource-card,
.chapter-group,
.audience-card,
.closing-card,
.faq-item {
  border-radius: var(--radius-lg);
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: var(--shadow);
}

.hero-copy {
  padding: clamp(28px, 4vw, 52px);
}

.hero-title {
  margin: 14px 0 12px;
  font-size: clamp(42px, 8vw, 86px);
  line-height: 0.94;
}

.hero-subtitle {
  margin: 0 0 20px;
  max-width: 700px;
  font-size: clamp(20px, 2.4vw, 30px);
  line-height: 1.22;
  color: var(--muted);
  font-weight: 600;
}

.hero-body,
.section-heading p,
.resource-card p,
.chapter-group-header p,
.chapter-item p,
.faq-item p,
.closing-card p,
.audience-card p {
  color: var(--muted);
  font-size: 17px;
  line-height: 1.72;
}

.hero-body {
  display: grid;
  gap: 16px;
  max-width: 740px;
}

.hero-actions,
.closing-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.hero-points,
.check-list {
  list-style: none;
  margin: 28px 0 0;
  padding: 0;
  display: grid;
  gap: 12px;
}

.hero-points li,
.check-list li {
  position: relative;
  padding-left: 26px;
  color: var(--muted);
  line-height: 1.55;
}

.hero-points li::before,
.check-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--accent-2);
  box-shadow: 0 0 0 5px rgba(181, 139, 75, 0.14);
}

.hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-stage {
  position: relative;
}

.book-frame img {
  width: 100%;
  height: auto;
}

.section {
  padding: 42px 0;
  scroll-margin-top: 92px;
}

.section-heading {
  max-width: 780px;
  margin-bottom: 28px;
}

.section-heading h2,
.audience-card h2,
.closing-card h2 {
  margin: 0 0 20px;
  font-size: clamp(34px, 5vw, 60px);
  line-height: 0.98;
}

.problem-grid,
.pillar-grid,
.resource-grid,
.audience-grid {
  display: grid;
  gap: 18px;
}

.problem-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.pillar-grid,
.resource-grid,
.audience-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.info-card,
.resource-card,
.chapter-group,
.audience-card,
.closing-card {
  padding: 28px;
}

.info-card h3,
.resource-card h3,
.chapter-group h3 {
  margin: 0 0 12px;
  font-size: 28px;
  line-height: 1.05;
}

.chapter-groups,
.faq-list {
  display: grid;
  gap: 18px;
}

.chapter-group-header {
  margin-bottom: 16px;
}

.chapter-list {
  display: grid;
  gap: 12px;
}

.chapter-item,
.faq-item {
  border-radius: var(--radius-md);
  border: 1px solid rgba(31, 37, 34, 0.1);
  background: rgba(255, 255, 255, 0.44);
}

.chapter-item summary,
.faq-item summary {
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  font-weight: 800;
}

.chapter-item summary::-webkit-details-marker,
.faq-item summary::-webkit-details-marker {
  display: none;
}

.chapter-item summary::after,
.faq-item summary::after {
  content: "+";
  margin-left: auto;
  font-size: 22px;
  color: var(--accent);
}

.chapter-item[open] summary::after,
.faq-item[open] summary::after {
  content: "−";
}

.chapter-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  background: rgba(33, 73, 58, 0.08);
  color: var(--accent);
}

.chapter-item p,
.faq-item p {
  margin: 0;
  padding: 0 20px 20px;
}

.closing-card h2 span {
  display: block;
  color: var(--accent);
}

.closing-card em {
  font-style: italic;
}

.variant-footer {
  padding: 24px 0 90px;
  color: var(--muted);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 14px;
}

.variant-switch {
  color: var(--accent);
  text-decoration: none;
  font-weight: 700;
}

.mobile-cta {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  gap: 10px;
  padding:
    10px
    max(12px, env(safe-area-inset-right, 0px))
    calc(10px + env(safe-area-inset-bottom, 0px))
    max(12px, env(safe-area-inset-left, 0px));
  z-index: 30;
  border-radius: 22px 22px 0 0;
  background: rgba(251, 247, 239, 0.9);
  border: 1px solid rgba(31, 37, 34, 0.08);
  border-bottom: 0;
  box-shadow: 0 20px 40px rgba(18, 25, 22, 0.12);
  backdrop-filter: blur(14px);
}

.mobile-cta .button {
  flex: 1;
  min-height: 48px;
}

.variant-editorial {
  --bg: #f3ecdf;
  --bg-soft: #fbf7f0;
  --surface: rgba(255, 252, 247, 0.9);
  --surface-strong: rgba(255, 255, 255, 0.96);
  --accent: #244739;
  --accent-2: #b48e54;
}

.variant-editorial .hero-grid {
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 360px);
}

.variant-editorial .hero-copy {
  background: transparent;
  border: 0;
  box-shadow: none;
  padding-left: 0;
}

.variant-editorial .hero-visual::before {
  content: "";
  position: absolute;
  inset: 8% 2% 12%;
  border-radius: 40px;
  background:
    radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0.18) 60%, transparent 82%);
}

.variant-editorial .book-frame {
  width: min(100%, 320px);
  margin: 0 auto;
}

.variant-editorial .book-frame img {
  border-radius: 14px;
  box-shadow: 0 20px 45px rgba(18, 25, 22, 0.12);
}

.variant-premium {
  --bg: #0f1717;
  --bg-soft: #131f1d;
  --surface: rgba(18, 28, 26, 0.84);
  --surface-strong: rgba(21, 33, 30, 0.94);
  --surface-alt: rgba(14, 24, 22, 0.96);
  --line: rgba(255, 255, 255, 0.08);
  --line-strong: rgba(255, 255, 255, 0.16);
  --text: #f5efe4;
  --muted: #c8beb0;
  --accent: #d6b06d;
  --accent-2: #f0d196;
  --inverse: #14201d;
  --shadow: 0 28px 80px rgba(0, 0, 0, 0.24);
  --shadow-strong: 0 30px 80px rgba(0, 0, 0, 0.36);
  background:
    radial-gradient(circle at 50% 0%, rgba(214, 176, 109, 0.12), transparent 30%),
    linear-gradient(180deg, #111819, #0d1313 45%, #101715);
}

.variant-premium .variant-header {
  background: rgba(15, 23, 23, 0.74);
}

.variant-premium .variant-header.is-scrolled {
  background: rgba(15, 23, 23, 0.94);
  border-color: rgba(255, 255, 255, 0.08);
}

.variant-premium .button-primary {
  color: #17211f;
  background: linear-gradient(180deg, #e5c98e, #c89f58);
  box-shadow: 0 16px 36px rgba(200, 159, 88, 0.22);
}

.variant-premium .button-secondary {
  color: var(--text);
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.12);
}

.variant-premium .hero-grid {
  grid-template-columns: 1fr;
  text-align: center;
}

.variant-premium .hero-copy {
  background:
    radial-gradient(circle at top center, rgba(214, 176, 109, 0.08), transparent 34%),
    linear-gradient(180deg, rgba(22, 34, 31, 0.92), rgba(15, 24, 22, 0.92));
  max-width: 920px;
  margin: 0 auto;
}

.variant-premium .hero-title {
  max-width: none;
  font-size: clamp(54px, 9vw, 92px);
}

.variant-premium .hero-subtitle,
.variant-premium .hero-body,
.variant-premium .section-heading p,
.variant-premium .resource-card p,
.variant-premium .chapter-group-header p,
.variant-premium .chapter-item p,
.variant-premium .faq-item p,
.variant-premium .closing-card p,
.variant-premium .audience-card p,
.variant-premium .brand-author,
.variant-premium .site-nav,
.variant-premium .variant-footer {
  color: var(--muted);
}

.variant-premium .hero-actions,
.variant-premium .closing-actions {
  justify-content: center;
}

.variant-premium .hero-points {
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

.variant-premium .hero-visual {
  min-height: 560px;
}

.variant-premium .hero-visual::before {
  content: "";
  position: absolute;
  inset: 8% 18%;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(214, 176, 109, 0.18), transparent 62%);
  filter: blur(4px);
}

.variant-premium .book-frame {
  width: min(100%, 360px);
}

.variant-premium .book-frame img {
  border-radius: 18px;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.28),
    0 0 0 1px rgba(255, 255, 255, 0.06);
}

.variant-premium .info-card,
.variant-premium .resource-card,
.variant-premium .chapter-group,
.variant-premium .audience-card,
.variant-premium .closing-card,
.variant-premium .faq-item {
  background:
    linear-gradient(180deg, rgba(20, 31, 29, 0.96), rgba(14, 24, 22, 0.94));
}

.variant-premium .chapter-item,
.variant-premium .faq-item {
  background: rgba(255, 255, 255, 0.02);
  border-color: rgba(255, 255, 255, 0.08);
}

.variant-premium .chapter-number {
  background: rgba(214, 176, 109, 0.12);
  color: var(--accent);
}

.variant-premium .closing-card h2 span {
  color: var(--accent);
}

.variant-manifesto {
  --bg: #efe7d7;
  --bg-soft: #f8f2e9;
  --surface: rgba(255, 251, 245, 0.9);
  --surface-strong: rgba(255, 255, 255, 0.96);
  --accent: #183f33;
  --accent-2: #cf8847;
  background:
    linear-gradient(180deg, #f8f2e9 0%, #f0e6d5 100%);
}

.variant-manifesto .hero {
  padding-top: 28px;
}

.variant-manifesto .hero-grid {
  grid-template-columns: minmax(0, 1.15fr) minmax(260px, 330px);
  gap: 18px;
  align-items: start;
}

.variant-manifesto .hero-copy {
  position: relative;
  border-width: 2px;
  border-color: rgba(24, 63, 51, 0.16);
  background:
    linear-gradient(180deg, rgba(255, 250, 242, 0.94), rgba(248, 241, 229, 0.9));
}

.variant-manifesto .hero-copy::before {
  content: "";
  position: absolute;
  top: 24px;
  left: -12px;
  width: 22px;
  height: calc(100% - 48px);
  border-radius: 14px;
  background: linear-gradient(180deg, #183f33, #cf8847);
}

.variant-manifesto .hero-title {
  font-size: clamp(48px, 10vw, 98px);
  line-height: 0.88;
  max-width: none;
}

.variant-manifesto .hero-subtitle {
  max-width: 620px;
  font-size: clamp(21px, 2.7vw, 32px);
}

.variant-manifesto .hero-visual {
  position: sticky;
  top: 102px;
  padding-top: 18px;
}

.variant-manifesto .book-frame {
  width: min(100%, 300px);
  transform: rotate(3deg);
}

.variant-manifesto .book-frame img {
  border-radius: 10px;
  box-shadow: 0 24px 50px rgba(24, 63, 51, 0.18);
}

.variant-manifesto .info-card,
.variant-manifesto .resource-card,
.variant-manifesto .chapter-group,
.variant-manifesto .audience-card,
.variant-manifesto .closing-card {
  border-width: 2px;
}

.variant-manifesto .resource-card-featured {
  background:
    linear-gradient(135deg, rgba(255, 248, 238, 0.98), rgba(248, 235, 215, 0.96));
}

.variant-manifesto .button-primary {
  background: linear-gradient(180deg, #183f33, #102c24);
}

.variant-manifesto .button-secondary {
  background: rgba(255, 255, 255, 0.58);
}

.compare-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(181, 139, 75, 0.14), transparent 26%),
    linear-gradient(180deg, #fbf6ef, #f1e7d9);
}

.compare-shell {
  width: min(calc(100% - 32px), 1120px);
  margin: 0 auto;
  padding: 56px 0 80px;
}

.compare-header {
  max-width: 760px;
  margin-bottom: 28px;
}

.compare-header h1 {
  margin: 12px 0 18px;
  font-family: "Fraunces", Georgia, serif;
  font-size: clamp(42px, 8vw, 82px);
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.compare-header p {
  color: var(--muted);
  font-size: 18px;
  line-height: 1.72;
}

.compare-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.compare-card {
  padding: 28px;
  border-radius: 26px;
  border: 1px solid rgba(31, 37, 34, 0.12);
  background: rgba(255, 251, 245, 0.92);
  box-shadow: var(--shadow);
}

.compare-card h2 {
  margin: 14px 0 12px;
  font-family: "Fraunces", Georgia, serif;
  font-size: 34px;
  line-height: 1;
}

.compare-card p {
  margin: 0 0 18px;
  color: var(--muted);
  line-height: 1.68;
}

.compare-card .button {
  min-height: 48px;
}

.compare-chip {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(33, 73, 58, 0.08);
  color: var(--accent);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

@media (max-width: 980px) {
  .hero-grid,
  .problem-grid,
  .pillar-grid,
  .resource-grid,
  .audience-grid,
  .compare-grid {
    grid-template-columns: 1fr;
  }

  .variant-manifesto .hero-visual {
    position: static;
  }

  .variant-editorial .hero-grid,
  .variant-manifesto .hero-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 860px) {
  .site-nav,
  .button-header {
    display: none;
  }

  main {
    padding-bottom: 112px;
  }

  .mobile-cta {
    display: flex;
  }

  .variant-footer {
    padding-bottom: 104px;
  }
}

@media (max-width: 720px) {
  .container,
  .compare-shell {
    width: min(calc(100% - 28px), var(--max-width));
  }

  .variant-header {
    padding: 24px 0 26px;
  }

  .variant-header.is-scrolled {
    padding: 18px 0 20px;
  }

  .brand-text {
    gap: 4px;
  }

  .brand-author {
    margin-bottom: 8px;
  }

  .hero-copy,
  .info-card,
  .resource-card,
  .chapter-group,
  .audience-card,
  .closing-card,
  .compare-card {
    padding: 26px 24px;
  }

  .hero-actions,
  .closing-actions {
    flex-direction: column;
    gap: 12px;
  }

  .button {
    width: 100%;
  }

  .hero {
    padding: 28px 0 28px;
  }

  .hero-grid {
    gap: 28px;
  }

  .hero-title {
    font-size: clamp(40px, 16vw, 64px);
    margin: 12px 0 18px;
  }

  .hero-subtitle {
    margin-bottom: 26px;
    line-height: 1.28;
  }

  .hero-body {
    gap: 20px;
  }

  .hero-points,
  .check-list {
    margin-top: 32px;
    gap: 14px;
  }

  .section {
    padding: 52px 0;
    scroll-margin-top: 84px;
  }

  .section-heading {
    margin-bottom: 34px;
  }

  .section-heading h2,
  .audience-card h2,
  .closing-card h2 {
    font-size: clamp(32px, 11vw, 54px);
    margin-bottom: 24px;
  }

  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .mobile-cta {
    bottom: 0;
    padding:
      12px
      max(14px, env(safe-area-inset-right, 0px))
      calc(12px + env(safe-area-inset-bottom, 0px))
      max(14px, env(safe-area-inset-left, 0px));
  }
}
