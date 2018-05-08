/* ******************************************************************************
 * feathers-mongoose.d.ts                                                       *
 * *************************************************************************/ /**
 *
 * @fileoverview Typescript declaration file for feathers-mongoose
 *
 * [feathers-mongoose]{@link https://github.com/feathersjs-ecosystem/feathers-mongoose}
 * provides a Feathers service database adapter for mongoose.
 *
 * This declaration file was created based on:
 * - feathers-mongoose ver 6.1.1
 * - Typescript ver 2.8.3
 *
 * Created on       May 7, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Michael Jay Lippert,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/


declare module 'feathers-mongoose'
{
    import {
             Hook,
             Id,
             NullableId,
             Paginated,
             PaginationOptions,
             Params,
             Service as IService,
           } from '@feathersjs/feathers';
    import { Document, DocumentToObjectOptions, Model as MongooseModel } from 'mongoose';

    interface IServiceOptions<T extends Document>
    {
        Model: MongooseModel<T>;
        discriminators?: [{ modelName?: string }];
        id?: string;
        paginate?: false | Pick<PaginationOptions, 'max'>;
        lean?: boolean;
        overwrite?: boolean;
        events?: [string];
    }

    class MongooseService<T extends Document = any>
    {
        constructor(options: IServiceOptions<T>);
        extend<U>(obj: U): (this & U);

        find(params?: Params): Promise<T[] | Paginated<T>>;
        get(id: Id, params?: Params): Promise<T>;
        create(data: Partial<T> | Array<Partial<T>>, params?: Params): Promise<T | T[]>;
        update(id: NullableId, data: T, params?: Params): Promise<T>;
        patch(id: NullableId, data: Partial<T>, params?: Params): Promise<T>;
        remove(id: NullableId, params?: Params): Promise<T>;
    }

    function init<T extends Document>(options: IServiceOptions<T>): MongooseService<T>;

    namespace init
    {
        export let Service: typeof MongooseService;
        export let service: <T extends Document>(options: IServiceOptions<T>) => MongooseService<T>;
        export let hooks: { toObject: (options: DocumentToObjectOptions, dataField?: string) => Hook; };
    }

    export = init;
}
