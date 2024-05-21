import * as winston from 'winston';
import * as  CloudWatchTransport from 'winston-cloudwatch';
import { utilities as nestWinstonModuleUtilities,WinstonModule } from 'nest-winston';

module.exports = (configService) => {

	var options = {
		errorFile: {
			level: 'error',
			filename: `./logs/error.log`,
			handleExceptions: true,
			json: true,
			maxsize: 10242880, // 10MB
			maxFiles: 10,
			colorize: true,
		},
		// console: {
		//     level: 'debug',
		//     handleExceptions: true,
		//     json: false,
		//     colorize: true,
		// },
	  };

	const logger = winston.createLogger({
		transports: [
			new winston.transports.Console({
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.ms(),
					nestWinstonModuleUtilities.format.nestLike()
				),
			}),
			new winston.transports.File(options.errorFile),
		]
	});

	return logger;	
}






