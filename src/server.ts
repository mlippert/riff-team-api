/* ******************************************************************************
 * server.ts                                                                    *
 * *************************************************************************/ /**
 *
 * @fileoverview Entry point for running the riff-team-api
 *
 * Created on       May 5, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Michael Jay Lippert,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

import app from './app';

const logger = app.get('logger');
const port = app.get('port');
const server = app.listen(port);

const lastResortPromiseRejection = (reason: Error | any, p: Promise<any>) =>
    logger.error({ promise: p, reason }, 'Unhandled Rejection at: Promise');

const logAppStarted = () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port);


process.on('unhandledRejection', lastResortPromiseRejection);
server.on('listening', logAppStarted);

