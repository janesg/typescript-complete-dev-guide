import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/RootController';
import './controllers/LoginController';

const app = express();

// Body parser adds the 'body' property to the request
app.use(bodyParser.urlencoded({ extended: true }));
// Cookie session adds the 'session' property to the request
//  - the random string is used for encryption
app.use(cookieSession({ keys: ['yuwtrfdqwgxi'] }))
app.use(AppRouter.instance);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});