const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const Joi = require("joi");

const app = express();
const testDir = path.join(__dirname, "test2");
const dataPath = path.join(__dirname, "data.json");
const newDataPath = path.join(__dirname, "newData.json");
const newDataPath2 = path.join(__dirname, "registerdata.json");
app.use(bodyParser.json());
app.use(express.static("public"));

const accountSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email tidak valid",
    "any.required": "Email diperlukan",
    "string.empty": "Email diperlukan",
  }),
  username: Joi.string().min(3).required().messages({
    "string.min": "Username minimal harus memiliki 3 karakter",
    "any.required": "Username diperlukan",
    "string.empty": "Username diperlukan",
  }),
  phone: Joi.string()
    .pattern(/^\+?1?\d{9,15}$/)
    .optional()
    .messages({
      "string.pattern.base": "Nomor telepon tidak valid",
    }),
  password: Joi.string().min(3).required().messages({
    "string.min": "Password minimal harus memiliki 6 karakter",
    "any.required": "Password diperlukan",
    "string.empty": "Password diperlukan",
  }),
});

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email tidak valid",
    "any.required": "Email diperlukan",
    "string.empty": "Email diperlukan",
  }),
  username: Joi.string().min(3).required().messages({
    "string.min": "Username minimal harus memiliki 3 karakter",
    "any.required": "Username diperlukan",
    "string.empty": "Username diperlukan",
  }),
  password: Joi.string().min(3).required().messages({
    "string.min": "Password minimal harus memiliki 6 karakter",
    "any.required": "Password diperlukan",
    "string.empty": "Password diperlukan",
  }),
});

const changePasswordSchema = Joi.object({
  password1: Joi.string().min(3).required().messages({
    "string.min": "Password minimal harus memiliki 6 karakter",
    "any.required": "Password diperlukan",
    "string.empty": "Password diperlukan",
  }),
  password2: Joi.string().min(3).required().messages({
    "string.min": "Password minimal harus memiliki 6 karakter",
    "any.required": "Password diperlukan",
    "string.empty": "Password diperlukan",
  }),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({ message: errorMessage });
  }
  next();
};

app.get("/files", (req, res) => {
  fs.readdir(testDir, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory");
    }
    res.json(files.filter((file) => file.endsWith(".test.js")));
  });
});

app.get("/data-input", (req, res) => {
  try {
    const rawData2 = fs.readFileSync(newDataPath);
    jsonData2 = JSON.parse(rawData2);
    return res.json(jsonData2);
  } catch (error) {
    res.status(500).send("Unable to load true data");
  }
});

app.get("/data-input-rg", (req, res) => {
  try {
    const rawData2 = fs.readFileSync(newDataPath2);
    jsonData2 = JSON.parse(rawData2);
    return res.json(jsonData2);
  } catch (error) {
    res.status(500).send("Unable to load true data");
  }
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

  if (!file) {
    return res.status(400).send("File  not specified");
  }
  const filePath = path.join(file);
  const command = `npx jest --forceExit ${filePath}`;
  //-t "${func}"
  console.log(`Running command: ${command}`);
  const jestProcess = exec(command, { shell: true });

  let stdout = "";
  let stderr = "";

  jestProcess.stdout.on("data", (data) => {
    stdout += data;
  });

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

app.post("/save-input", validate(registerSchema), (req, res) => {
  const { email, password, username } = req.body; // Ambil nilai baru untuk a dan b dari body permintaan
  // Baca file JSON yang ada
  let rawData = fs.readFileSync(dataPath);
  let data = JSON.parse(rawData);

  // Perbarui nilai yang diperlukan tanpa menghapus properti lain
  if (email !== undefined) data.email = email;
  if (password !== undefined) data.password = password;
  if (username !== undefined) data.username = username;

  // Tulis kembali objek JSON yang diperbarui ke file
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  res.status(200).json({ message: "Data create succes", data });
});

app.post("/save-input-ac", validate(accountSchema), (req, res) => {
  const { email, password, username, phone } = req.body; // Ambil nilai baru untuk a dan b dari body permintaan
  // Baca file JSON yang ada
  let rawData = fs.readFileSync(dataPath);
  let data = JSON.parse(rawData);

  // Perbarui nilai yang diperlukan tanpa menghapus properti lain
  if (email !== undefined) data.email = email;
  if (password !== undefined) data.password = password;
  if (username !== undefined) data.username = username;
  data.phone = phone;

  // Tulis kembali objek JSON yang diperbarui ke file
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  res.status(200).json({ message: "Data create succes", data });
});

app.post("/save-input-pw", validate(changePasswordSchema), (req, res) => {
  const { password1, password2 } = req.body;
  let rawData = fs.readFileSync(dataPath);
  let data = JSON.parse(rawData);

  if (password1 !== password2) {
    return res
      .status(400)
      .json({ message: "Please write the exact same password" });
  } else {
    if (password1 !== undefined) data.password1 = password1;
    if (password2 !== undefined) data.password2 = password2;

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    return res.status(200).json({ message: "Data create succes", data });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
