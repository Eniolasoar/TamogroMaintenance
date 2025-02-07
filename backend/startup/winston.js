import winston from 'winston';

    const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.File(
        { filename: 'logFile.log',   
          format: winston.format.combine(
          winston.format.colorize(),
        ) },),
      new winston.transports.Console({
        level: 'error',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exception.log' })
      ],
      rejectionHandlers: [
        new winston.transports.File({ filename: 'rejection.log' })
      ]
  });
  
export default  logger;



