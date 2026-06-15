const { app, connectDB } = require("./server");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
  });
});