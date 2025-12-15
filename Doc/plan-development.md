# 📱 Roda Biru – Plan Development

Dokumen ini berisi rencana pengembangan (plan-development) aplikasi **Roda Biru** dari sisi **mobile frontend** dan **backend API**.  
Tujuannya supaya progress bisa dipantau jelas dan setiap fase bisa diuji dengan cepat.

---

## 🎯 Tujuan

- Melacak progres implementasi fitur sesuai catatan di `Doc/Notes.txt`.
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
