const statusNode = document.querySelector("#admin-status");
const loadButton = document.querySelector("#load-content");
const loginForm = document.querySelector("#admin-login-form");
const loginSection = document.querySelector("#admin-login");
const adminPanel = document.querySelector("#admin-panel");
const form = document.querySelector("#content-form");
const passwordInput = document.querySelector("#admin-password");

const servicesItemsNode = document.querySelector("#services-items");
const trustItemsNode = document.querySelector("#trust-items");
const galleryItemsNode = document.querySelector("#gallery-items");
const reviewsItemsNode = document.querySelector("#reviews-items");

const defaultContent = {
  hero: {
    eyebrow: "",
    title: "",
    description: "",
    primaryCtaLabel: "",
    primaryCtaUrl: "",
    secondaryCtaLabel: "",
    secondaryCtaUrl: "",
    highlights: [],
  },
  services: { title: "", description: "", items: [] },
  trust: { title: "", description: "", items: [] },
  gallery: { title: "", description: "", ctaLabel: "", ctaUrl: "", items: [] },
  reviews: { title: "", description: "", score: "", scoreLabel: "", summary: "", items: [] },
  contact: {
    title: "",
    description: "",
    ctaTitle: "",
    ctaDescription: "",
    addressLabel: "",
    addressValue: "",
    hoursLabel: "",
    hoursValue: "",
    phoneLabel: "",
    phoneValue: "",
    whatsappLabel: "",
    whatsappUrl: "",
    phoneUrl: "",
    mapLabel: "",
    mapUrl: "",
    instagramLabel: "",
    instagramUrl: "",
  },
};

const setStatus = (message, mode = "idle") => {
  statusNode.textContent = message;
  statusNode.dataset.mode = mode;
};

const openPanel = () => {
  loginSection?.setAttribute("hidden", "true");
  adminPanel?.removeAttribute("hidden");
  document.body.classList.remove("admin-locked");
};

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Fayl oxunmadi"));
    reader.readAsDataURL(file);
  });

const buildPreview = (value, label) =>
  value
    ? `<img src="${value}" alt="${label}" class="admin-preview-image" />`
    : `<div class="admin-preview empty">${label}</div>`;

const escapeHtml = (value) =>
  String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const fillInputs = (content) => {
  Object.entries(content.hero).forEach(([key, value]) => {
    const input = form.querySelector(`[name="hero.${key}"]`);
    if (input) {
      input.value = Array.isArray(value) ? value.join("\n") : value || "";
    }
  });

  ["services", "trust", "gallery", "reviews", "contact"].forEach((section) => {
    Object.entries(content[section]).forEach(([key, value]) => {
      if (Array.isArray(value)) return;
      const input = form.querySelector(`[name="${section}.${key}"]`);
      if (input) input.value = value || "";
    });
  });
};

const makeSimpleCard = ({ title = "", description = "", badge = "" } = {}, sectionLabel) => {
  const article = document.createElement("article");
  article.className = "admin-item";
  article.innerHTML = `
    <div class="admin-item-head">
      <strong>${sectionLabel}</strong>
      <button class="button secondary admin-remove" type="button">Sil</button>
    </div>
    <label>
      <span>Badge</span>
      <input name="badge" type="text" value="${escapeHtml(badge)}" />
    </label>
    <label>
      <span>Başlıq</span>
      <input name="title" type="text" value="${escapeHtml(title)}" />
    </label>
    <label>
      <span>Açıqlama</span>
      <textarea name="description" rows="3">${escapeHtml(description)}</textarea>
    </label>
  `;
  article.querySelector(".admin-remove").addEventListener("click", () => article.remove());
  return article;
};

const makeReviewCard = ({ name = "", rating = 5, text = "" } = {}) => {
  const article = document.createElement("article");
  article.className = "admin-item";
  article.innerHTML = `
    <div class="admin-item-head">
      <strong>Rəy</strong>
      <button class="button secondary admin-remove" type="button">Sil</button>
    </div>
    <div class="admin-grid-two">
      <label>
        <span>Ad</span>
        <input name="name" type="text" value="${escapeHtml(name)}" />
      </label>
      <label>
        <span>Reytinq</span>
        <input name="rating" type="number" min="1" max="5" value="${Number(rating) || 5}" />
      </label>
    </div>
    <label>
      <span>Rəy mətni</span>
      <textarea name="text" rows="3">${escapeHtml(text)}</textarea>
    </label>
  `;
  article.querySelector(".admin-remove").addEventListener("click", () => article.remove());
  return article;
};

const makeGalleryCard = ({ title = "", badge = "", description = "", beforeImage = "", afterImage = "" } = {}) => {
  const article = document.createElement("article");
  article.className = "admin-item";
  article.innerHTML = `
    <div class="admin-item-head">
      <strong>Şəkil kartı</strong>
      <button class="button secondary admin-remove" type="button">Sil</button>
    </div>
    <label>
      <span>Badge</span>
      <input name="badge" type="text" value="${escapeHtml(badge)}" />
    </label>
    <label>
      <span>Başlıq</span>
      <input name="title" type="text" value="${escapeHtml(title)}" />
    </label>
    <label>
      <span>Açıqlama</span>
      <textarea name="description" rows="3">${escapeHtml(description)}</textarea>
    </label>
    <div class="admin-upload-grid">
      <div>
        <span class="admin-field-label">Əvvəl şəkli</span>
        <div class="admin-preview-wrap" data-preview="beforeImage">${buildPreview(beforeImage, "Əvvəl")}</div>
        <div class="admin-image-actions">
          <button class="button secondary admin-clear" data-clear="beforeImage" type="button">Şəkli sil</button>
        </div>
        <input name="beforeImageFile" type="file" accept="image/*" />
      </div>
      <div>
        <span class="admin-field-label">Sonra şəkli</span>
        <div class="admin-preview-wrap" data-preview="afterImage">${buildPreview(afterImage, "Sonra")}</div>
        <div class="admin-image-actions">
          <button class="button secondary admin-clear" data-clear="afterImage" type="button">Şəkli sil</button>
        </div>
        <input name="afterImageFile" type="file" accept="image/*" />
      </div>
    </div>
    <input name="beforeImage" type="hidden" value="${escapeHtml(beforeImage)}" />
    <input name="afterImage" type="hidden" value="${escapeHtml(afterImage)}" />
  `;

  article.querySelector(".admin-remove").addEventListener("click", () => article.remove());

  ["beforeImage", "afterImage"].forEach((fieldName) => {
    const fileInput = article.querySelector(`input[name="${fieldName}File"]`);
    const hiddenInput = article.querySelector(`input[name="${fieldName}"]`);
    const previewWrap = article.querySelector(`[data-preview="${fieldName}"]`);
    const clearButton = article.querySelector(`[data-clear="${fieldName}"]`);

    clearButton.addEventListener("click", () => {
      hiddenInput.value = "";
      fileInput.value = "";
      previewWrap.innerHTML = buildPreview("", fieldName === "beforeImage" ? "Əvvəl" : "Sonra");
    });

    fileInput.addEventListener("change", async () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      try {
        const dataUrl = await fileToDataUrl(file);
        hiddenInput.value = dataUrl;
        previewWrap.innerHTML = buildPreview(dataUrl, fieldName === "beforeImage" ? "Əvvəl" : "Sonra");
      } catch (error) {
        setStatus(error.message, "error");
      }
    });
  });

  return article;
};

const renderCollection = (node, items, makeCard) => {
  node.innerHTML = "";
  items.forEach((item) => node.append(makeCard(item)));
};

const gatherSimpleCollection = (node) =>
  Array.from(node.querySelectorAll(".admin-item")).map((item) => ({
    badge: item.querySelector('[name="badge"]').value.trim(),
    title: item.querySelector('[name="title"]').value.trim(),
    description: item.querySelector('[name="description"]').value.trim(),
  }));

const gatherGalleryCollection = () =>
  Array.from(galleryItemsNode.querySelectorAll(".admin-item")).map((item) => ({
    badge: item.querySelector('[name="badge"]').value.trim(),
    title: item.querySelector('[name="title"]').value.trim(),
    description: item.querySelector('[name="description"]').value.trim(),
    beforeImage: item.querySelector('[name="beforeImage"]').value.trim(),
    afterImage: item.querySelector('[name="afterImage"]').value.trim(),
  }));

const gatherReviewsCollection = () =>
  Array.from(reviewsItemsNode.querySelectorAll(".admin-item")).map((item) => ({
    name: item.querySelector('[name="name"]').value.trim(),
    rating: Number(item.querySelector('[name="rating"]').value) || 5,
    text: item.querySelector('[name="text"]').value.trim(),
  }));

const gatherContent = () => ({
  hero: {
    eyebrow: form.querySelector('[name="hero.eyebrow"]').value.trim(),
    title: form.querySelector('[name="hero.title"]').value.trim(),
    description: form.querySelector('[name="hero.description"]').value.trim(),
    primaryCtaLabel: form.querySelector('[name="hero.primaryCtaLabel"]').value.trim(),
    primaryCtaUrl: form.querySelector('[name="hero.primaryCtaUrl"]').value.trim(),
    secondaryCtaLabel: form.querySelector('[name="hero.secondaryCtaLabel"]').value.trim(),
    secondaryCtaUrl: form.querySelector('[name="hero.secondaryCtaUrl"]').value.trim(),
    highlights: form
      .querySelector('[name="hero.highlights"]')
      .value.split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
  },
  services: {
    title: form.querySelector('[name="services.title"]').value.trim(),
    description: form.querySelector('[name="services.description"]').value.trim(),
    items: gatherSimpleCollection(servicesItemsNode),
  },
  trust: {
    title: form.querySelector('[name="trust.title"]').value.trim(),
    description: form.querySelector('[name="trust.description"]').value.trim(),
    items: gatherSimpleCollection(trustItemsNode),
  },
  gallery: {
    title: form.querySelector('[name="gallery.title"]').value.trim(),
    description: form.querySelector('[name="gallery.description"]').value.trim(),
    ctaLabel: form.querySelector('[name="gallery.ctaLabel"]').value.trim(),
    ctaUrl: form.querySelector('[name="gallery.ctaUrl"]').value.trim(),
    items: gatherGalleryCollection(),
  },
  reviews: {
    title: form.querySelector('[name="reviews.title"]').value.trim(),
    description: form.querySelector('[name="reviews.description"]').value.trim(),
    score: form.querySelector('[name="reviews.score"]').value.trim(),
    scoreLabel: form.querySelector('[name="reviews.scoreLabel"]').value.trim(),
    summary: form.querySelector('[name="reviews.summary"]').value.trim(),
    items: gatherReviewsCollection(),
  },
  contact: {
    title: form.querySelector('[name="contact.title"]').value.trim(),
    description: form.querySelector('[name="contact.description"]').value.trim(),
    ctaTitle: form.querySelector('[name="contact.ctaTitle"]').value.trim(),
    ctaDescription: form.querySelector('[name="contact.ctaDescription"]').value.trim(),
    addressLabel: form.querySelector('[name="contact.addressLabel"]').value.trim(),
    addressValue: form.querySelector('[name="contact.addressValue"]').value.trim(),
    hoursLabel: form.querySelector('[name="contact.hoursLabel"]').value.trim(),
    hoursValue: form.querySelector('[name="contact.hoursValue"]').value.trim(),
    phoneLabel: form.querySelector('[name="contact.phoneLabel"]').value.trim(),
    phoneValue: form.querySelector('[name="contact.phoneValue"]').value.trim(),
    whatsappLabel: form.querySelector('[name="contact.whatsappLabel"]').value.trim(),
    whatsappUrl: form.querySelector('[name="contact.whatsappUrl"]').value.trim(),
    phoneUrl: form.querySelector('[name="contact.phoneUrl"]').value.trim(),
    mapLabel: form.querySelector('[name="contact.mapLabel"]').value.trim(),
    mapUrl: form.querySelector('[name="contact.mapUrl"]').value.trim(),
    instagramLabel: form.querySelector('[name="contact.instagramLabel"]').value.trim(),
    instagramUrl: form.querySelector('[name="contact.instagramUrl"]').value.trim(),
  },
});

const applyContent = (content) => {
  fillInputs({ ...defaultContent, ...content });
  renderCollection(servicesItemsNode, content.services.items || [], (item) => makeSimpleCard(item, "Xidmət"));
  renderCollection(trustItemsNode, content.trust.items || [], (item) => makeSimpleCard(item, "Üstünlük"));
  renderCollection(galleryItemsNode, content.gallery.items || [], makeGalleryCard);
  renderCollection(reviewsItemsNode, content.reviews.items || [], makeReviewCard);
};

const loadContent = async () => {
  setStatus("Məzmun yüklənir...", "loading");
  try {
    const response = await fetch("/api/site-content", { cache: "no-store" });
    if (!response.ok) throw new Error("Məzmun yüklənmədi");
    const payload = await response.json();
    applyContent({ ...defaultContent, ...payload });
    setStatus("Məzmun yükləndi.", "success");
  } catch (error) {
    applyContent(defaultContent);
    setStatus("API oxunmadı, default struktur açıldı.", "error");
  }
};

document.querySelector("#add-service")?.addEventListener("click", () => {
  servicesItemsNode.append(makeSimpleCard({}, "Xidmət"));
});
document.querySelector("#add-trust")?.addEventListener("click", () => {
  trustItemsNode.append(makeSimpleCard({}, "Üstünlük"));
});
document.querySelector("#add-gallery")?.addEventListener("click", () => {
  galleryItemsNode.append(makeGalleryCard({}));
});
document.querySelector("#add-review")?.addEventListener("click", () => {
  reviewsItemsNode.append(makeReviewCard({}));
});

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const password = passwordInput.value.trim();
  if (!password) {
    setStatus("Admin şifrəsi tələb olunur.", "error");
    return;
  }

  openPanel();
  setStatus("Giriş qəbul edildi, məzmun yüklənir...", "loading");
  await loadContent();
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const password = passwordInput.value.trim();
  if (!password) {
    setStatus("Admin şifrəsi tələb olunur.", "error");
    return;
  }

  setStatus("Dəyişikliklər saxlanır...", "loading");
  try {
    const response = await fetch("/api/site-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify(gatherContent()),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || "Yadda saxlamaq alınmadı");
    }
    setStatus("Dəyişikliklər saxlanıldı.", "success");
  } catch (error) {
    setStatus(error.message, "error");
  }
});

applyContent(defaultContent);
