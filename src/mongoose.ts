/* ******************************************************************************
 * mongoose.ts                                                                  *
 * *************************************************************************/ /**
 *
 * @fileoverview Initialize mongoose on a Feathers app for use by services.
 *
 * Created on       May 7, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Michael Jay Lippert,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

import { Application as FeathersApp } from '@feathersjs/feathers';
import * as mongoose from 'mongoose';

/* ******************************************************************************
 * configureMongoose                                                       */ /**
 *
 * Start the connection to the mongodb for mongoose. Make mongoose easily
 * accessible from the app as a value named `mongooseClient`.
 *
 * The mongooseClient is used to define the models for any services based on
 * mongoose.
 *
 * @param app
 *      The feathers application that mongoose should be configured on.
 */
function configureMongoose(app: FeathersApp): void
{
    mongoose.connect(app.get('mongodb'), {});

    app.set('mongooseClient', mongoose);
}

/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export default configureMongoose;
export
{
    configureMongoose,
};
