module.exports = {
  connection: process.env.DB_CONNECTION || "mysql",
  host: process.env.DB_HOST || `127.0.0.1`,
  port: process.env.DB_PORT || 3306,
  name: process.env.DB_NAME || "futue_india_pro_db",
  user: process.env.DB_USERNAME || "future_india_user",
  password: process.env.DB_PASSWORD || "123456",
};
