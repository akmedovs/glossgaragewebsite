const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 3000);
const adminPassword = process.env.ADMIN_PASSWORD || "glossgarage-admin";
const dataDir = process.env.DATA_DIR || "/data";
const dataFile = path.join(dataDir, "site-content.json");

const defaultContent = {
  updatedAt: "2026-07-31T00:00:00.000Z",
  hero: {
    eyebrow: "Gloss Garage AZ",
    title: "Avtomobiliniz üçün Premium Qulluq və Detailing",
    description:
      "Bakıxanovda peşəkar kimyəvi təmizləmə, polirovka və boya qoruyucu xidmətlər. Avtomobilinizə ilk gündən daha parlaq görünüş qaytarırıq.",
    primaryCtaLabel: "WhatsApp ilə Vaxt Seç",
    primaryCtaUrl: "https://wa.me/994705090059",
    secondaryCtaLabel: "Xəritədə aç",
    secondaryCtaUrl: "https://maps.google.com/?q=GlossGarage%20Bakıxanov%20Yavər%20Əliyev%20246C",
    highlights: [
      "Kimyəvi təmizləmə",
      "Polirovka",
      "Keramika",
      "Express və premium yuma",
    ],
  },
  services: {
    title: "Bizim Xidmətlər",
    description: "Ən çox tələb olunan xidmətlər qısa, aydın və nəticə yönümlü formada.",
    items: [
      {
        badge: "01",
        title: "İnteryer Kimyəvi Təmizləmə",
        description: "Dərin təmizlik, dəri qulluğu və xoşagəlməz qoxuların tam ləğvi.",
      },
      {
        badge: "02",
        title: "Polirovka və Keramika",
        description: "Çızıqların aradan qaldırılması və uzunmüddətli parlaq qoruyucu təbəqə.",
      },
      {
        badge: "03",
        title: "Express & Premium Yuma",
        description: "Detallara diqqət yetirən, boyaya zərər verməyən peşəkar yuma.",
      },
      {
        badge: "04",
        title: "Boya Qoruyucu Qulluq",
        description: "Günəş, su izi və gündəlik istifadənin yaratdığı vizual yorğunluğa qarşı əlavə qoruma.",
      },
    ],
  },
  trust: {
    title: "Niyə Məhz Gloss Garage?",
    description: "Bizim üçün hər bir detal önəmlidir.",
    items: [
      {
        badge: "Etibar",
        title: "Peşəkar Avadanlıq və Kimyəvi Dərmanlar",
        description: "Yalnız təcrübədən keçmiş premium brendlərdən və detailing üçün uyğun avadanlıqdan istifadə edirik.",
      },
      {
        badge: "Nəticə",
        title: "Zəmanətli Nəticə",
        description: "Gördüyümüz hər bir işə və detallara 100% cavabdehliklə yanaşırıq.",
      },
      {
        badge: "Vaxt",
        title: "Vaxtınıza Qənaət",
        description: "Əvvəlcədən növbə yazılmaqla növbəsiz və cəld xidmət təqdim edirik.",
      },
      {
        badge: "Detallıq",
        title: "Hər Avtomobilə Fərdi Yanaşma",
        description: "Salon, boya və istifadə vəziyyətinə görə iş planı fərqli qurulur, standart keçid edilmir.",
      },
    ],
  },
  gallery: {
    title: "Əvvəl / Sonra",
    description: "Polirovka və kimyəvi təmizləmə işlərindən seçilmiş nümunələr.",
    ctaLabel: "Şəkillər üzrə soruş",
    ctaUrl: "https://wa.me/994705090059",
    items: [
      {
        title: "Kimyəvi təmizləmə",
        badge: "Salon bərpası",
        description: "Oturacaq, döşəmə və tavan təmizliyi sonrası salonda vizual və gigiyenik fərq.",
        beforeImage: "",
        afterImage: "",
      },
      {
        title: "Polirovka",
        badge: "Boya parıltısı",
        description: "Səth yorğunluğu və xırda cızıq görünüşü yumşaldıldıqdan sonra əldə olunan nəticə.",
        beforeImage: "",
        afterImage: "",
      },
      {
        title: "Premium yuma",
        badge: "Gündəlikdən premiuma",
        description: "Yuma sonrası detallı görünüş və təmiz təqdimat üçün nümunə kart.",
        beforeImage: "",
        afterImage: "",
      },
    ],
  },
  reviews: {
    title: "Müştəri Rəyləri",
    description: "Qısa, aydın və nəticəyə əsaslanan müştəri təəssüratları.",
    score: "5.0",
    scoreLabel: "müştəri məmnuniyyəti yanaşması",
    summary:
      "Müştərilər əsasən təmizliyin keyfiyyətini, boya səthinə diqqəti və vaxtında təhvili önə çəkirlər.",
    items: [
      {
        name: "Orxan M.",
        rating: 5,
        text: "Salon kimyəvi təmizləmədən sonra maşın tam başqa səviyyəyə çıxdı. Qoxu, ləkə və xırda detallara ciddi fikir verirlər.",
      },
      {
        name: "Elvin K.",
        rating: 5,
        text: "Polirovkadan sonra boya güzgü kimi görünürdü. Vaxta da riayət etdilər, bu mənim üçün əsas idi.",
      },
      {
        name: "Rauf A.",
        rating: 5,
        text: "Premium yuma sadəcə yuma deyil, maşını təhvil alanda fərq dərhal hiss olunur. Təmiz və səliqəli işdir.",
      },
    ],
  },
  contact: {
    title: "Ünvan və Əlaqə",
    description: "Sifariş, qiymətləndirmə və yer məlumatı üçün birbaşa əlaqə saxlayın.",
    ctaTitle: "Vaxt seçin, nəticəni biz həll edək.",
    ctaDescription: "Əvvəlcədən yazılın, avtomobilinizi gətirin və işi detallı şəkildə bizə buraxın.",
    addressLabel: "Ünvan",
    addressValue: "Bakıxanov qəs., Yavər Əliyev küç. 246C",
    hoursLabel: "İş saatları",
    hoursValue: "09:00 - 20:00",
    phoneLabel: "Əlaqə / WhatsApp",
    phoneValue: "+994 70 509 00 59",
    whatsappLabel: "WhatsApp ilə Vaxt Seç",
    whatsappUrl: "https://wa.me/994705090059",
    phoneUrl: "tel:+994705090059",
    mapLabel: "Xəritədə aç",
    mapUrl: "https://maps.google.com/?q=GlossGarage%20Bakıxanov%20Yavər%20Əliyev%20246C",
    instagramLabel: "Instagram: glossgarage.az",
    instagramUrl: "https://instagram.com/glossgarage.az",
  },
};

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
};

const ensureStore = () => {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(defaultContent, null, 2));
  }
};

const readContent = () => {
  ensureStore();
  return JSON.parse(fs.readFileSync(dataFile, "utf8"));
};

const writeContent = (payload) => {
  ensureStore();
  fs.writeFileSync(
    dataFile,
    JSON.stringify(
      {
        ...payload,
        updatedAt: new Date().toISOString(),
      },
      null,
      2
    )
  );
};

const collectBody = (request) =>
  new Promise((resolve, reject) => {
    let raw = "";
    request.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 15 * 1024 * 1024) {
        reject(new Error("Payload too large"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(raw));
    request.on("error", reject);
  });

const toText = (value) => String(value || "").trim();

const normalizeArray = (value, mapper) =>
  Array.isArray(value) ? value.map(mapper).filter(Boolean) : [];

const normalizeContent = (input) => ({
  hero: {
    eyebrow: toText(input?.hero?.eyebrow),
    title: toText(input?.hero?.title),
    description: toText(input?.hero?.description),
    primaryCtaLabel: toText(input?.hero?.primaryCtaLabel),
    primaryCtaUrl: toText(input?.hero?.primaryCtaUrl),
    secondaryCtaLabel: toText(input?.hero?.secondaryCtaLabel),
    secondaryCtaUrl: toText(input?.hero?.secondaryCtaUrl),
    highlights: normalizeArray(input?.hero?.highlights, (item) => toText(item)).filter(Boolean),
  },
  services: {
    title: toText(input?.services?.title),
    description: toText(input?.services?.description),
    items: normalizeArray(input?.services?.items, (item) => {
      const normalized = {
        badge: toText(item?.badge),
        title: toText(item?.title),
        description: toText(item?.description),
      };
      return normalized.title || normalized.description ? normalized : null;
    }),
  },
  trust: {
    title: toText(input?.trust?.title),
    description: toText(input?.trust?.description),
    items: normalizeArray(input?.trust?.items, (item) => {
      const normalized = {
        badge: toText(item?.badge),
        title: toText(item?.title),
        description: toText(item?.description),
      };
      return normalized.title || normalized.description ? normalized : null;
    }),
  },
  gallery: {
    title: toText(input?.gallery?.title),
    description: toText(input?.gallery?.description),
    ctaLabel: toText(input?.gallery?.ctaLabel),
    ctaUrl: toText(input?.gallery?.ctaUrl),
    items: normalizeArray(input?.gallery?.items, (item) => {
      const normalized = {
        title: toText(item?.title),
        badge: toText(item?.badge),
        description: toText(item?.description),
        beforeImage: toText(item?.beforeImage),
        afterImage: toText(item?.afterImage),
      };
      return normalized.title || normalized.description || normalized.beforeImage || normalized.afterImage ? normalized : null;
    }),
  },
  reviews: {
    title: toText(input?.reviews?.title),
    description: toText(input?.reviews?.description),
    score: toText(input?.reviews?.score),
    scoreLabel: toText(input?.reviews?.scoreLabel),
    summary: toText(input?.reviews?.summary),
    items: normalizeArray(input?.reviews?.items, (item) => {
      const normalized = {
        name: toText(item?.name),
        rating: Math.max(1, Math.min(5, Number(item?.rating) || 5)),
        text: toText(item?.text),
      };
      return normalized.name || normalized.text ? normalized : null;
    }),
  },
  contact: {
    title: toText(input?.contact?.title),
    description: toText(input?.contact?.description),
    ctaTitle: toText(input?.contact?.ctaTitle),
    ctaDescription: toText(input?.contact?.ctaDescription),
    addressLabel: toText(input?.contact?.addressLabel),
    addressValue: toText(input?.contact?.addressValue),
    hoursLabel: toText(input?.contact?.hoursLabel),
    hoursValue: toText(input?.contact?.hoursValue),
    phoneLabel: toText(input?.contact?.phoneLabel),
    phoneValue: toText(input?.contact?.phoneValue),
    whatsappLabel: toText(input?.contact?.whatsappLabel),
    whatsappUrl: toText(input?.contact?.whatsappUrl),
    phoneUrl: toText(input?.contact?.phoneUrl),
    mapLabel: toText(input?.contact?.mapLabel),
    mapUrl: toText(input?.contact?.mapUrl),
    instagramLabel: toText(input?.contact?.instagramLabel),
    instagramUrl: toText(input?.contact?.instagramUrl),
  },
});

const contentIsValid = (content) =>
  Boolean(
    content.hero.title &&
      content.services.title &&
      content.trust.title &&
      content.gallery.title &&
      content.reviews.title &&
      content.contact.title
  );

const server = http.createServer(async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-password");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.url === "/api/site-content" && (request.method === "GET" || request.method === "HEAD")) {
    const payload = readContent();
    if (request.method === "HEAD") {
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      });
      response.end();
      return;
    }
    sendJson(response, 200, payload);
    return;
  }

  if (request.url === "/api/site-content" && request.method === "POST") {
    if (request.headers["x-admin-password"] !== adminPassword) {
      sendJson(response, 401, { error: "Yanlış admin şifrəsi" });
      return;
    }

    try {
      const raw = await collectBody(request);
      const payload = JSON.parse(raw || "{}");
      const normalized = normalizeContent(payload);

      if (!contentIsValid(normalized)) {
        sendJson(response, 400, { error: "Əsas bölmə başlıqları boş ola bilməz" });
        return;
      }

      writeContent(normalized);
      sendJson(response, 200, { ok: true, ...normalized });
    } catch (error) {
      sendJson(response, 400, { error: "Məlumat oxunmadı" });
    }
    return;
  }

  sendJson(response, 404, { error: "Tapılmadı" });
});

server.listen(port, () => {
  ensureStore();
  console.log(`Gloss Garage admin API listening on ${port}`);
});
