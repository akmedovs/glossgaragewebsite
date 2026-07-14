# Gloss Garage Website

Bir səhifəlik `Gloss Garage` detailing saytı.

## Nə var

- `dist/` içində hazır statik sayt
- Docker ilə çalışdırma
- Ubuntu server üçün sadə deploy planı
- `glossgarage.az` və `kirayeler.glossgarage.az` üçün reverse proxy qeydi

## Lokal yoxlama

Bu layihə statikdir. Saytı Docker ilə belə qaldıra bilərsən:

```bash
docker compose up -d --build
```

Sonra sayt:

```text
http://localhost:8080
```

## GitHub repo adı

Tövsiyə olunan repo adı:

```text
glossgarage-website
```

## Ubuntu serverdə 0-dan quraşdırma

1. Ubuntu serverə giriş et.
2. Docker və Docker Compose pluginini qur.
3. Bu reponu serverə `git clone` et.
4. Saytı build edib işə sal:

```bash
docker compose up -d --build
```

5. Firewall-da lazım olan portları aç:

```bash
sudo ufw allow 8080/tcp
sudo ufw allow 5173/tcp
```

## Domen yönləndirmə

Vacib qeyd:

- DNS təkcə domeni server IP-sinə yönləndirir.
- Domeni portla ayırmaq üçün reverse proxy lazımdır.
- Yəni `glossgarage.az` və `kirayeler.glossgarage.az` hər ikisi server IP-sinə gedir.
- Sonra Nginx və ya Caddy host adına baxıb düzgün porta yönləndirir.

### Tövsiyə olunan quruluş

- `glossgarage.az` -> `127.0.0.1:8080`
- `kirayeler.glossgarage.az` -> `127.0.0.1:5173`

Əgər bu iki sayt eyni serverdə işləyirsə, ən yaxşı yol host əsaslı reverse proxy-dir.

### Nginx nümunəsi

```nginx
server {
  listen 80;
  server_name glossgarage.az;

  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

server {
  listen 80;
  server_name kirayeler.glossgarage.az;

  location / {
    proxy_pass http://127.0.0.1:5173;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## GitHub-a atmaq

Repo hazır olandan sonra:

```bash
git init
git add .
git commit -m "Initial glossgarage website"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

## Qeyd

Bu repo hazırda `Gloss Garage` front-endini saxlayır. `kirayeler.glossgarage.az` üçün ayrıca layihə və ya ayrıca konteyner işlətmək daha düzgündür.

