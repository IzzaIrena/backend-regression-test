const { app, db } = require("./server");

const PORT = process.env.PORT || 5000;

db.sync()
  .then(() => {
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server jalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB Sync Error:", err);
  });