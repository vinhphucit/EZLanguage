import {NextFunction, Request, Response} from 'express';

import {BLACKLIST_LOG} from "../utils/Constants";
import {Logger} from "../utils/Logger";

export class ReqFormaterMiddleware {
    public handleRequest(request: Request, response: Response, next: NextFunction) {
        
        const {method, url, body, originalUrl} = request;
        if (!BLACKLIST_LOG.includes(url)) {
            Logger.info("--> Method:" + method + ", URl:" + originalUrl);
            Logger.info("--> Body:" + JSON.stringify(body));
        }
        next()
    }
}
