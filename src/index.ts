import { Parser } from '@core/parser'
import { Context, Middleware } from '@core/types'

/**
 * Parse Body comming from an incoming Request.
 * @returns Middleware Function
 */
export function bodyParser(): Middleware {
    const { parse } = new Parser()

    return async ({ req, next }: Context) => {
        await parse(req, next)
    }
}
