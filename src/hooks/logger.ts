/* ******************************************************************************
 * logger.ts                                                                    *
 * *************************************************************************/ /**
 *
 * @fileoverview A hook that logs service method before, after and error
 *
 * [More detail about the file's contents]
 *
 * Created on       May 5, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Michael Jay Lippert,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

import { Hook, HookContext } from '@feathersjs/feathers';
import { loggerInstance as logger } from '../utils/logger';

// To see more detailed messages, uncomment the following line:
// logger.level('debug');

/* ******************************************************************************
 * IHookContextOptJson                                                     */ /**
 *
 * The feathersjs HookContext may have a toJSON function which we want to use
 * in the loggingHook when debugging.
 *
 * TODO: This interface definition may only have been needed when the logger was
 * based on winston. see below. If true, remove it. -mjl 2018-05-08
 *
 * @property toJSON
 *      Optional function to convert the context to a JSON string
 */
interface IHookContextOptJson extends HookContext
{
    toJSON?: (v: any) => string;
}

/* ******************************************************************************
 * getLoggingHook                                                          */ /**
 *
 * @returns a logging hook function
 */
function getLoggingHook(): Hook
{
    const loggingHook = (context: IHookContextOptJson)  =>
    {
        // This debugs the service call and a stringified version of the hook context
        // You can customize the message (and logger) to your needs
        logger.debug({ serviceCallContext: context }, `${context.type} app.service('${context.path}').${context.method}()`); // tslint:disable:ter-max-len

        // TODO: This was how feathersCLI wrote the log call for winston
        // I don't think it's necessary for bunyan given the above log call,
        // but double check. - mjl 2018-05-08
        //  if (typeof context.toJSON === 'function')
        //  {
        //      logger.debug('Hook Context', JSON.stringify(context, null, '  '));
        //  }

        if (context.error)
        {
            logger.error({ err: context.error });
        }
    };

    return loggingHook;
}


/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export default getLoggingHook;
export
{
    getLoggingHook,
};
