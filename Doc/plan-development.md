# 📱 Roda Biru – Plan Development

Dokumen ini berisi rencana pengembangan (plan-development) aplikasi **Roda Biru** dari sisi **mobile frontend** dan **backend API**.  
Tujuannya supaya progress bisa dipantau jelas dan setiap fase bisa diuji dengan cepat.

---

## 🎯 Tujuan

- Melacak progres implementasi fitur sesuai catatan di `Doc/Notes.md`.
- Memecah pengembangan frontend & backend ke fase kecil, terukur, dan mudah diuji.
- Menjamin kebutuhan utama Rumah Makan Roda Biru:
  - Pencatatan transaksi harian yang simple dan cepat.
  - Ringkasan kas dan laporan harian/bulanan yang mudah dibaca pemilik.
  - Bisa dipakai karyawan tanpa harus paham akuntansi rumit.

---

## 🔧 Stack & Arsitektur Singkat

### Frontend (Mobile)

- **React Native + Expo**
- **UI**: React Native Paper / NativeWind (Tailwind RN)
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: Zustand atau React Context + Reducer
- **Data Fetching**: Axios / React Query
- **Storage Lokal**:
  - `AsyncStorage` untuk:
    - token user (auth),
    - settings usaha,
    - draft transaksi / cache ringan.

### Backend API

- **Laravel** + **MySQL**
- **Autentikasi**: Laravel Sanctum / token-based (untuk mobile)
- **Modul utama**:
  - Users (admin / karyawan)
  - Categories (jenis transaksi)
  - Transactions
  - Reports (harian / bulanan)

---

## 🧭 Roadmap Tahap Frontend

### ✅ v0.1 – Prototype UI dasar  
**Status:** Selesai (14 Des 2025)

- Screen:
  - `DashboardScreen`
  - `TransactionListScreen`
- Fitur:
  - Ringkasan kas (dummy).
  - Daftar transaksi statis (dummy).
  - Bottom tabs: Dashboard, Transaksi, Laporan, Settings.
- Tujuan:
  - Eksplor alur & layout.
  - Jadi acuan desain untuk fase berikutnya.

---

### ✅ v0.2 – Form transaksi + validasi (state lokal/mock)  
**Status:** Selesai (14 Des 2025)

- Screen:
  - `TransactionFormScreen` (add/edit).
- Fitur:
  - Input:
    - tanggal
    - kategori
    - tipe (masuk / keluar)
    - nominal
    - keterangan
  - Validasi dasar:
    - tanggal wajib
    - tipe wajib
    - nominal > 0
  - Data:
    - Transaksi disimpan ke state lokal (array / store).
    - Dashboard & list transaksi ikut update.
- Tujuan:
  - Mengunci struktur data transaksi yang nanti akan sama dengan API.
  - Menguji flow “input transaksi → langsung kelihatan di ringkasan”.

---

### ⬜ v0.3 – Prototype UI: Settings Aplikasi

**Target:**
- Bangun `SettingsScreen` yang menampung identitas & preferensi app.

**Fitur detail:**
- Form pengaturan:
  - Nama usaha (mis. “Rumah Makan Roda Biru”)
  - Alamat singkat
  - Logo usaha (upload/choose from gallery → simpan di lokal)
  - Mata uang (default IDR)
  - Format tanggal (DD/MM/YYYY atau YYYY-MM-DD)
  - Awal minggu (Senin / Minggu)
- Teknis:
  - Simpan semua ke `AsyncStorage` (mis. key `rb_settings`).
  - Sediakan `useSettingsStore()`:
    - menyimpan state settings,
    - dipakai oleh Dashboard, Transaksi, dan Laporan.

**Definition of Done:**
- Perubahan di Settings langsung mempengaruhi:
  - nama usaha & logo di Dashboard,
  - format tanggal di list transaksi & laporan.

---

### ⬜ v0.4 – Tab Laporan Ringkas (Harian/Bulanan)

**Target:**
- Membuat `ReportScreen` yang menampilkan ringkasan transaksi.

**Fitur detail:**
- Tab:
  - **Harian**:
    - pilih satu tanggal → tampil total pemasukan, pengeluaran, dan net.
  - **Bulanan**:
    - pilih bulan & tahun → ringkasan per bulan.
- Filter:
  - range tanggal (untuk mode custom)
  - kategori: Semua / Penjualan / Pembelian / Operasional / lain-lain
- Tampilan:
  - Ringkasan angka:
    - Total pemasukan
    - Total pengeluaran
    - Saldo (pemasukan – pengeluaran)
  - Daftar transaksi sesuai filter.
  - (Opsional) grafik sederhana:
    - bar chart pemasukan vs pengeluaran per hari / per kategori.
- Data:
  - Masih gunakan data dari store lokal (sama dengan modul Transaksi).
  - Helper util:
    - `groupByDate(transactions)`
    - `groupByMonth(transactions)`

**Definition of Done:**
- Pemilik bisa melihat rekap harian dan bulanan dari transaksi yang sudah diinput, walaupun belum tersambung backend.

---

### ⬜ v0.5 – Auth & Role Switch (Admin / Karyawan)

**Target:**
- Menambahkan alur login dan perbedaan tampilan berdasarkan role.

**Fitur detail:**
- Screen:
  - `LoginScreen`
  - (opsional) `ProfileScreen` / info user.
- Role:
  - **Admin**:
    - akses penuh: Dashboard, Transaksi, Laporan, Settings, master data.
  - **Karyawan**:
    - fokus di input transaksi harian,
    - akses laporan ringkas terbatas (mis. hanya hari ini).
- Teknis:
  - `authStore`:
    - `user` (id, name, role),
    - `token`,
    - `login()`, `logout()`.
  - `AuthGuard` pada navigasi:
    - kalau belum login → paksa ke Login.
    - navigasi & menu bottom tab disesuaikan role.

**Definition of Done:**
- User harus login sebelum masuk aplikasi utama.
- Role mempengaruhi menu / aksi yang tersedia.

---

### ⬜ v0.6 – Integrasi API & Handling Loading/Error

**Target:**
- Mengganti mock/local store jadi data sungguhan dari Laravel API.

**Fitur detail:**
- Setup `axios` instance:
  - `baseURL` dari `.env` Expo (`EXPO_PUBLIC_API_URL`).
  - interceptor:
    - inject `Authorization: Bearer <token>` jika ada.
    - handle 401 → auto logout / redirect ke Login.
- Endpoint yang dipakai di app:
  - Auth:
    - `POST /api/v1/login`
  - Kategori:
    - `GET /api/v1/categories`
  - Transaksi:
    - `GET /api/v1/transactions?from=&to=&category=&type=`
    - `POST /api/v1/transactions`
    - `PUT /api/v1/transactions/{id}`
    - `DELETE /api/v1/transactions/{id}`
  - Laporan:
    - `GET /api/v1/reports/daily?date=YYYY-MM-DD`
    - `GET /api/v1/reports/monthly?month=YYYY-MM`
- UI/UX:
  - Loading state di setiap screen (spinner / skeleton).
  - Error message yang jelas (“Gagal memuat transaksi, cek koneksi lalu coba lagi.”).
  - Refetch otomatis setelah transaksi berhasil dibuat/diupdate/dihapus.

**Definition of Done:**
- Data di app mobile sepenuhnya berasal dari API Laravel.
- Create/update/delete transaksi tercermin di laporan & dashboard.

---

## 🗄️ Tahap Backend (Ringkas Tapi Jelas)

### ⬜ Setup Laravel API + Schema users/categories/transactions

- Buat project Laravel API (atau modul khusus API).
- Definisikan schema:

**Tabel `users`**
- `id`
- `name`
- `email`
- `password`
- `role` (`admin` / `karyawan`)
- timestamps

**Tabel `categories`**
- `id`
- `name`
- `type` (`income` / `expense`)
- `description` (nullable)
- timestamps

**Tabel `transactions`**
- `id`
- `user_id`
- `category_id`
- `date` (date)
- `type` (`income` / `expense`)
- `amount` (decimal)
- `note` (nullable)
- timestamps

---

### ⬜ Endpoint CRUD + Laporan Harian/Bulanan

**Auth**
- `POST /api/v1/login` → return token + user info (id, name, role).
- `POST /api/v1/logout` (opsional).

**Kategori**
- `GET /api/v1/categories`
- `POST /api/v1/categories`
- `PUT /api/v1/categories/{id}`
- `DELETE /api/v1/categories/{id}`

**Transaksi**
- `GET /api/v1/transactions`
  - Query:
    - `from`, `to`
    - `category_id`
    - `type` (`income` / `expense`)
- `POST /api/v1/transactions`
- `PUT /api/v1/transactions/{id}`
- `DELETE /api/v1/transactions/{id}`

**Laporan**
- `GET /api/v1/reports/daily?date=YYYY-MM-DD`
  - Return:
    - `total_income`
    - `total_expense`
    - `net`
    - list transaksi pada tanggal tersebut.
- `GET /api/v1/reports/monthly?month=YYYY-MM`
  - Return:
    - `total_income`
    - `total_expense`
    - `net`
    - ringkasan per hari atau per kategori (opsional).

---

### ⬜ Proteksi JWT/Sanctum + RBAC admin/karyawan

- Gunakan **Laravel Sanctum** untuk autentikasi token mobile.
- Middleware:
  - `auth:sanctum` untuk semua route /api/v1 kecuali login.
  - Middleware custom `role:admin` untuk:
    - CRUD kategori,
    - endpoint pengaturan tertentu.
- Pastikan response error konsisten:
  ```json
  {
    "message": "Validation failed",
    "errors": {
      "field": ["Error message"]
    }
  }

---

## Progres Implementasi (Mid Des 2025)

- ✅ v0.1 Prototype dashboard + transaksi statis.
- ✅ v0.2 Form transaksi lokal + validasi (context).
- ✅ v0.3 Settings:
  - Store `useSettings` (AsyncStorage) untuk nama usaha, alamat, format tanggal, mata uang, minggu mulai, logo placeholder.
  - Settings screen modular (identity, preferences, status, auth info).
  - Integrasi ke Dashboard (nama usaha, tanggal preferensi).
  - Integrasi ke Transaksi (format tanggal + mata uang pada header/list/summary/cashflow).
- ✅ v0.4 Laporan lokal:
  - Tab Reports dengan ringkasan harian/bulanan, komponen reusable (`PeriodSwitcher`, `StatTile`, `DateSummaryList`).
  - Data dari store lokal + format dari Settings.
- ✅ v0.5 Auth & Role demo:
  - `useAuth` (AsyncStorage) dengan user demo admin/karyawan.
  - `AuthGate` + screen `login`; tabs role-based (Settings hanya admin); guard Settings non-admin.

---

## Rencana Dekat (Next 1-2 Minggu)

- Frontend:
  - Tambah picker logo (expo-image-picker) + persist uri di settings.
  - Date/month picker di Reports + filter kategori/tipe; batasi laporan karyawan ke hari ini.
  - Role-based aksi (karyawan tidak bisa delete transaksi).
  - Siapkan kontrak OpenAPI/JSON schema untuk auth/kategori/transaksi/laporan.
- Backend:
  - Bootstrap Laravel API + migrate + seed (admin/karyawan demo, kategori dasar).
  - Implement auth Sanctum + endpoint kategori/transaksi/laporan dengan validasi/pagination.
  - Sediakan `.env.example` dan base URL untuk Expo (`EXPO_PUBLIC_API_URL`).

## Catatan Testing

- Lint berjalan: `npm run lint`.
- Berikutnya: unit test helper format & summary; RNTL untuk guard login; Detox/E2E untuk flow login -> transaksi -> laporan.

---

## Tahap Lanjutan Frontend (v0.7+)

### v0.7 - Offline-ready + Antrian Sync

**Target:**
- Form transaksi tetap berfungsi tanpa koneksi dan tersinkron ketika online.

**Fitur detail:**
- Simpan transaksi draft ke `AsyncStorage` + flag `pending_sync`.
- Background sync (AppState change atau interval) kirim transaksi tertunda ke API.
- Penanda status di UI: `tersimpan offline`, `menunggu sync`, `gagal sync`.
- Resolusi konflik sederhana: prioritas data server, tampilkan toast jika ada penyesuaian.

**Definition of Done:**
- Koneksi dimatikan -> input transaksi tetap tersimpan lokal.
- Begitu online, transaksi otomatis terkirim dan muncul di list/report.

---

### v0.8 - Export/Share Laporan

**Target:**
- Pemilik bisa ekspor laporan harian/bulanan ke PDF/CSV dan share via WhatsApp/Email.

**Fitur detail:**
- Tombol `Export` di tab Laporan (daily/monthly).
- Gunakan library RN PDF/Print (expo-print) untuk generate PDF sederhana.
- Template PDF: header usaha (logo, nama), periode, ringkasan angka, tabel transaksi.
- Opsi `Share` menggunakan `expo-sharing`.

**Definition of Done:**
- File PDF/CSV tersimpan lokal dan bisa dibagikan ke aplikasi lain.
- Format tanggal & currency mengikuti settings.

---

### v0.9 - Multi-Outlet & Shift Closing

**Target:**
- Mendukung beberapa outlet dan tutup shift harian.

**Fitur detail:**
- Data tambahan: `outlet_id`, `shift` (pagi/sore/malam) pada transaksi.
- Screen `Switch Outlet` + filter outlet di laporan.
- Shift closing: rekap pemasukan/pengeluaran per shift + tanda tangan digital sederhana.

**Definition of Done:**
- Transaksi, laporan, dan export dapat difilter per outlet/shift.
- Tutup shift menghasilkan ringkasan yang bisa diunduh/share.

---

## Tahap Backend Lanjutan

### v0.7 - Seed Data, Validasi, Konsistensi

- Seeder: admin default, karyawan contoh, kategori dasar (Penjualan, Bahan Baku, Operasional, Lainnya).
- Request validation untuk semua endpoint (email unik, amount > 0, date format YYYY-MM-DD).
- Pastikan `transactions` memakai DB transaction ketika create/update untuk menjaga konsistensi saldo (jika ada kolom agregat).
- Tambah index: `transactions(date)`, `transactions(category_id)`, `transactions(type)` untuk laporan.

**DoD:** `php artisan migrate --seed` menghasilkan data contoh siap dipakai mobile.

---

### v0.8 - Laporan & Query Optimasi

- Endpoint laporan gunakan agregasi SQL langsung (SUM by date/month) untuk efisiensi.
- Tambah cache ringan (mis. `cache()->remember` 5 menit) untuk laporan bulanan.
- Endpoint export backend (opsional) yang mengembalikan CSV siap unduh.
- Pastikan pagination & sorting di `/transactions` untuk menghindari payload besar.

**DoD:** Laporan harian/bulanan respons < 500ms dengan dataset 50k transaksi (uji lokal dengan faker seeder).

---

### v0.9 - Ops, Keamanan, Observability

- Rate limiting login & endpoint publik (Throttle middleware).
- Logging terstruktur (Monolog JSON) + channel khusus `api`.
- Healthcheck: `/api/health` (cek DB + cache).
- Backup jadwal DB (dokumentasikan skrip/cron).
- Monitoring sederhana: Laravel Horizon (jika pakai queue) atau Telescope di environment non-production.

**DoD:** Lingkungan staging siap dipantau, alarm basic untuk error 5xx dan latency.

---

## QA, Testing, & Release

- Frontend: jest/unit untuk util & store, React Native Testing Library untuk komponen form dan guard navigasi, Detox/EAS untuk e2e happy-path login -> tambah transaksi -> laporan.
- Backend: PHPUnit feature test untuk auth, kategori, transaksi, laporan; tes validasi error; tes RBAC admin/karyawan; seeder test menggunakan database in-memory.
- Contract/API: dokumentasikan OpenAPI sederhana; gunakan JSON schema di frontend untuk memastikan bentuk respons stabil.
- Pipeline: tambahkan GitHub Actions (lint + test frontend/backend), build apk preview (EAS) dan deploy API ke staging setiap merge ke `main`.
- Release checklist: bump versi app, update `.env.example`, jalankan `migrate --force`, seed kategori bila kosong, smoke test flow utama.

---

## Prioritas 1-2 Minggu Ke Depan

- Bangun `SettingsScreen` + `useSettingsStore` (v0.3) dan integrasikan ke Dashboard/List.
- Susun `ReportScreen` tab harian/bulanan berbasis store lokal (v0.4).
- Siapkan kerangka `authStore` + guard navigasi (v0.5) meski backend belum siap.
- Draft OpenAPI untuk endpoint login, kategori, transaksi, laporan; pakai sebagai kontrak dev backend/frontend.
- Mulai proyek Laravel (skeleton + migrate + seed dasar) agar siap dipakai saat integrasi v0.6.
