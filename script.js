import { SITE_CONTENT } from "./content.js?v=20260410-1";

function renderParagraphs(items) {
  return items.map((item) => `<p>${item}</p>`).join("");
}

function renderSimpleList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function renderProblemCards(items) {
  return items
    .map(
      (item) => `
        <article class="problem-card">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}

function renderPillars(items) {
  return items
    .map(
      (item) => `
        <article class="pillar-card">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}

function renderChapterGroups(groups) {
  return groups
    .map(
      (group) => `
        <section class="chapter-group">
          <header class="chapter-group-header">
            <h3>${group.title}</h3>
            <p>${group.description}</p>
          </header>

          <div class="chapter-list">
            ${group.chapters
              .map(
                (chapter) => `
                  <details class="chapter-item">
                    <summary>
                      <span class="chapter-number">${chapter.number}</span>
                      <span class="chapter-title">${chapter.title}</span>
                    </summary>
                    <p>${chapter.summary}</p>
                  </details>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function renderFaq(items) {
  return items
    .map(
      (item) => `
        <details class="faq-item">
          <summary>${item.question}</summary>
          <p>${item.answer}</p>
        </details>
      `
    )
    .join("");
}

function setLinks() {
  document.querySelectorAll('[data-role="amazon-link"]').forEach((link) => {
    link.href = SITE_CONTENT.meta.amazonUrl;
  });

  document.querySelectorAll('[data-role="download-link"]').forEach((link) => {
    link.href = SITE_CONTENT.meta.downloadUrl;
  });

  document.querySelectorAll('[data-role="sample-link"]').forEach((link) => {
    link.href = SITE_CONTENT.meta.sampleUrl;
  });
}

function setMetadata() {
  document.title = SITE_CONTENT.meta.title;

  const currentUrl = new URL(window.location.href);
  currentUrl.hash = "";

  const siteUrl = SITE_CONTENT.meta.siteUrl || currentUrl.toString();
  const ogImageUrl = new URL(SITE_CONTENT.meta.ogImage, siteUrl).toString();

  const metaMap = [
    ["meta[name='description']", SITE_CONTENT.meta.description],
    ["meta[property='og:title']", SITE_CONTENT.meta.title],
    ["meta[property='og:description']", SITE_CONTENT.meta.description],
    ["meta[property='og:url']", siteUrl],
    ["meta[property='og:image']", ogImageUrl],
    ["meta[name='twitter:title']", SITE_CONTENT.meta.title],
    ["meta[name='twitter:description']", SITE_CONTENT.meta.description],
    ["meta[name='twitter:image']", ogImageUrl],
    ["link[rel='canonical']", siteUrl],
  ];

  metaMap.forEach(([selector, value]) => {
    const node = document.querySelector(selector);
    if (!node) return;
    if (node.tagName === "LINK") {
      node.setAttribute("href", value);
    } else {
      node.setAttribute("content", value);
    }
  });

  const schemaNode = document.getElementById("book-schema");
  if (schemaNode) {
    schemaNode.textContent = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "Book",
        name: "Sé dueño de tu tiempo",
        author: {
          "@type": "Person",
          name: SITE_CONTENT.meta.author,
        },
        inLanguage: SITE_CONTENT.meta.language,
        description: SITE_CONTENT.meta.description,
        image: ogImageUrl,
        url: siteUrl,
        offers: {
          "@type": "Offer",
          url: SITE_CONTENT.meta.amazonUrl,
          availability: "https://schema.org/InStock",
        },
      },
      null,
      2
    );
  }
}

function setupHeaderCoverEffect() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const updateHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 140);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

function setupMobileNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.getElementById("mobile-nav-panel");

  if (!header || !toggle || !panel) return;

  const desktopQuery = window.matchMedia("(min-width: 861px)");

  const setMenuState = (isOpen) => {
    header.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
    );
  };

  const closeMenu = () => setMenuState(false);

  toggle.addEventListener("click", () => {
    setMenuState(!header.classList.contains("menu-open"));
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!header.classList.contains("menu-open")) return;
    if (header.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  const closeOnDesktop = (event) => {
    if (event.matches) {
      closeMenu();
    }
  };

  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", closeOnDesktop);
  } else {
    desktopQuery.addListener(closeOnDesktop);
  }
}

function hydrate() {
  document.getElementById("hero-subtitle").textContent = SITE_CONTENT.hero.subtitle;
  document.getElementById("hero-body").innerHTML = renderParagraphs(SITE_CONTENT.hero.body);
  document.getElementById("hero-points").innerHTML = renderSimpleList(SITE_CONTENT.hero.points);
  document.getElementById("problem-grid").innerHTML = renderProblemCards(SITE_CONTENT.problems);
  document.getElementById("pillar-grid").innerHTML = renderPillars(SITE_CONTENT.pillars);
  document.getElementById("sample-title").textContent = SITE_CONTENT.sample.title;
  document.getElementById("sample-text").textContent = SITE_CONTENT.sample.text;
  document.getElementById("toolkit-title").textContent = SITE_CONTENT.toolkit.title;
  document.getElementById("toolkit-text").textContent = SITE_CONTENT.toolkit.text;
  document.getElementById("chapter-groups").innerHTML = renderChapterGroups(
    SITE_CONTENT.chapterGroups
  );
  document.getElementById("good-fit-list").innerHTML = renderSimpleList(
    SITE_CONTENT.fit.good
  );
  document.getElementById("bad-fit-list").innerHTML = renderSimpleList(
    SITE_CONTENT.fit.bad
  );
  document.getElementById("faq-list").innerHTML = renderFaq(SITE_CONTENT.faq);
  document.getElementById(
    "closing-title"
  ).innerHTML = `${SITE_CONTENT.closing.lead}<span>${SITE_CONTENT.closing.highlight}</span>`;
  document.getElementById("closing-text").textContent = SITE_CONTENT.closing.text;
  document.getElementById("year").textContent = new Date().getFullYear();

  setLinks();
  setMetadata();
  setupHeaderCoverEffect();
  setupMobileNav();
}

hydrate();
