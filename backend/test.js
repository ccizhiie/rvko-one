const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const bodyParser = require("body-parser");

const app = express();
const testDir = path.join(__dirname, "test");
const dataPath = path.join(__dirname, "data.json");
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/files", (req, res) => {
  fs.readdir(testDir, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory");
    }
    res.json(files.filter((file) => file.endsWith(".test.js")));
  });
});

app.get("/test-functions", (req, res) => {
  const file = req.query.file;
  if (!file) {
    return res.status(400).send("No file specified");
  }
  const filePath = path.join(testDir, file);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Unable to read file");
    }
    const testFunctions = [];
    const regex = /it\(['"](.*?)['"],/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      testFunctions.push(match[1]);
    }
    res.json(testFunctions);
  });
});

app.get("/run-test", (req, res) => {
  const file = req.query.file;
  const func = req.query.func;
  console.log(func);
  if (!file || !func) {
    return res.status(400).send("File or function not specified");
  }
  const filePath = path.join(file);
  const command = `npx jest --forceExit ${filePath} -t "${func}"`;
  console.log(`Running command: ${command}`);
  const jestProcess = exec(command, { shell: true });

  let stderr = "";
  jestProcess.stderr.on("data", (data) => {
    stderr += data;
  });

  jestProcess.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
    if (code !== 0) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ message: "failed", stderr: stderr });
    }
    console.log(`Output: ${stderr}`);
    res.json({ message: "success", stderr: stderr });
  });
});

app.get("/save-input", (req, res) => {
  const { email, password, username } = req.query; // Ambil nilai baru untuk a dan b dari body permintaan
  // Baca file JSON yang ada
  let rawData = fs.readFileSync(dataPath);
  let data = JSON.parse(rawData);

  // Perbarui nilai yang diperlukan tanpa menghapus properti lain
  if (email !== undefined) data.email = email;
  if (password !== undefined) data.password = password;
  if (username !== undefined) data.username = username;

  // Tulis kembali objek JSON yang diperbarui ke file
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  res.json({ message: "Data create succes", data });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
