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
---------------------|---------|----------|---------|---------|------------------------------------------------------      
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                          
---------------------|---------|----------|---------|---------|------------------------------------------------------
All files            |   47.41 |     7.59 |   27.02 |   47.41 |                                                      
 backend             |   86.84 |        0 |      50 |   86.84 |                                                            
  server.js          |   86.84 |        0 |      50 |   86.84 | 72,87-95                                                   
 backend/config      |     100 |      100 |     100 |     100 |                                                            
  database.js        |     100 |      100 |     100 |     100 |                                                            
 backend/middlewares |      48 |       25 |      25 |      48 |                                                            
  uploadProfile.js   |   46.15 |        0 |       0 |   46.15 | 7-16,23-32                                                 
  verifyToken.js     |      50 |       50 |     100 |      50 | 16-34                                                      
 backend/models      |     100 |      100 |     100 |     100 |                                                            
  Recipe.js          |     100 |      100 |     100 |     100 |                                                            
  Review.js          |     100 |      100 |     100 |     100 |                                                            
  SavedRecipe.js     |     100 |      100 |     100 |     100 |                                                            
  User.js            |     100 |      100 |     100 |     100 |                                                            
  index.js           |     100 |      100 |     100 |     100 |                                                            
 backend/routes      |   35.18 |     6.84 |   24.13 |   35.18 |                                                            
  SavedRecipes.js    |   38.88 |        0 |      20 |   38.88 | 25-41,59-74,85-112,124-149                                 
  auth.js            |   43.58 |    21.42 |      50 |   43.58 | 31-95,140-177                                              
  follow.js          |   21.95 |        0 |       0 |   21.95 | 16-102,121-220,233-257,268-292                             
  profile.js         |   35.71 |       10 |   33.33 |   35.71 | 36-49,58-90,102-160                                        
  recipe.js          |   28.73 |     2.56 |   16.66 |   28.73 | 26-31,62-131,170-172,212-232,244-264,289-417,433-474       
  review.js          |      60 |        0 |   66.66 |      60 | 45,76-132                                                  
---------------------|---------|----------|---------|---------|------------------------------------------------------ 

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
