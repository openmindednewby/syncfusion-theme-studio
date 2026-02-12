/**
 * Structured console logger for SyncfusionThemeStudio.
 *
 * Silent in production builds (via `import.meta.env.PROD`).
 * Provides debug/info/warn/error levels with timestamp + context prefix.
 */

// eslint-disable-next-line prefer-const-enum/prefer-const-enum -- const enum causes tsc issues with isolatedModules
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

interface LoggerOptions {
  enableConsole: boolean;
  minLevel: LogLevel;
}

const defaultOptions: LoggerOptions = {
  enableConsole: !import.meta.env.PROD,
  minLevel: 'debug',
};

function shouldLog(level: LogLevel, options: LoggerOptions): boolean {
  return options.enableConsole && LOG_LEVEL_VALUES[level] >= LOG_LEVEL_VALUES[options.minLevel];
}

function formatMessage(context: string, message: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${context}] ${message}`;
}

interface Logger {
  debug: (context: string, message: string, data?: unknown) => void;
  info: (context: string, message: string, data?: unknown) => void;
  warn: (context: string, message: string, data?: unknown) => void;
  error: (context: string, message: string, error?: unknown) => void;
}

function createLogger(options: LoggerOptions = defaultOptions): Logger {
  return {
    debug(context: string, message: string, data?: unknown) {
      if (shouldLog('debug', options))
        console.debug(formatMessage(context, message), data ?? '');
    },

    info(context: string, message: string, data?: unknown) {
      if (shouldLog('info', options))
        console.info(formatMessage(context, message), data ?? '');
    },

    warn(context: string, message: string, data?: unknown) {
      if (shouldLog('warn', options))
        console.warn(formatMessage(context, message), data ?? '');
    },

    error(context: string, message: string, error?: unknown) {
      if (shouldLog('error', options))
        console.error(formatMessage(context, message), error ?? '');
    },
  };
}

export const logger = createLogger();
export type { Logger, LogLevel, LoggerOptions };
