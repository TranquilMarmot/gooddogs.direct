import winston from "winston";

const { format, transports } = winston;

/**
 * Call this function to initialize the default winston logger
 */
export default () => {
  winston.configure({
    level: "info",
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    transports: [
      // - Write to all logs with level `info` and below to `gooddogs-direct-combined.log`.
      // - Write all logs error (and below) to `gooddogs-direct-error.log`.
      new transports.File({
        filename: "gooddogs-direct-error.log",
        level: "error",
      }),
      new transports.File({ filename: "gooddogs-direct-combined.log" }),
    ],
  });

  // If we're not in production then **ALSO** log to the `console`
  // with the colorized simple format.
  if (process.env.NODE_ENV !== "production") {
    winston.add(
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      })
    );
  }
};
