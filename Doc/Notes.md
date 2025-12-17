# 📱 Roda Biru – Mobile Bookkeeping App

Aplikasi pencatatan keuangan sederhana untuk Rumah Makan Roda Biru.  
Fokus pada **pencatatan transaksi harian**, **ringkasan kas**, dan **laporan harian/bulanan** yang mudah dipahami pemilik usaha.

---

## 🎯 Tujuan

- Melacak progres implementasi fitur sesuai catatan di `Doc/Notes.txt`.
- Memecah pengembangan **frontend mobile** dan **backend API** ke fase kecil yang bisa diuji cepat.
- Menyediakan alur pembukuan yang ramah untuk UMKM (tidak perlu paham akuntansi rumit).

---

## 🌱 Tech Stack

### Frontend (Mobile)
- **React Native + Expo**
- **TypeScript** (atau JavaScript, tergantung konfigurasi project)
- **UI**: React Native Paper / NativeWind (Tailwind RN)
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: Zustand / React Context + Reducer
- **Data Fetching**: Axios / React Query
- **Storage Lokal**:
  - `AsyncStorage` (settings, token, draft transaksi)
  - (Opsional) SQLite untuk cache & offline mode

### Backend API
- **Laravel** + **MySQL**
- Auth: **Laravel Sanctum** / token-based untuk mobile
- Modul:
  - Users (admin / karyawan)
  - Categories
  - Transactions
  - Reports (harian / bulanan)

---

## 🧭 Arsitektur Singkat

- Mobile app berkomunikasi dengan Laravel API melalui endpoint:
  - `/api/v1/login`
  - `/api/v1/categories`
  - `/api/v1/transactions`
  - `/api/v1/reports/*`
- Data utama:
  - **Transaksi**: tanggal, kategori, tipe (masuk/keluar), nominal, catatan
  - **Laporan**: rekap pemasukan, pengeluaran, dan saldo bersih

---

## 🚀 Roadmap Frontend (Mobile)

### ✅ v0.1 – Prototype UI (Dashboard & Transaksi statis)
- Screen:
  - `DashboardScreen`
  - `TransactionListScreen`
- Fitur:
  - Ringkasan kas (dummy).
  - Daftar transaksi statis (hardcoded).
  - Bottom Tab: Dashboard, Transaksi, Laporan, Settings.
- Tujuan:
  - Eksplor layout & alur utama aplikasi.

---

### ✅ v0.2 – Form Transaksi + Validasi (state lokal/mock)
- Screen:
  - `TransactionFormScreen` (tambah/edit).
- Fitur:
  - Input: tanggal, kategori, tipe (masuk/keluar), nominal, keterangan.
  - Validasi:
    - tanggal wajib
    - tipe wajib
    - nominal > 0
  - State:
    - Transaksi disimpan di state lokal (Zustand/Context).
    - Dashboard update ringkasan sesuai transaksi.
- Tujuan:
  - Mengunci struktur data transaksi yang nanti akan sama dengan API.

---

### ⬜ v0.3 – Settings Aplikasi
- Screen: `SettingsScreen`.
- Pengaturan:
  - Nama usaha (mis. *Rumah Makan Roda Biru*)
  - Alamat singkat
  - Logo usaha (ambil dari gallery, simpan lokal)
  - Mata uang (default: IDR)
  - Preferensi:
    - Format tanggal (DD/MM/YYYY atau YYYY-MM-DD)
    - Awal minggu (Senin/Minggu)
- Teknis:
  - Simpan di `AsyncStorage` (`settings_store`).
  - Gunakan `useSettingsStore()` untuk share ke:
    - Dashboard
    - Transaksi
    - Laporan (format tanggal & currency)

**DoD:**
- Perubahan Settings langsung tercermin di UI (judul, logo, format tanggal).

---

### ⬜ v0.4 – Tab Laporan Ringkas (Harian/Bulanan)
- Screen: `ReportScreen` dengan tab:
  - Harian
  - Bulanan
- Fitur:
  - Filter tanggal:
    - Harian: pilih tanggal
    - Bulanan: pilih bulan & tahun
  - Filter kategori: Semua / Penjualan / Pembelian / Operasional
  - Ringkasan:
    - Total pemasukan
    - Total pengeluaran
    - Saldo (net)
  - Daftar transaksi sesuai filter.
  - (Opsional) grafik sederhana pemasukan vs pengeluaran per hari/bulan.
- Teknis:
  - Gunakan data yang sama dengan modul Transaksi (masih lokal bila API belum siap).
  - Helper:
    - `groupTransactionsByDay()`
    - `groupTransactionsByMonth()`

**DoD:**
- Owner bisa lihat ringkasan harian/bulanan dari transaksi yang sudah diinput, tanpa backend.

---

### ⬜ v0.5 – Auth & Role (Admin/Karyawan)
- Screen:
  - `LoginScreen`
  - (Opsional) `ProfileScreen`
- Role:
  - **Admin**:
    - Akses penuh: Dashboard, Transaksi, Laporan, Settings.
  - **Karyawan**:
    - Fokus pada input transaksi harian + view sederhana.
- Fitur:
  - Login dengan email/password.
  - Simpan token & role di `AsyncStorage` dan `authStore`.
  - Guard navigasi:
    - Jika belum login → redirect ke `LoginScreen`.
    - Sembunyikan menu yang tidak sesuai role.

**DoD:**
- Alur login/logout berfungsi.
- UI menyesuaikan role user.

---

### ⬜ v0.6 – Integrasi API (Login, Transaksi, Kategori)
- Gunakan **Axios instance**:
  - `baseURL` dari `.env` Expo.
  - Interceptor untuk `Authorization: Bearer <token>`.
- Endpoint yang dipakai:
  - `POST /api/v1/login`
  - `GET /api/v1/categories`
  - `GET /api/v1/transactions?from=&to=&category=`
  - `POST /api/v1/transactions`
  - `PUT /api/v1/transactions/{id}`
  - `DELETE /api/v1/transactions/{id}`
  - `GET /api/v1/reports/daily`
  - `GET /api/v1/reports/monthly`
- UX:
  - Loading state (spinner / skeleton).
  - Error state (toast/badge per screen).
  - Refetch data setelah create/edit/delete transaksi.

**DoD:**
- Semua transaksi dan laporan di app sudah sinkron dengan backend Laravel.

---

## 🗄️ Tahap Backend (Laravel API)

### ⬜ 1. Schema Database

**Tabel `users`**
- `id`
- `name`
- `email`
- `password`
- `role` (`admin` / `karyawan`)
- timestamps

**Tabel `user_access`**
- `user_id`
- `transaction_id`

**Tabel `categories`**
- `id`
- `name` (contoh: Penjualan, Bahan Baku, Operasional)
- `type` ( e`)
- `description` (nullable)
- timestamps

**Tabel `transactions`**
- `id`
- `user_id` (input oleh siapa)
- `category_id`
- `date` (date)
- `type` (`income` | `expense`)
- `amount` (decimal)
- `note` (nullable)
- timestamps

**Tabel ``** (need adjustmennt for better data handle)


---

### ⬜ 2. Endpoint Utama

**Auth**
- `POST /api/v1/login`
- `POST /api/v1/logout` (opsional)

**Kategori**
- `GET /api/v1/categories`
- `POST /api/v1/categories`
- `PUT /api/v1/categories/{id}`
- `DELETE /api/v1/categories/{id}`
- `GET /api/v1/categories/{id}/shorting` (base on backend)

**Transaksi**
- `GET /api/v1/transactions`
  - Query param:
    - `from`, `to`
    - `category_id`
    - `type`
- `POST /api/v1/transactions`
- `PUT /api/v1/transactions/{id}`
- `DELETE /api/v1/transactions/{id}`
- `GET /api/v1/transactions/{id}/Export`
- `GET /api/v1/shorting/transactions/{id}` (base what implemented on backend)
- `GET /api/v1/transactions/{id}/Export`


**Laporan**
- `GET /api/v1/reports/daily?date=YYYY-MM-DD`
- `GET /api/v1/reports/monthly?month=YYYY-MM`
  - Response:
    - `total_income`
    - `total_expense`
    - `net`
    - grouping per hari atau per kategori (opsional).

---

### ⬜ 3. Security & Role

- Gunakan middleware:
  - `auth:sanctum` untuk semua endpoint kecuali login.
  - `role:admin` untuk endpoint admin (kategori CRUD, pengaturan, dll).
- Format error JSON konsisten:
  ```json
  {
    "message": "Validation failed",
    "errors": {
      "email": ["Email is required"]
    }
  }

### ⬜ 4. Notifiable and integrate with SMTP Mailler
- Devisasi notify transactions expanse