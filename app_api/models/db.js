const mongoose = require("mongoose");
const dbURI = process.env.DATABASE_URI;

mongoose.connect(dbURI);
mongoose.connection.on("connected", () => {
  console.log("Veritabanına bağlanıldı!\n");
});

mongoose.connection.on("error", () => {
  console.log("Bağlantı hatası!\n");
});

mongoose.connection.on("disconnected", () => {
  console.log("Bağlantı kesildi!\n");
});

process.on("SIGINT", () => {
  mongoose.connection.close();
  console.log("Bağlantı kapatıldı!");
  process.exit(0);
});
