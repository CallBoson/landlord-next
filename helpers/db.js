import mysql from "mysql2/promise";

// 创建一个MySQL连接配置
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "84873231a",
  database: "landlord",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "+08:00",
});

export default connection;
