/* ******************************************************************************
 * index.ts  (services)                                                         *
 * *************************************************************************/ /**
 *
 * @fileoverview [summary of file contents]
 *
 * [More detail about the file's contents]
 *
 * Created on       May 7, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Michael Jay Lippert,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

import { Application as FeathersApp } from '@feathersjs/feathers';
import users from './users/users.service';


/* ******************************************************************************
 * configureServices                                                       */ /**
 *
 * Configure all feathers services.
 *
 * @param app
 *      The feathers application the services should be configured on.
 */
function configureServices(app: FeathersApp): void
{
    app.configure(users);
}


/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export default configureServices;
export
{
    configureServices,
};
