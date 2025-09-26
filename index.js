// Importiere das Express-Modul
const express = require("express");
const path = require("path");

// Erstelle eine Express-Anwendung
const app = express();

// Versuche, den Port aus der Pterodactyl-Umgebungsvariable zu holen
const PORT = process.env.SERVER_PORT || process.env.PORT || 3000;

// Stelle statische Dateien aus dem 'public'-Verzeichnis bereit
app.use(express.static(path.join(__dirname, "public")));

// API-Route für Serverinformationen
app.get("/api/info", (req, res) => {
  res.json({
    server: "Nebulite Hosting",
    version: "1.0.0",
    nodeVersion: process.version,
    uptime: process.uptime(),
    hostname: req.hostname,
  });
});

// Catch-All Route für alle anderen Routen
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Starte den Server
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
