const KIT_DOWNLOADS = {
  // Replace these two URLs with the public Kit form or landing-page URLs.
  excelUrl: "",
  androidUrl: "",
  newsletterUrl: "",
  directExcelUrl: "assets/Calculadora_v2.xlsx",
  directAndroidUrl:
    "https://drive.google.com/file/d/17hr4lD9b17loOZgSNKeo1AwPjThspwOu/view?usp=drive_link",
};

function hasKitUrl(url) {
  return typeof url === "string" && /^https?:\/\//i.test(url.trim());
}

function applyDownloadGate(link, { kitUrl, fallbackUrl, label, compactLabel }) {
  const configured = hasKitUrl(kitUrl);
  const isMobileCta = link.closest(".mobile-cta");
  const nextUrl = configured ? kitUrl.trim() : fallbackUrl;

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
      kitUrl: KIT_DOWNLOADS.excelUrl,
      fallbackUrl: KIT_DOWNLOADS.directExcelUrl,
      label: "Recibir hoja de cálculo por email",
      compactLabel: "Excel",
    });
  });

  document.querySelectorAll('a[href*="17hr4lD9b17loOZgSNKeo1AwPjThspwOu"]').forEach((link) => {
    applyDownloadGate(link, {
      kitUrl: KIT_DOWNLOADS.androidUrl,
      fallbackUrl: KIT_DOWNLOADS.directAndroidUrl,
      label: "Recibir app Android por email",
      compactLabel: "App",
    });
  });
}

function addDownloadNotice() {
  const actions = document.querySelector(".resource-actions");
  if (!actions) return;

  const isConfigured = hasKitUrl(KIT_DOWNLOADS.excelUrl) || hasKitUrl(KIT_DOWNLOADS.androidUrl);
  const notice = document.createElement("p");
  notice.className = `kit-download-note${isConfigured ? "" : " kit-download-note-pending"}`;
  notice.textContent = isConfigured
    ? "Déjame tu email, confirma el correo de Kit y recibirás el enlace de descarga. También podrás apuntarte a la newsletter del autor."
    : "Pendiente de conectar Kit: cuando estén creados los formularios, estos botones pedirán email antes de enviar la descarga.";

  actions.after(notice);
}

function addNewsletterLink() {
  const contactLinks = document.querySelector(".contact-links");
  if (!contactLinks || !hasKitUrl(KIT_DOWNLOADS.newsletterUrl)) return;

  const link = document.createElement("a");
  link.className = "contact-email";
  link.href = KIT_DOWNLOADS.newsletterUrl.trim();
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "Suscribirme a la newsletter";

  contactLinks.prepend(link);
}

updateDownloadLinks();
addDownloadNotice();
addNewsletterLink();
