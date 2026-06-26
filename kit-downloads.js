const KIT_DOWNLOADS = {
  formUrl: "https://ruben-soro-esteban.kit.com/b2a4add913",
  directExcelUrl: "assets/Calculadora_v2.xlsx",
  directAndroidUrl:
    "https://drive.google.com/file/d/17hr4lD9b17loOZgSNKeo1AwPjThspwOu/view?usp=drive_link",
};

function hasKitUrl(url) {
  return typeof url === "string" && /^https?:\/\//i.test(url.trim());
}

function applyDownloadGate(link, { fallbackUrl, label, compactLabel }) {
  const configured = hasKitUrl(KIT_DOWNLOADS.formUrl);
  const isMobileCta = link.closest(".mobile-cta");
  const nextUrl = configured ? KIT_DOWNLOADS.formUrl.trim() : fallbackUrl;

  link.href = nextUrl;
  link.textContent = isMobileCta && compactLabel ? compactLabel : label;
  link.dataset.kitConfigured = String(configured);

  if (configured) {
    link.target = "_blank";
    link.rel = "noreferrer";
    link.removeAttribute("download");
    link.classList.remove("is-kit-pending");
  } else {
    link.removeAttribute("target");
    link.removeAttribute("rel");
    link.classList.add("is-kit-pending");
  }
}

function updateDownloadLinks() {
  document.querySelectorAll('[data-role="download-link"]').forEach((link) => {
    applyDownloadGate(link, {
      fallbackUrl: KIT_DOWNLOADS.directExcelUrl,
      label: "Recibir Excel o app por email",
      compactLabel: "Excel",
    });
  });

  document.querySelectorAll('a[href*="17hr4lD9b17loOZgSNKeo1AwPjThspwOu"]').forEach((link) => {
    applyDownloadGate(link, {
      fallbackUrl: KIT_DOWNLOADS.directAndroidUrl,
      label: "Recibir Excel o app por email",
      compactLabel: "App",
    });
  });
}

function addDownloadNotice() {
  const actions = document.querySelector(".resource-actions");
  if (!actions) return;

  const isConfigured = hasKitUrl(KIT_DOWNLOADS.formUrl);
  const notice = document.createElement("p");
  notice.className = `kit-download-note${isConfigured ? "" : " kit-download-note-pending"}`;
  notice.textContent = isConfigured
    ? "Déjame tu email, confirma el correo de Kit y recibirás los enlaces para descargar el Excel o la app. También podrás apuntarte a la newsletter del autor."
    : "Pendiente de conectar Kit: cuando esté creada la URL del formulario, estos botones pedirán email antes de enviar las descargas.";

  const privacyNote = document.createElement("p");
  privacyNote.className = "privacy-note";
  privacyNote.innerHTML =
    'Al suscribirte aceptas recibir comunicaciones por email sobre patrimonio, inversión y libertad financiera. Puedes darte de baja cuando quieras. Consulta la <a href="privacidad.html">política de privacidad</a>.';

  actions.after(notice, privacyNote);
}

function addNewsletterLink() {
  const contactLinks = document.querySelector(".contact-links");
  if (!contactLinks || !hasKitUrl(KIT_DOWNLOADS.formUrl)) return;

  const link = document.createElement("a");
  link.className = "contact-email";
  link.href = KIT_DOWNLOADS.formUrl.trim();
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "Suscribirme a la newsletter";

  contactLinks.prepend(link);
}

function addLegalFooterLinks() {
  const footer = document.querySelector(".footer-inner");
  if (!footer || footer.querySelector(".legal-footer-links")) return;

  const nav = document.createElement("nav");
  nav.className = "legal-footer-links";
  nav.setAttribute("aria-label", "Enlaces legales");
  nav.innerHTML = `
    <a class="footer-back" href="privacidad.html">Privacidad</a>
    <a class="footer-back" href="aviso-legal.html">Aviso legal</a>
    <a class="footer-back" href="https://www.rubensoro.es">← Todos los libros</a>
  `;

  const oldBackLink = footer.querySelector(".footer-back");
  if (oldBackLink) {
    oldBackLink.remove();
  }
  footer.append(nav);
}

updateDownloadLinks();
addDownloadNotice();
addNewsletterLink();
addLegalFooterLinks();
