import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { NextFunction, Request, RequestHandler, Response } from 'express';

function bodyValidators(props: string[]): RequestHandler {
    return function(req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            res.status(422).send('Invalid Request : no body present');
            return;
        }

        for (let prop of props) {
            if (!req.body[prop]) {
                res.status(422).send(`Invalid Request : no "${prop}" property present in body`);
                return;
            }
        }

        next();
    };
}

export function controller(prefix: string) {
    return function(target: Function) {
        const router = AppRouter.instance;

        // Iterate through all methods on the prototype
        for (let key in target.prototype) {
            const path = Reflect.getMetadata(MetadataKeys.Path, target.prototype, key);
            // By using the enum to type the returned metadata we ensure TS 
            // knows the closed set of possible router methods
            const method: Methods = Reflect.getMetadata(MetadataKeys.Method, target.prototype, key);

            // Not every prototype method will have suitable metadata
            if (path && method) {
                const middlewares = Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) || [];
                const requiredBodyProps = Reflect.getMetadata(MetadataKeys.Validator, target.prototype, key) || [];
                const validator = bodyValidators(requiredBodyProps);
                const routeHandler = target.prototype[key];
                router[method](`${prefix}${path}`, ...middlewares, validator, routeHandler); 
            }
        }
    };
}