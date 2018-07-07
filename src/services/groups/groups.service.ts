/* ******************************************************************************
 * groups.service.ts                                                            *
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

// Initializes the `groups` service on path `/groups`
import { Application as FeathersApp } from '@feathersjs/feathers';
import { service as createService } from 'feathers-mongoose';
import createModel from '../../models/groups.model';
import hooks from './groups.hooks';

/* ******************************************************************************
 * configureGroupsService                                                  */ /**
 *
 * Configure the groups feathers service.
 *
 * @param app
 *      The feathers application the service should be configured on.
 */
function configureGroupsService(app: FeathersApp): void
{
    const Model = createModel(app); // tslint:disable-line:variable-name "class names should be PascalCase"
    const paginate = app.get('paginate');

    const options =
        {
            name: 'groups',
            Model,
            paginate
        };

    // Initialize our service with any options it requires
    app.use('/groups', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('groups');

    service.hooks(hooks);
}


/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export default configureGroupsService;
export
{
    configureGroupsService,
};
