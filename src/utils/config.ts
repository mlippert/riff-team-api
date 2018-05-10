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
    const server = config.get<IServerSettings>('server');
    app.set('port', server.port);
    app.set('host', server.host);
    app.set('public', server.public);
    app.set('mongodb', server.mongodb);
    app.set('paginate', server.paginate);

    app.set('logger', loggerInstance);
}

/* ******************************************************************************
 * IServerSettings                                                         */ /**
 *
 * Configuration settings relevant to the riff-team-api server
 *
 * @property host
 *      hostname (domain name) that the server is running on.
 *
 * @property port
 *      [Description of port]
 *
 * @property public
 *      [Description of public]
 *
 * @property mongodb
 *      [Description of mongodb]
 *
 * @property paginate
 *      [Description of paginate]
 */
interface IServerSettings
{
    host: string;
    port: number;
    public: string;
    mongodb: string;
    paginate:
    {
        default: number;
        max: number;
    };
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
