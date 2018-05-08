/* ******************************************************************************
 * config.ts                                                                    *
 * *************************************************************************/ /**
 *
 * @fileoverview Provide access to the configuration settings
 *
 * [More detail about the file's contents]
 *
 * Created on       May 8, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Michael Jay Lippert,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

import { Application as FeathersApp } from '@feathersjs/feathers';
import * as config from 'config';
import { loggerInstance } from './logger';


/* ******************************************************************************
 * configureSettings                                                       */ /**
 *
 * Set configuration settings from the config files (processed by the config
 * module) that are relevant to the running app.
 * Also set any additional known utility values such as the initialized logger.
 *
 * @param app
 *      The feathers application to attach the setting values to.
 */
function configureSettings(app: FeathersApp): void
{
    const port = config.get<number>('server.port');

    app.set('logger', loggerInstance);
    app.set('port', port);
}

/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export default config;
export
{
    config,
    configureSettings,
};
