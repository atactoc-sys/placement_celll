const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

dotenv.config();

connectDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
