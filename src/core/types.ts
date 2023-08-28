import { IncomingMessage } from 'node:http'

export type MultipartContent = {
    name: string
    fileName: string
    contentType: string
    content: Buffer
}

export interface Request extends IncomingMessage {
    body: any
    files: MultipartContent[] | null
    [key: string]: any
}

export type NextFunction = (...args: any[]) => void

export type Context = {
    /**
     * Request Object
     */
    req: Request

    /**
     * Next Function, mostly used on middlewares in order to can go ahead
     * to the reqeuest.
     */
    next: NextFunction
}

export type Middleware = (ctx: Context) => void
