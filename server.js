const app = require("./src/config/express");
const connectMongoDB = require("./src/config/mongoose");

const PORT = 8080;

app.listen(PORT, () => {
  console.log(
    `server is listening on port ${PORT} \n http://localhost:${PORT}`
  );
  connectMongoDB();
});
