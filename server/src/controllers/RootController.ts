import { NextFunction, Request, Response } from 'express';
import { get, controller, use } from './decorators';

// Middleware for protecting routes
function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    } else {
        res.status(403);
        res.send('Unauthorized');
    }
}

@controller('')
class RootController {

    @get('/')
    root(req: Request, res: Response): void {
        if (req.session && req.session.loggedIn) {
            res.send(`
                <div>
                    <div>You are currently logged in</div>
                    <a href='/auth/logout'>Log Out</a>
                </div>
            `);
        } else {
            res.send(`
                <div>
                    <div>You are not currently logged in</div>
                    <a href='/auth/login'>Login</a>
                </div>
            `);
        }
    }
    
    @get('/protected')
    @use(requireAuth)
    protected(req: Request, res: Response): void {
        res.send(`
            <div>
                <div>Welcome to a protected route... you are currently logged in</div>
            </div>
        `);
    }
    
}