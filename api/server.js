const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = "users.json";

// carrega usuários do arquivo (se existir)
let users = [];
if (fs.existsSync(USERS_FILE)) {
  users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
}

// --- Função para salvar no arquivo ---
function saveUsers() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// --- Função de distância Euclidiana ---
function euclideanDistance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] - b[i]) ** 2;
  }
  return Math.sqrt(sum);
}

// --- Rota de cadastro ---
app.post("/api/register", (req, res) => {
  const { username, descriptor } = req.body;
  if (!username || !descriptor) {
    return res.status(400).json({ ok: false, msg: "Dados inválidos" });
  }

  users.push({ username, descriptor });
  saveUsers();
  res.json({ ok: true, msg: "Usuário cadastrado" });
});

// --- Rota de login ---
app.post("/api/login", (req, res) => {
  const { descriptor } = req.body;
  if (!descriptor) {
    return res.status(400).json({ ok: false, msg: "Descriptor ausente" });
  }

  let best = null;
  let bestDist = Infinity;

  for (const user of users) {
    const dist = euclideanDistance(user.descriptor, descriptor);
    if (dist < bestDist) {
      bestDist = dist;
      best = user;
    }
  }

  const threshold = 0.6; // limite de confiança
  if (bestDist < threshold) {
    return res.json({ ok: true, user: best.username, distance: bestDist });
  } else {
    return res.status(401).json({ ok: false, msg: "Não reconhecido" });
  }
});

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});
