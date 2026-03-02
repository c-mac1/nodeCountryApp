//Ai generated logger

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

const LOG_COLORS = {
  ERROR: "\x1b[31m", // Red
  WARN: "\x1b[33m", // Yellow
  INFO: "\x1b[36m", // Cyan
  DEBUG: "\x1b[37m", // White
  RESET: "\x1b[0m", // Reset
};

class Logger {
  constructor(level = LOG_LEVELS.INFO) {
    this.level = level;
  }

  _log(level, levelName, message, ...args) {
    if (level <= this.level) {
      const timestamp = new Date().toISOString();
      const color = LOG_COLORS[levelName];
      const reset = LOG_COLORS.RESET;

      console.log(
        `${color}[${timestamp}] ${levelName}:${reset} ${message}`,
        ...args,
      );
    }
  }

  error(message, ...args) {
    this._log(LOG_LEVELS.ERROR, "ERROR", message, ...args);
  }

  warn(message, ...args) {
    this._log(LOG_LEVELS.WARN, "WARN", message, ...args);
  }

  info(message, ...args) {
    this._log(LOG_LEVELS.INFO, "INFO", message, ...args);
  }

  debug(message, ...args) {
    this._log(LOG_LEVELS.DEBUG, "DEBUG", message, ...args);
  }

  success(message, ...args) {
    const timestamp = new Date().toISOString();
    console.log(`\x1b[32m[${timestamp}] SUCCESS:\x1b[0m ${message}`, ...args);
  }
}

// Export singleton instance
export const logger = new Logger(LOG_LEVELS.INFO);
export { LOG_LEVELS };
