// 1. KEEP-AWAKE WEBSERVER - This must create a server on port 3000
require("./keep_alive");

// 2. LOAD MINEFLATER LIBRARY
const mineflayer = require("mineflayer");

// 3. YOUR JAVA SERVER DETAILS
const botOptions = {
  host: "whale.de.freemcserver.net",
  port: 40496,
  username: "madbot0.1",
  auth: "offline",
};

// 4. CREATE THE BOT
console.log(
  "Connecting to Java server at " + botOptions.host + ":" + botOptions.port,
);
const bot = mineflayer.createBot(botOptions);

// 5. ENHANCED EVENT HANDLING
bot.on("login", () => {
  console.log("Login successful! Server accepted our connection.");
});

bot.on("spawn", () => {
  console.log("Bot spawned in the world! It should be visible now.");
  bot.chat("Hello everyone! I am a bot from Replit!");

  // --- ANTI-AFK SYSTEM: START ---
  console.log("Starting anti-AFK system (Jump & Sneak).");

  let sneakState = false; // Tracks if we are sneaking or not

  // Run this anti-AFK loop every 2 seconds (2000 milliseconds)
  setInterval(() => {
    // 1. MAKE THE BOT JUMP
    bot.setControlState("jump", true);
    setTimeout(() => bot.setControlState("jump", false), 150); // Release jump after 150ms

    // 2. TOGGLE SNEAKING (on/off)
    sneakState = !sneakState; // Flip the state
    bot.setControlState("sneak", sneakState); // Apply the new state

    // Optional: Uncomment the next line for debugging in your console
    // console.log("Anti-AFK: Jumped, Sneaking:", sneakState);
  }, 2000); // Time between actions (2000 ms = 2 seconds)
  // --- ANTI-AFK SYSTEM: END ---
});

bot.on("spawnReset", () => {
  console.log("Bot got stuck and is being respawned...");
});

// 6. ERROR HANDLING
bot.on("error", (err) => {
  console.log("Error:", err.message);
});

bot.on("end", (reason) => {
  console.log("Disconnected from server. Reason:", reason);
  // Optional: Add logic to automatically reconnect after a delay
  console.log("Attempting to reconnect in 5 seconds...");
  setTimeout(() => {
    console.log("Reconnecting...");
    mineflayer.createBot(botOptions);
  }, 5000);
});

// 7. DEBUGGING
bot.on("message", (message) => {
  console.log("Server message:", message.toString());
});

// Check if bot is actually connected
setTimeout(() => {
  if (bot.player) {
    console.log("Bot entity exists at position:", bot.player.position);
  } else {
    console.log("Bot entity does not exist yet...");
  }
}, 5000);
