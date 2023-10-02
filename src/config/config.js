import dotenv from "dotenv";

dotenv.config({
  path: "../../.env.dev",
});

export default {
  app: {
    PORT: process.env.PORT || 8080,
  },
  mongo: {
    URL: process.env.MONGO_URL || "mongodb://localhost:27017",
  },
  jwt: {
    COOKIE: process.env.JWT_COOKIE,
    SECRET: process.env.JWT_SECRET,
  },
};
