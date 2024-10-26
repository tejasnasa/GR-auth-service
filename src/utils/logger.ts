    import pino from "pino";
import pinoPretty from "pino-pretty";
import { pinoHttp } from "pino-http";

const prettyStream = pinoPretty({
  colorize: true,
  translateTime: "SYS:standard",
  ignore: "pid,hostname",
});

const logger = pino(prettyStream);

const customLogger = pinoHttp({
  logger,
  customSuccessMessage: (req, res) =>
    `Request to ${req.method} ${req.url} succeeded`,
  customErrorMessage: (req, res) =>
    `Request to ${req.method} ${req.url} failed`,
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});

export { customLogger };
