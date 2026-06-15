# 🍽️ FoodiesHub Backend API

REST API untuk aplikasi **FoodiesHub** — platform berbagi resep makanan menggunakan **Node.js, Express.js, Sequelize, dan MySQL**.

![CI](https://github.com/IzzaIrena/backend-regression-test/actions/workflows/test.yml/badge.svg)

---

## 🚀 Cara Menjalankan Project

### 1. Clone repository

```bash
git clone https://github.com/IzzaIrena/backend-regression-test.git
cd backend-regression-test/backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Buat file `.env` di folder backend, lalu isi seperti berikut:

```env
DB_NAME=foodies
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
PORT=5000
JWT_SECRET=your_secret_key
```

---

### 4. Jalankan server

```bash
npm start
```

Server akan berjalan di:

```bash
http://localhost:5000
```

---

## 🧪 Cara Menjalankan Test

### Jalankan semua test

```bash
npm test
```

### Jalankan test + coverage

```bash
npm run test:coverage
```

---

## 📊 Hasil Pengujian Test (Aktual)

```txt
Test Suites: 2 passed, 2 total
Tests:       85 passed, 85 total
Snapshots:   0 total
Time:        4.109 s
```

Semua test berhasil dijalankan tanpa error pada local environment maupun GitHub Actions.

---

## 📊 Hasil Code Coverage (GitHub Actions CI)

```
---------------------|---------|----------|---------|---------|---------------------------------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                           
---------------------|---------|----------|---------|---------|---------------------------------------------
All files            |   83.42 |    69.23 |   94.28 |   83.42 |                                             
 backend             |   97.29 |      100 |     100 |   97.29 |                                             
  server.js          |   97.29 |      100 |     100 |   97.29 | 92                                          
 backend/config      |     100 |       50 |     100 |     100 |                                             
  database.js        |     100 |       50 |     100 |     100 | 4-10                                        
 backend/middlewares |      96 |      100 |     100 |      96 |                                             
  uploadProfile.js   |     100 |      100 |     100 |     100 |                                             
  verifyToken.js     |   91.66 |      100 |     100 |   91.66 | 34                                          
 backend/models      |     100 |      100 |     100 |     100 |                                             
  Recipe.js          |     100 |      100 |     100 |     100 |                                             
  Review.js          |     100 |      100 |     100 |     100 |                                             
  SavedRecipe.js     |     100 |      100 |     100 |     100 |                                             
  User.js            |     100 |      100 |     100 |     100 |                                             
  index.js           |     100 |      100 |     100 |     100 |                                             
 backend/routes      |    78.3 |    70.12 |    93.1 |    78.3 |                                             
  SavedRecipes.js    |      75 |       50 |      80 |      75 | 26-28,41,74,107,112,142-149                 
  auth.js            |   87.17 |    78.57 |     100 |   87.17 | 36,86-95,177                                
  follow.js          |   76.74 |     87.5 |     100 |   76.74 | 100-102,168-188,232-234,270-271,305-306     
  profile.js         |    73.8 |       60 |     100 |    73.8 | 49,73,90,124-160                            
  recipe.js          |    81.6 |    69.23 |     100 |    81.6 | 166-168,208-228,258-260,360-366,381,468-470 
  review.js          |      68 |       50 |   66.66 |      68 | 45,77,94-132                                
---------------------|---------|----------|---------|---------|---------------------------------------------
```

Target minimal coverage tugas (**75%**) telah berhasil tercapai pada kategori **Statements** dan **Lines**.

---

## 🔴 Demonstrasi Regression Testing (Login API)

Regression testing dilakukan untuk memastikan perubahan kode tidak merusak fitur yang sudah berjalan.

### 1. Kondisi Awal (Kode Benar)

Semua test login berhasil dijalankan:

```txt
PASS tests/regression.login.test.js
```

Contoh validasi login yang benar:

```js
if (!user) {
  return res.status(400).json({
    error: "Email tidak ditemukan",
  });
}
```

---

### 2. Simulasi Bug (Regression)

Kode sengaja diubah:

```js
if (!user) {
  return res.status(200).json({
    error: "Email tidak ditemukan",
  });
}
```

---

### 3. Hasil Test Setelah Bug

```txt
FAIL tests/regression.login.test.js

Expected: 400
Received: 200
```

---

### 4. Analisis Hasil

Regression test berhasil mendeteksi perubahan perilaku API yang tidak sesuai.

* Status code seharusnya **400**
* Setelah kode diubah menjadi **200**, test langsung gagal
* Hal ini membuktikan bahwa regression test mampu mendeteksi bug akibat perubahan kode yang tidak disengaja

---

### 5. Kesimpulan Regression Testing

Regression testing terbukti efektif untuk:

* Mendeteksi perubahan status response API
* Menjaga konsistensi behavior endpoint
* Mencegah bug masuk ke production

---

## 🔐 Environment Variables

| Variable    | Deskripsi           |
| ----------- | ------------------- |
| DB_NAME     | Nama database MySQL |
| DB_USER     | Username database   |
| DB_PASSWORD | Password database   |
| DB_HOST     | Host database       |
| DB_PORT     | Port database       |
| PORT        | Port backend        |
| JWT_SECRET  | Secret key JWT      |

---

## ⚙️ Continuous Integration (CI)

Project ini telah terintegrasi dengan **GitHub Actions** untuk menjalankan test secara otomatis pada setiap:

* `push`
* `pull request`

Pipeline CI menjalankan:

* Unit & Regression Test menggunakan **Jest + SuperTest**
* Code Coverage Report
* Validasi kestabilan backend

---

## 📌 Catatan Penting

* MySQL harus berjalan sebelum backend dijalankan
* Pastikan database `foodies` sudah dibuat
* Jalankan test menggunakan environment database yang sesuai
* Coverage backend telah melampaui target minimal tugas (≥75%)
