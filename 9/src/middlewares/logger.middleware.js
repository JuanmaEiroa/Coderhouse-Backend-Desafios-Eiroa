import { devLogger, prodLogger } from "../utils/logger.js";
import appConfig from "../config/env.config.js";

export const addEnvLogger = (req, res, next) => {
  appConfig.environment === "development"
    ? (req.logger = devLogger)
    : (req.logger = prodLogger);
  next();
};
