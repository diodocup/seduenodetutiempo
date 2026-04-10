import { SITE_CONTENT } from "./content.js?v=20260410-1";

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function setHtml(id, value) {
  const node = document.getElementById(id);
  if (node) node.innerHTML = value;
}

function renderParagraphs(items) {
  return items.map((item) => `<p>${item}</p>`).join("");
}

function renderList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function renderCards(items, className) {
  return items
    .map(
      (item) => `
        <article class="${className}">
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
  document.querySelectorAll('[data-role="sample-link"]').forEach((link) => {
    link.href = SITE_CONTENT.meta.sampleUrl;
  });
  document.querySelectorAll('[data-role="download-link"]').forEach((link) => {
    link.href = SITE_CONTENT.meta.downloadUrl;
  });
}

function setMeta() {
  const variantTitle = document.body.dataset.variantTitle;
  document.title = variantTitle
    ? `${variantTitle} | Sé dueño de tu tiempo`
    : SITE_CONTENT.meta.title;

  const description = SITE_CONTENT.meta.description;
  const descNode = document.querySelector("meta[name='description']");
  if (descNode) descNode.setAttribute("content", description);
}

function setupHeaderEffect() {
  const header = document.querySelector(".variant-header");
  const heroGrid = document.querySelector(".hero-grid");
  const heroVisual = document.querySelector(".hero-visual");
  if (!header) return;

  const isStackedLayout = () => {
    if (!heroGrid) return false;
    const columns = getComputedStyle(heroGrid).gridTemplateColumns.trim();
    return !columns.includes(" ");
  };

  const getTriggerOffset = () => {
    if (!heroVisual || !isStackedLayout()) return 120;

    const headerHeight = header.getBoundingClientRect().height;
    const visualTop = heroVisual.getBoundingClientRect().top + window.scrollY;
    return Math.max(120, visualTop - headerHeight - 24);
  };

  const toggle = () => {
    header.classList.toggle("is-scrolled", window.scrollY > getTriggerOffset());
  };

  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
  window.addEventListener("resize", toggle);
}

function hydrate() {
  setText("hero-subtitle", SITE_CONTENT.hero.subtitle);
  setHtml("hero-body", renderParagraphs(SITE_CONTENT.hero.body));
  setHtml("hero-points", renderList(SITE_CONTENT.hero.points));
  setHtml("problem-grid", renderCards(SITE_CONTENT.problems, "info-card"));
  setHtml("pillar-grid", renderCards(SITE_CONTENT.pillars, "info-card"));
  setText("sample-title", SITE_CONTENT.sample.title);
  setText("sample-text", SITE_CONTENT.sample.text);
  setText("toolkit-title", SITE_CONTENT.toolkit.title);
  setText("toolkit-text", SITE_CONTENT.toolkit.text);
  setHtml("chapter-groups", renderChapterGroups(SITE_CONTENT.chapterGroups));
  setHtml("good-fit-list", renderList(SITE_CONTENT.fit.good));
  setHtml("bad-fit-list", renderList(SITE_CONTENT.fit.bad));
  setHtml("faq-list", renderFaq(SITE_CONTENT.faq));
  setHtml(
    "closing-title",
    `${SITE_CONTENT.closing.lead}<span>${SITE_CONTENT.closing.highlight}</span>`
  );
  setText("closing-text", SITE_CONTENT.closing.text);
  setText("year", String(new Date().getFullYear()));

  setLinks();
  setMeta();
  setupHeaderEffect();
}

hydrate();
