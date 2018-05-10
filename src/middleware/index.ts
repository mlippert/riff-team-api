/* ******************************************************************************
 * index.ts  (middleware)                                                       *
 * *************************************************************************/ /**
 *
 * @fileoverview [summary of file contents]
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


/* ******************************************************************************
 * configureMiddleware                                                     */ /**
 *
 * Configure all middleware on the feathers app.
 *
 * @param app
 *      The feathers application the middleware should be configured on.
 */
// @ts-ignore: TS6133: 'app' is declared but its value is never read.
// eslint-disable-next-line no-unused-vars
function configureMiddleware(app: FeathersApp): void
{
};


/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export default configureMiddleware;
export
{
    configureMiddleware,
};
