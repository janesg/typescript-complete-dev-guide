import express from 'express';

export class AppRouter {
    private static theRouter: express.Router;

    // Create router as a singleton
    static get instance(): express.Router {
        if (!AppRouter.theRouter) {
            AppRouter.theRouter = express.Router();
        }

        return AppRouter.theRouter;
    }
}