import { Router, Request, Response, NextFunction } from 'express';

// Use extending interface to override assumption in type script definition file
// that Request will always contain a 'body' property... this is only the case
// if we use the 'bodyParser' middleware
interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined }
}

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

const router = Router();

router.get('/login', (req: Request, res: Response) => {
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
});

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;
   
    if (email && password && email === 'bob@bobbins.com' && password === 'bob') {
        // Mark the person as logged in
        req.session = { loggedIn: true };
        res.redirect('/');
    } else {
        res.send('Invalid email/password combination');
    }
});

router.get('/', (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div>
                <div>You are currently logged in</div>
                <a href='/logout'>Log Out</a>
            </div>
        `);
    } else {
        res.send(`
            <div>
                <div>You are not currently logged in</div>
                <a href='/login'>Login</a>
            </div>
        `);
    }
});

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined;
    res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send(`
        <div>
            <div>Welcome to a protected route... you are currently logged in</div>
        </div>
    `);
});

export { router };