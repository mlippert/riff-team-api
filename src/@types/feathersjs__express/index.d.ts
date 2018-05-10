/* ******************************************************************************
 * @types/feathersjs__express/index.d.ts                                        *
 * *************************************************************************/ /**
 *
 * @fileoverview Typescript declaration file for @feathersjs/express
 *
 * [@feathersjs/express]{@link https://github.com/feathersjs/express#readme}
 * provides REST transport support based on Express for Feathers applications.
 *
 * This declaration file was created based on:
 * - @feathersjs/express ver 1.2.2
 * - Typescript ver 2.8.3
 *
 * Created on       May 9, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Michael Jay Lippert,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

import { Application as FeathersApp, ServiceMethods, SetupMethod } from '@feathersjs/feathers';
import { ApplicationRequestHandler, Express as ExpressApp, IRouterMatcher } from "express-serve-static-core";
import * as express from 'express';
import * as feathersErrorHandler from '@feathersjs/errors/handler';
import * as feathersNotFound from '@feathersjs/errors/not-found';
import * as bodyParser from "body-parser";
import serveStatic = require("serve-static");


// type of FeathersApp.use method
interface IServiceHandler<T>
{
    (path: string, service: Partial<ServiceMethods<any> & SetupMethod> | T, options?: any): T;
}

// type of combined FeathersApp.use and ExpressApp.use
type ExpressFeathersUse<T> = ApplicationRequestHandler<T> & IServiceHandler<T>

export interface ExpressFeathersApp extends FeathersApp, ExpressApp
{
    // configure from ExpressApp
    configure(fn: Function): this;
    configure(env0: string, fn: Function): this;
    configure(env0: string, env1: string, fn: Function): this;
    configure(env0: string, env1: string, env2: string, fn: Function): this;
    configure(env0: string, env1: string, env2: string, env3: string, fn: Function): this;
    configure(env0: string, env1: string, env2: string, env3: string, env4: string, fn: Function): this;
    // configure from FeathersApp
    configure(callback: (this: this, app: this) => void): this;

    // disable from ExpressApp
    //disable(setting: string): this;
    // disable from FeathersApp
    disable(name: string): this;

    // enable from ExpressApp
    //enable(setting: string): this;
    // enable from FeathersApp
    enable(name: string): this;

    // get from ExpressApp
    get: ((name: string) => any) & IRouterMatcher<this>;
    // get from FeathersApp
    //get(name: string): any;

    // set from ExpressApp
    //set(setting: string, val: any): this;
    // set from FeathersApp
    set(name: string, value: any): this;

    // use from ExpressApp
    //use: ApplicationRequestHandler<this>;
    // use from FeathersApp
    //use(path: string, service: Partial<ServiceMethods<any> & SetupMethod> | ExpressFeathersApp, options?: any): this;
    use: ExpressFeathersUse<this>;
}

declare function feathersExpress(feathersApp: FeathersApp): ExpressFeathersApp;

// TODO: these could be better defined with a deeper understanding of the parts -mjl 2018-05-09
type RestFormatter = (req: any, res: { data?: any, format?: (o: any) => void  }, next: () => void) => void;
type Rest = (handler?: RestFormatter) => (() => void);

declare namespace feathersExpress
{
    export let original: typeof express;
    export let rest: Rest;
    export let notFound: typeof feathersNotFound;
    export let errorHandler: typeof feathersErrorHandler;
    /**
     * This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
     * @since 4.16.0
     */
    var json: typeof bodyParser.json;

    /**
     * This is a built-in middleware function in Express. It serves static files and is based on serve-static.
     */
    var static: typeof serveStatic;

    /**
     * This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
     * @since 4.16.0
     */
    var urlencoded: typeof bodyParser.urlencoded;
}

export default feathersExpress;

// TODO: I don't know that we care enough to mention these properties as being exported.
export let original: typeof express;
export let rest: Rest;
export let notFound: typeof feathersNotFound;
export let errorHandler: typeof feathersErrorHandler;
