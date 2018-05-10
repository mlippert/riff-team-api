/* ******************************************************************************
 * app.hooks.ts                                                                 *
 * *************************************************************************/ /**
 *
 * @fileoverview Application hooks that run for every service
 *
 * Created on       May 5, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Michael Jay Lippert,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

import { HooksObject } from '@feathersjs/feathers';
import logger from './hooks/logger';

const appHooks: HooksObject =
{
    before:
    {
        all:    [ logger() ],
        find:   [],
        get:    [],
        create: [],
        update: [],
        patch:  [],
        remove: []
    },

    after:
    {
        all:    [ logger() ],
        find:   [],
        get:    [],
        create: [],
        update: [],
        patch:  [],
        remove: []
    },

    error:
    {
        all:    [ logger() ],
        find:   [],
        get:    [],
        create: [],
        update: [],
        patch:  [],
        remove: []
    }
};


/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export default appHooks;
export
{
    appHooks,
};
