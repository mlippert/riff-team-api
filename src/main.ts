/* ******************************************************************************
 * main.ts                                                                      *
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

import feathers from "@feathersjs/feathers";

import { loggerInstance as logger } from './logger';


const app = feathers();

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
    logger.info({ todo });
    console.log(todo);
}

getTodo('dishes');
