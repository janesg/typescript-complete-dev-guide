import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

// Customise type of PropertyDescriptor's value using custom interface
interface RouteHandlerDescriptor extends PropertyDescriptor {
    // value property is optional in PropertyDescriptor
    // so must also override as optional
    value?: RequestHandler;
}

function routeBinder(method: string) {
    return function (path: string) {
        return function(target: any, key: string, desc: RouteHandlerDescriptor) {
            Reflect.defineMetadata(MetadataKeys.Path, path, target, key); 
            Reflect.defineMetadata(MetadataKeys.Method, method, target, key); 
        };
    };
}

export const get = routeBinder(Methods.Get);
export const post = routeBinder(Methods.Post);
export const put = routeBinder(Methods.Put);
// Can't use 'delete' as reserved word in TS
export const del = routeBinder(Methods.Delete);
export const patch = routeBinder(Methods.Patch);