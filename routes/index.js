import { Router } from "express";
import authRoutes from './authRoutes.js';
import workspaceRoutes from './workspaceRoutes.js';
import channelRoutes from './channelRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

const routes = [
    ...authRoutes,
    ...workspaceRoutes,
    ...channelRoutes,
    ...userRoutes,
];

routes.forEach((eachRoute) => {
        router[eachRoute.method](`/${eachRoute.prefix}${eachRoute.path}`,
            ...(eachRoute.request ? eachRoute.request : []),
            ...(eachRoute.validators ? eachRoute.validators : []),
            ...(eachRoute.middlewares ? eachRoute.middlewares : []),
            eachRoute.action);
})

export default router;