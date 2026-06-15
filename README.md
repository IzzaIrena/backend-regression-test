# 🍽️ FoodiesHub Backend API

REST API untuk aplikasi FoodiesHub — platform berbagi resep makanan menggunakan **Node.js, Express.js, Sequelize, dan MySQL**.

---

## 🚀 Cara Menjalankan Project

### 1. Clone repository

```bash
git clone https://github.com/IzzaIrena/backend-regression-test.git
cd foodieshub/backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment

```bash
cp .env.example .env
```

Isi file `.env`:

```env
DB_NAME=foodies
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
```

---

### 4. Jalankan server

```bash
npm start
```

Server akan berjalan di:

```
http://localhost:3000
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

## 📊 Output Test (Aktual)

```
Test Suites: 2 passed, 2 total
Tests:       86 passed, 86 total
Snapshots:   0 total
Time:        4.54 s
```

---

## 📊 Output Coverage (Aktual)

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
---

## 🔴 Regression Testing Demonstration (Login API)

Regression testing dilakukan untuk memastikan perubahan kode tidak merusak fitur yang sudah berjalan.

---

### 1. Kondisi awal (kode benar)

Semua test login berhasil:

```
Tests: 10 passed, 10 total
```

Contoh validasi yang benar:

```js
if (!user) {
  return res.status(400).json({
    error: "Email tidak ditemukan",
  });
}
```

---

### 2. Simulasi bug

Kode diubah:

```js
if (!user) {
  return res.status(200).json({
    error: "Email tidak ditemukan",
  });
}
```

---

### 3. Hasil test setelah bug

```
FAIL  tests/regression.login.test.js

● should fail login with non-existent user

Expected: 200
Received: 400 / 404
```

---

### 4. Analisis hasil

* Status code yang seharusnya konsisten menjadi **400**
* Perubahan menjadi `200` (atau tidak sesuai expected flow) menyebabkan **test gagal**
* Regression test berhasil mendeteksi error pada logic autentikasi

---

### 5. Kesimpulan regression testing

Regression testing terbukti efektif untuk:

* Mendeteksi perubahan status response API
* Menjaga konsistensi login behavior
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

---

## 📌 Catatan Penting

* Jika `.env` tidak dibuat, sistem akan memakai default config di `database.js`
* MySQL harus sudah berjalan sebelum server dijalankan
* Coverage saat ini menunjukkan:

  * Branch coverage masih perlu ditingkatkan (55%)
  * Routes dan profile masih area paling lemah

---
