/* ******************************************************************************
 * users.model.ts                                                               *
 * *************************************************************************/ /**
 *
 * @fileoverview A mongoose model for riff team users
 *
 * [More detail about the file's contents]
 *
 * Created on       May 6, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Michael Jay Lippert,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

import { Application as FeathersApp } from '@feathersjs/feathers';
import { Document, Model, Schema } from 'mongoose';

interface IUser
{
    email: string;
    handle: string;
    name?: {
               first?: string;
               last?: string;
           };
}

const userSchemaDef =
    {
        email:     { type: String, required: true },
        handle:    { type: String, required: true },
        name:
        {
            first: { type: String, required: false },
            last:  { type: String, required: false },
        },
    };

const userSchemaOpts = { timestamps: true };

type IUserDocument = IUser & Document;

/* ******************************************************************************
 * createModel                                                             */ /**
 *
 * Creates and returns the UserModel class that can be used to create UserModel
 * instances.
 *
 * @param app
 *      Feathers app the model will be used with.
 */
function createUserModel(app: FeathersApp): Model<IUserDocument>
{
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;

    const userSchema = new Schema(userSchemaDef, userSchemaOpts);

    return mongooseClient.model('user', userSchema);
}


/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export default createUserModel;
export
{
    createUserModel,
    IUser,
    IUserDocument,
};
