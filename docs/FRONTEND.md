# Heptaix — Frontend Dokümantasyonu

> **Son güncelleme:** 1 Nisan 2026

---

## 1. Genel Bakış

Heptaix, **monorepo** yapısında bir todo/görev yönetim uygulaması. Frontend kısmı `client/` dizininde yer alıyor.

| Teknoloji | Versiyon | Açıklama |
|---|---|---|
| **Next.js** | 15.2.4 | App Router, Turbopack |
| **React** | 19 | Concurrent Mode |
| **Tailwind CSS** | 4 | `tw-animate-css` ile |
| **shadcn/ui** | — | Radix UI tabanlı bileşen kütüphanesi |
| **TypeScript** | 5+ | Strict mode |
| **Sonner** | 2.x | Toast bildirimleri |
| **Recharts** | 2.15 | Grafik bileşenleri |
| **Axios** | 1.8 | HTTP istekleri |
| **next-themes** | 0.4.6 | Tema yönetimi (kurulu ama **henüz aktif değil**) |
| **react-hotkeys-hook** | 5.1 | Klavye kısayolları |
| **lucide-react** / **react-icons** | — | İkon kütüphaneleri |

---

## 2. Proje Yapısı

```
client/
├── public/                    # Statik dosyalar (SVG ikonlar)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (AuthProvider, SidebarProvider)
│   │   ├── page.tsx           # Ana sayfa (auth durumu kontrolü)
│   │   ├── globals.css        # Tailwind + CSS değişkenleri (light/dark)
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── components/
│   │   │   ├── AuthorizedSidebar.tsx
│   │   │   ├── UnauthorizedSidebar.tsx
│   │   │   ├── Sidebar.tsx           # Auth durumuna göre sidebar seçimi
│   │   │   ├── MyScreen.tsx          # Dashboard (grafikler)
│   │   │   ├── UnauthorizedScreen.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── ProfileDropdown.tsx
│   │   │   └── charts/PieChart.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx   # Auth state (JWT, login/logout/checkAuth)
│   │   ├── tags/page.tsx
│   │   ├── todo-list/page.tsx   # CRUD todo işlemleri
│   │   ├── types/               # Client-side type tanımları
│   │   └── res/                 # Statik kaynaklar (heptaix.png)
│   ├── hooks/
│   │   └── use-mobile.ts       # Responsive breakpoint hook
│   ├── lib/
│   │   ├── utils.ts            # cn() yardımcı fonksiyonu
│   │   └── toast.ts            # ToastMessages sınıfı
│   └── ui/                     # shadcn/ui bileşenleri
│       ├── avatar, button, card, dialog, dropdown-menu
│       ├── input, navigation-menu, separator, sheet
│       ├── sidebar, skeleton, sonner, textarea, tooltip
│       └── index.ts
├── next.config.ts              # Turbopack, monorepo alias
├── tsconfig.json               # Path aliases (@client/*, @server/*, @common/*)
└── package.json
```

---

## 3. Path Alias'ları

| Alias | Karşılık |
|---|---|
| `@client/*` | `./src/*` |
| `@common/helpers/*` | `../common/helpers/*` |
| `@server/types` | `../server/types/index.ts` |

---

## 4. Sayfalar & Routing

| Route | Dosya | Açıklama |
|---|---|---|
| `/` | `page.tsx` | Auth durumu → `MyScreen` veya `UnauthorizedScreen` |
| `/login` | `(auth)/login/page.tsx` | Giriş formu |
| `/register` | `(auth)/register/page.tsx` | Kayıt formu |
| `/todo-list` | `todo-list/page.tsx` | Todo CRUD (kısayol: `Ctrl+Alt+N` yeni, `Ctrl+Alt+Enter` kaydet) |
| `/tags` | `tags/page.tsx` | Kategori/etiket yönetimi (henüz taslak) |

---

## 5. Auth Akışı

1. `AuthProvider` → `localStorage`'dan `JWT_TOKEN` ve `USER` kontrol eder.
2. Giriş yapılmışsa `isAuthenticated = true`, kullanıcı bilgisi `user` state'ine set edilir.
3. `checkAuth()` → Sunucuya `/api/user/verify` POST isteği atar, 5 dakikada bir tekrarlar.
4. Token geçersizse `/login`'e yönlendirir.
5. `login()` → Token + user bilgisini localStorage'a kaydeder.
6. `logout()` → localStorage temizler, ana sayfaya yönlendirir.

---

## 6. API İletişimi

Tüm istekler Axios ile yapılıyor. Base URL ortam değişkenlerinden oluşturuluyor:

```
${NEXT_PUBLIC_SERVER_PROTOCOL}://${NEXT_PUBLIC_SERVER_HOST}:${NEXT_PUBLIC_SERVER_PORT}
```

**Endpointler:**
- `POST /api/user/login` — Giriş
- `POST /api/user/register` — Kayıt
- `POST /api/user/verify` — Token doğrulama
- `GET /api/todo/list` — Todo listesi
- `POST /api/todo/create` — Todo oluşturma
- `POST /api/todo/delete` — Todo silme

---

## 7. Tema & Dark Mode Durumu

### Mevcut Durum
- `globals.css` içinde `:root` (light) ve `.dark` (dark) CSS değişkenleri **tanımlı**.
- `next-themes` paketi **kurulu** ama `layout.tsx`'de `ThemeProvider` olarak **kullanılmıyor**.
- HTML tag'ında `dark` class'ı hiçbir zaman eklenmediği için dark mode **çalışmıyor**.
- Bazı bileşenlerde `dark:` prefixi kullanılmış ama etki etmiyor (ör. LoadingScreen'de `bg-white` hardcode).

### Sorunlar
- `LoadingScreen`: `bg-white` hardcoded → dark modda beyaz ekran.
- `Login/Register`: `bg-gradient-to-br from-amber-50 to-amber-200/300` ve `bg-white` hardcoded.
- `TagsPage`: `bg-white`, `hover:bg-gray-100`, `border-gray-200` hardcoded.
- `UnauthorizedScreen`: Next.js default şablon, dark mode uyumsuz.
- Sidebar butonları (Login/Register): Hardcoded amber renkleri, dark mode uyumsuz.
- Profil avatarı: `bg-amber-600 text-white` hardcoded.
- Genel olarak birçok yerde `bg-white` ve sabit renkler var.

---

## 8. Bilinen Sorunlar & İyileştirme Alanları

| # | Sorun | Öncelik |
|---|---|---|
| 1 | `next-themes` kurulu ama aktif değil, dark mode çalışmıyor | **Yüksek** |
| 2 | Hardcoded `bg-white`, `text-black` gibi renkler dark mode'u kırıyor | **Yüksek** |
| 3 | Tema geçiş butonu yok | **Yüksek** |
| 4 | `metadata.title` hala "Create Next App" | Orta |
| 5 | `UnauthorizedScreen` Next.js default template | Orta |
| 6 | Login/Register sayfaları sadece light tema için tasarlanmış | Orta |
| 7 | `setInterval` ile auth kontrolü (memory leak riski) | Orta |
| 8 | `checkAuth()` her render'da çağrılıyor (dependency eksik) | Orta |
| 9 | Tags sayfası taslak durumda | Düşük |
| 10 | Grafik verileri statik/dummy | Düşük |

---

## 9. Scriptler

```bash
pnpm dev          # Turbopack ile geliştirme sunucusu
pnpm build        # Production build
pnpm start        # Production sunucu
pnpm lint         # ESLint
```

---

## 10. Ortam Değişkenleri

Bkz: `.env.sample`

```env
NEXT_PUBLIC_SERVER_PROTOCOL=http
NEXT_PUBLIC_SERVER_HOST=localhost
NEXT_PUBLIC_SERVER_PORT=4001
```
