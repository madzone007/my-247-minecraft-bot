// keep_alive.js
const express = require("express");
const app = express();
const port = 3000; // MUST be 3000 to match your replit.toml

app.get("/", (req, res) => {
  res.send("Minecraft Bot is alive and ready for Aternos!");
  console.log("Ping received at:", new Date().toLocaleTimeString()); // Optional: Log pings
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Keep-alive webserver running on port ${port}`);
});

// Handle server errors gracefully
server.on("error", (err) => {
  console.log("Web server error:", err.message);
});
