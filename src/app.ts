/* ******************************************************************************
 * app.ts                                                                       *
 * *************************************************************************/ /**
 *
 * @fileoverview Entry point to start the riff-team-api server
 *
 * [More detail about the file's contents]
 *
 * Created on       May 3, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Michael Jay Lippert,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

import * as path from 'path';

import express from '@feathersjs/express';
import feathers from '@feathersjs/feathers';
// import socketio from '@feathersjs/socketio';

import * as compress from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as favicon from 'serve-favicon';

import { appHooks } from './app.hooks';
import { configureChannels } from './channels';
import { configureMiddleware } from './middleware';
import { configureMongoose } from './mongoose';
import { configureServices } from './services';
import { configureSettings } from './utils/config';


const app = express(feathers());

// Load app configuration
app.configure(configureSettings);

const logger = app.get('logger');

// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
// app.configure(socketio());

app.configure(configureMongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(configureMiddleware);

// Set up our services (see `services/index.js`)
app.configure(configureServices);

// Set up event channels (see channels.js)
app.configure(configureChannels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);


////// test service to be deleted, currently used to test that building works

// Register a simple todo service that returns the name and some text
app.use('todos',
    {
        async get(name: string): Promise<{ name: string, text: string }>
        {
            // Return an object in the form of { name, text }
            return {
                       name,
                       text: `You have to do ${name}`
                   };
        }
    });

// A function that gets and logs a todo from the service
async function getTodo(name: string)
{
    // Get the service we registered above
    const service = app.service('todos');
    // Call the `get` method with a name
    const todo = await service.get(name);

    // Log the todo we got back
    logger.info({ todo }, 'response from todos service.get');
}

getTodo('dishes');

/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export default app;
export
{
    app,
};
