const stars = document.getElementById("stars");

for (let i = 0; i < 90; i++) {
  const s = document.createElement("div");
  s.className = "star";

  s.style.left = Math.random() * 100 + "%";
  s.style.top = Math.random() * 100 + "%";
  s.style.animationDuration = (3 + Math.random() * 5) + "s";

  stars.appendChild(s);
}

const enter = document.getElementById("enter");
const gate = document.getElementById("gate");
const main = document.getElementById("main");
const music = document.getElementById("music");

gate.addEventListener('click', () => {
  gate.style.display = 'none';
  
  main.style.opacity = '1';
  main.style.transform = 'scale(1)';
  
  document.getElementById("player").style.display = "flex";

  music.src = 'data/Whatever.mp3';
  music.load();
  music.volume = 0.5;
  music.loop = true;

  music.play().catch(() => {});
});

const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

function formatTime(t) {
  if (!t || isNaN(t)) return "0:00";
  const minutes = Math.floor(t / 60);
  const seconds = Math.floor(t % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

music.addEventListener("timeupdate", () => {
  if (!music.duration) return;

  const percent = (music.currentTime / music.duration) * 100;
  progress.style.width = percent + "%";

  current.textContent = formatTime(music.currentTime);
  duration.textContent = formatTime(music.duration);
});

function get_status(status) {
  if (status === "online") return "online";
  if (status === "idle") return "idle";
  if (status === "dnd") return "dnd";
  return "offline";
}

async function load_discord() {
  try {
    const data = (await (await fetch(`https://api.lanyard.rest/v1/users/${"989788446484746301"}`)).json()).data;
    const avatar = data.discord_user.avatar? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`: `https://cdn.discordapp.com/embed/avatars/0.png`;

    document.getElementById("discord-card").innerHTML = `
      <img class = "dc-pfp" src = "${avatar}">

      <div class = "dc-info">
        <div class = "dc-top">
          <div class = "dc-dot ${get_status(data.discord_status)}"></div>
          <div class = "dc-name">${data.discord_user.username}</div>

          <div class = "badges">
            <img src = "https://raw.githubusercontent.com/mezotv/discord-badges/refs/heads/main/assets/discordnitro.svg">
            <img src = "https://raw.githubusercontent.com/mezotv/discord-badges/refs/heads/main/assets/discordearlysupporter.svg">
            <img src = "https://raw.githubusercontent.com/mezotv/discord-badges/refs/heads/main/assets/discordbotdev.svg">
          </div>
        </div>
      </div>
    `;
  } catch {
    document.getElementById("discord-card").innerHTML = `<div style = "color:#aaa;">Discord offline</div>`;
  }
}

load_discord();
setInterval(load_discord, 5000);