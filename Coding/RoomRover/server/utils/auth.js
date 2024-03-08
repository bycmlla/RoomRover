const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error('A chave secreta não está definida. Verifique o arquivo .env.');
  }

  const payload = {
    userId: userId,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return token;
};

module.exports = { generateToken };
