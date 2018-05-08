/* ******************************************************************************
 * logger.ts                                                                    *
 * *************************************************************************/ /**
 *
 * @fileoverview Define and configure the logger to be used by riff-team-api
 *
 * The riff-team-api logger is based on [Bunyan]{@link https://github.com/trentm/node-bunyan/#readme}.
 * It outputs json, which can be pretty printed at the console by piping it
 * to the bunyan CLI. If the log output is going to stderr (the current default
 * configuration) and using the project installation of bunyan use the
 * commandline:
 *     npm start 2>&1 > /dev/null | ./node_modules/.bin/bunyan
 *
 * A json log should allow greater capabilities (such as easier search) in the
 * future, with or w/o an ELK stack (Elasticsearch, Logstash, Kibana) or parts
 * thereof. Also see what AWS has to [say]{@link https://aws.amazon.com/answers/logging/centralized-logging/}
 *
 * Created on       May 3, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Michael Jay Lippert,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

import * as bunyan from 'bunyan';
import * as config from 'config'; // logger can't import ./config because it imports logger


/* **************************************************************************
 * createLogger                                                        */ /**
 *
 * [Description of createLogger]
 *
 * @returns a new bunyan logger initialized with the log settings from config.
 *
 * **************************************************************************/
function createLogger()
{
    // Parse out the log config and create streams:
    const logConfig = config.get<IConfigLog>('log');

    const defaultLevel = logConfig.level || 'info';
    const logStreams: bunyan.Stream[] = [];

    const processLogStream = (stream: IConfigLogStream, index: number) =>
    {
        const logLevel = stream.level || defaultLevel;

        if (stream.output === 'file')
        {
            // @todo: If you specify a directory within your config that does not
            // yet exist the app will throw an error...fix that.
            let logDir = stream.logDir || './';
            if (!/\/$/.test(logDir))
            {
                logDir += '/';
            }

            const adjustedStream: bunyan.Stream =
                {
                    level: logLevel,
                    type: stream.type || 'rotating-file',   // Defaults to rotating file
                    path: `${logDir}${logConfig.name}.log`,
                    period: stream.period || '1d',          // Defaults to daily rotation
                    count: stream.count || 10,              // defaults to 10 files back-copy window
                };

            logStreams.push(adjustedStream);
        }
        else if (stream.output === 'stderr' || stream.output === 'stdout')
        {
            logStreams.push(
                {
                    level: logLevel,
                    stream: process[stream.output]
                });
        }
        // Possibly add other output types such as logstash
        else
        {
            // tslint:disable-next-line:no-console
            console.log('Logger warning: unrecognized configuration value log.streams[' + index + '].type');
        }
    };

    logConfig.streams.forEach(processLogStream);


    if (logStreams.length === 0 )
    {
        const errorMessage = 'Logger warning: no stream attached to the logger!';
        // tslint:disable-next-line:no-console
        console.log(errorMessage);
        throw Error(errorMessage);
    }

    // Create the logger with the streams configured above
    const bunyanLoggerConfig =
        {
            name:    logConfig.name,
            level:   defaultLevel,
            streams: logStreams
        };

    return bunyan.createLogger(bunyanLoggerConfig);
}

interface IConfigLogStream
{
    output: string;
    level?: bunyan.LogLevel;
    logDir?: string;
    type?: string;
    period?: string;
    count?: number;
}

interface IConfigLog
{
    name: string;
    streams?: IConfigLogStream[];
    level?: bunyan.LogLevel;
}

// Singleton Logger instance
let loggerInstance = createLogger();


/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export
{
    loggerInstance,
};

