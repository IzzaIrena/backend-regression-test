const { connectDB } = require("../server");

beforeAll(async () => {
  await connectDB();
});