/* ******************************************************************************
 * groups.hooks.ts                                                              *
 * *************************************************************************/ /**
 *
 * @fileoverview Hooks for the groups service
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

import { HooksObject } from '@feathersjs/feathers';

const groupsHooks: HooksObject =
    {
        before:
        {
            all:    [],
            find:   [],
            get:    [],
            create: [],
            update: [],
            patch:  [],
            remove: []
        },

        after:
        {
            all:    [],
            find:   [],
            get:    [],
            create: [],
            update: [],
            patch:  [],
            remove: []
        },

        error:
        {
            all:    [],
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
export default groupsHooks;
export
{
    groupsHooks,
};
