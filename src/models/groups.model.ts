/* ******************************************************************************
 * groups.model.ts                                                              *
 * *************************************************************************/ /**
 *
 * @fileoverview A mongoose model for riff team groups
 *
 * A group is a collection of users who hold meetings. Groups have a unique
 * room that the group meetings are held in. Only group members may join the
 * meeting in the group room.
 *
 * Created on       June 27, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Michael Jay Lippert,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

import { Application as FeathersApp } from '@feathersjs/feathers';
import { Document, Model, Schema } from 'mongoose';

import { IUser } from './users.model';

const ObjectId = Schema.Types.ObjectId;

interface IGroup
{
    /** The group name is unique in the set of all group names.
     *  For class team groups it is recommended that the group name contain
     *  a team name, a short class name and time e.g. "Psych101_Fall2018_Team12".
     */
    name: string;

    /** The room name is assigned by the system when the group is created in order
     *  to ensure it is unique.
     */
    room: string;

    /** The id's of the users who are members of this group. */
    members: [IUser | string];
}

const groupSchemaDef =
    {
        name:    { type: String, required: true },
        room:    { type: String, required: true },
        members: [{ type: ObjectId, ref: 'user', required: true }],
    };

const groupSchemaOpts = { timestamps: true };

type IGroupDocument = IGroup & Document;

/* ******************************************************************************
 * createModel                                                             */ /**
 *
 * Creates and returns the GroupModel class that can be used to create GroupModel
 * instances.
 *
 * @param app
 *      Feathers app the model will be used with.
 */
function createGroupModel(app: FeathersApp): Model<IGroupDocument>
{
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
    const mongooseClient = app.get('mongooseClient');

    const groupSchema = new Schema(groupSchemaDef, groupSchemaOpts);

    return mongooseClient.model('group', groupSchema);
}


/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export default createGroupModel;
export
{
    createGroupModel,
    IGroup,
    IGroupDocument,
};
