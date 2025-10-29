if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set in environment variables");
}

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
};
