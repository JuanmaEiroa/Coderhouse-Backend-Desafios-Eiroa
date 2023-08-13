import winston from "winston";

const customLoggerOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3, 
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        error: "orange",
        warning: "yellow",
        info: "blue",
        http: "purple",
        debug: "white"
    }
}

export const devLogger = winston.createLogger({
    levels: customLoggerOptions.levels,
    transports: [
        new winston.transports.Console({level: "debug"})
    ]
})

export const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({level: "info"}),
        new winston.transports.File({filename: "./errors.log", level: "error"})
    ]
})

