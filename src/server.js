require("dotenv").config();
const app = require(".");
const { connectDb } = require("./config/db");
const { createSuperAdmin } = require("./helpers/createSuperAdmin");

const PORT = process.env.PORT || 5555;
app.listen(PORT, async () => {
  await connectDb();
  await createSuperAdmin();
  console.log("app is listening on PORT : ", PORT);
});
