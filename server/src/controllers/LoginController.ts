import { NextFunction, Request, Response } from 'express';
import { get, controller, use, bodyValidator, post } from './decorators';

// Simple test middleware
function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request was made...');
    next();
}

@controller('/auth')
class LoginController {

    @get('/login')
    @use(logger)
    login(req: Request, res: Response): void {
        res.send(`
            <form method="POST">
                <div>
                    <label>Email</label>
                    <input name="email"/>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" />
                </div>
                <button>Submit</button>
            </form>
        `);
    }
    
    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response): void {
        const { email, password } = req.body;
       
        if (email === 'bob@bobbins.com' && password === 'bob') {
            // Mark the person as logged in
            req.session = { loggedIn: true };
            res.redirect('/');
        } else {
            res.send('Invalid email/password combination');
        }
    }

    @get('/logout')
    logout(req: Request, res: Response): void {
        req.session = undefined;
        res.redirect('/auth/login');
    }
       
}