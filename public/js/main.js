document.addEventListener("DOMContentLoaded", () => {
  // Server-Info abrufen und anzeigen
  fetchServerInfo()

  // Alle 30 Sekunden aktualisieren
  setInterval(fetchServerInfo, 30000)
})

function fetchServerInfo() {
  fetch("/api/info")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Netzwerkantwort war nicht ok")
      }
      updateServerStatus(true)
      return response.json()
    })
    .then((data) => {
      displayServerInfo(data)
    })
    .catch((error) => {
      console.error("Fehler beim Abrufen der Server-Informationen:", error)
      updateServerStatus(false)
    })
}

function updateServerStatus(isOnline) {
  const statusIndicator = document.querySelector(".status-indicator")
  const statusText = document.getElementById("status")

  if (isOnline) {
    statusIndicator.classList.remove("offline")
    statusIndicator.classList.add("online")
    statusText.textContent = "Online"
  } else {
    statusIndicator.classList.remove("online")
    statusIndicator.classList.add("offline")
    statusText.textContent = "Offline"
  }
}

function displayServerInfo(info) {
  const serverInfoElement = document.getElementById("server-info")
  const uptimeInMinutes = Math.floor(info.uptime / 60)
  const uptimeText = uptimeInMinutes > 0 ? `${uptimeInMinutes} Minuten` : `${Math.floor(info.uptime)} Sekunden`

  serverInfoElement.innerHTML = `
    Server: ${info.server} | 
    Version: ${info.version} | 
    Node.js: ${info.nodeVersion} | 
    Uptime: ${uptimeText}
  `
}
