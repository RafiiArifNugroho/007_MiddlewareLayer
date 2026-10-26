# 007_MiddlewareLayer

Implementasi Middleware Layer pada RESTful API menggunakan Express.js, PostgreSQL, dan validasi skema Joi untuk mata kuliah Pemrograman Web Service (PWS).

---

## 📌 Deskripsi Proyek

Proyek ini mendemonstrasikan implementasi komprehensif dari berbagai lapisan middleware (*Middleware Layer*) pada aplikasi backend Node.js / Express.js. Melalui penerapan middleware, request yang masuk diproses secara berurutan mulai dari parsing data, pencatatan log (logging), validasi data input, penanganan rute, hingga pengelolaan galat (*global error handling*) dan standarisasi format respon (*response envelope*).

---

## 🚀 Fitur & Lapisan Middleware

Aplikasi ini mengimplementasikan lapisan middleware sebagai berikut:

1. **Built-in Parser Middleware**:
   - `express.json()`: Melakukan parsing payload request berformat JSON.
   - `express.urlencoded({ extended: true })`: Melakukan parsing payload request berformat URL-encoded.

2. **Custom Logging Middleware**:
   - Menghitung waktu respon dan durasi eksekusi request dalam milidetik (`ms`).
   - Mencatat metadata request ke konsol: `method`, `url`, `status`, dan `duration`.

3. **Response Envelope Standardization**:
   - Standarisasi format respon API untuk respon berhasil (`successResponse`) dan respon gagal (`errorResponse`).
   - Struktur JSON seragam: `success`, `message`, `data`, dan `error`.

4. **Input Validation Middleware (Joi)**:
   - `validateBody(schema)`: Memvalidasi body request terhadap skema Joi dengan opsi `abortEarly: false` agar seluruh kesalahan input dapat ditampilkan secara detail.
   - `validateParams(schema)`: Memvalidasi parameter URL (misalnya `:id`) agar berupa angka positif.

5. **404 Route Not Found Middleware**:
   - Menangani seluruh request yang mengakses endpoint atau route yang tidak terdaftar.
   - Mengembalikan status HTTP 404 beserta pesan error terstandarisasi.

6. **Global Error Handler Middleware**:
   - Menangkap seluruh kesalahan internal server (*unhandled exceptions*).
   - Memastikan server tidak mengalami *crash* dan mengembalikan status HTTP 500 dengan format respon seragam.

---

## 🗄️ Skema Database

Aplikasi menggunakan database **PostgreSQL** dengan nama database `mahasiswa`.

```sql
CREATE DATABASE mahasiswa;

\c mahasiswa;

CREATE TABLE biodata (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    nim VARCHAR(20) NOT NULL,
    kelas VARCHAR(20) NOT NULL
);
```

---

## 📡 Daftar Endpoint API

| Metode | Endpoint | Deskripsi | Middleware Validasi |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Mengambil seluruh data biodata | - |
| `POST` | `/biodata` | Menambahkan biodata mahasiswa baru | `validateBody(biodataSchema)` |
| `PUT` | `/biodata/:id` | Memperbarui biodata berdasarkan ID | `validateParams(idSchema)`, `validateBody(...)` |
| `DELETE` | `/biodata/:id` | Menghapus biodata berdasarkan ID | `validateParams(idSchema)` |

---

## 📦 Format Respon Standar (Response Envelope)

### 1. Respon Sukses (200 / 201)
```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": [
    {
      "id": 1,
      "nama": "Rafii Arif Nugroho",
      "nim": "220101001",
      "kelas": "TI-5A"
    }
  ],
  "error": null
}
```

### 2. Respon Gagal / Validasi Error (400)
```json
{
  "success": false,
  "message": "Validasi input gagal",
  "data": null,
  "error": [
    {
      "field": "nama",
      "message": "\"nama\" is required"
    }
  ]
}
```

### 3. Respon Rute Tidak Ditemukan (404)
```json
{
  "success": false,
  "message": "Endpoint tidak ditemukan",
  "data": null,
  "error": null
}
```

---

## 🛠️ Instalasi & Menjalankan Proyek

### 1. Clone Repositori
```bash
git clone https://github.com/RafiiArifNugroho/007_MiddlewareLayer.git
cd 007_MiddlewareLayer
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment
Salin berkas `.env.example` ke `.env` dan sesuaikan kredensial PostgreSQL Anda:
```bash
cp .env.example .env
```

### 4. Menjalankan Server
Mode Standar:
```bash
npm start
```

Mode Pengembangan (Auto-reload / watch mode):
```bash
npm run dev
```

Server akan aktif dan berjalan di `http://localhost:3000`.

---

## 👤 Author

- **Nama**: Rafii Arif Nugroho
- **GitHub**: [@RafiiArifNugroho](https://github.com/RafiiArifNugroho)
