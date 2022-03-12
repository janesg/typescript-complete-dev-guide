import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

// Body parser adds the 'body' property to the request
app.use(bodyParser.urlencoded({ extended: true }));
// Cookie session adds the 'session' property to the request
app.use(cookieSession({ keys: ['yuwtrfdqwgxi'] }))
app.use(router);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});