import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';

export function use(middleware: RequestHandler) {
    return function(target: any, key: string, desc: PropertyDescriptor) {
        /// Allow for multiple middleware to be applied to same target
        const middlewares = Reflect.getMetadata(MetadataKeys.Middleware, target, key) || [];
        Reflect.defineMetadata(MetadataKeys.Middleware, [...middlewares, middleware], target, key);
    };
}