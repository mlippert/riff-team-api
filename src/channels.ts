/* ******************************************************************************
 * channels.ts                                                                  *
 * *************************************************************************/ /**
 *
 * @fileoverview Configure feathers channels for riff-team-api server
 *
 * Created on       May 5, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Michael Jay Lippert,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

import { Application as FeathersApp } from '@feathersjs/feathers';

/* ******************************************************************************
 * configureChannels                                                       */ /**
 *
 * Configure the channels used by the riff-team-api.
 *
 * @param app
 *      The feathers application that will use the event channels.
 */
function configureChannels(app: FeathersApp): void
{
    const logger = app.get('logger');

    if (typeof app.channel !== 'function')
    {
        // If no real-time functionality has been configured just return
        return;
    }

    app.on('connection',
           (connection) =>
           {
               // On a new real-time connection, add it to the anonymous channel
               app.channel('anonymous').join(connection);
           });

    app.on('login',
           // @ts-ignore: TS6133: 'authResult' is declared but its value is never read.
           (authResult, { connection }) =>
           {
               // connection can be undefined if there is no
               // real-time connection, e.g. when logging in via REST
               if (connection)
               {
                   // Obtain the logged in user from the connection
                   // const user = connection.user;

                   // The connection is no longer anonymous, remove it
                   app.channel('anonymous').leave(connection);

                   // Add it to the authenticated user channel
                   app.channel('authenticated').join(connection);

                   // Channels can be named anything and joined on any condition

                   // E.g. to send real-time events only to admins use
                   // if(user.isAdmin) { app.channel('admins').join(connection); }

                   // If the user has joined e.g. chat rooms
                   // if(Array.isArray(user.rooms))
                   //   user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));

                   // Easily organize users by email and userid for things like messaging
                   // app.channel(`emails/${user.email}`).join(channel);
                   // app.channel(`userIds/${user.id}`).join(channel);
               }
           });

    // @ts-ignore: TS6133: 'data' and 'hook' are declared but their value is never read.
    // eslint-disable-next-line no-unused-vars
    app.publish((data, hook) =>
                {
                    // Here you can add event publishers to channels set up in `channels.js`
                    // To publish only for a specific event use `app.publish(eventname, () => {})`

                    logger.info('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line

                    // e.g. to publish all service events to all authenticated users use
                    return app.channel('authenticated');
                });

    // Here you can also add service specific event publishers
    // e..g the publish the `users` service `created` event to the `admins` channel
    // app.service('users').publish('created', () => app.channel('admins'));

    // With the userid and email organization from above you can easily select involved users
    // app.service('messages').publish(() => {
    //   return [
    //     app.channel(`userIds/${data.createdBy}`),
    //     app.channel(`emails/${data.recipientEmail}`)
    //   ];
    // });
}


/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export default configureChannels;
export
{
    configureChannels,
};
