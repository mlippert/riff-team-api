/* ******************************************************************************
 * users.service.ts                                                             *
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

// Initializes the `users` service on path `/users`
import { Application as FeathersApp } from '@feathersjs/feathers';
import { service as createService } from 'feathers-mongoose';
import createModel from '../../models/users.model';
import hooks from './users.hooks';

/* ******************************************************************************
 * configureUsersService                                                   */ /**
 *
 * Configure the users feathers service.
 *
 * @param app
 *      The feathers application the service should be configured on.
 */
function configureUsersService(app: FeathersApp): void
{
    const Model = createModel(app); // tslint:disable-line:variable-name "class names should be PascalCase"
    const paginate = app.get('paginate');

    const options =
        {
            name: 'users',
            Model,
            paginate
        };

    // Initialize our service with any options it requires
    app.use('/users', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('users');

    service.hooks(hooks);
}


/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export default configureUsersService;
export
{
    configureUsersService,
};
