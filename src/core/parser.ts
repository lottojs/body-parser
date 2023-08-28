import { Multipart } from '@core/multipart'
import { NextFunction, Request } from '@core/types'

export interface AbstractParser {
    parse: (req: Request, next: NextFunction) => Promise<void>
}

export class Parser implements AbstractParser {
    /**
     * Parse multipart body.
     * @param req Request
     * @param next NextFunction
     */
    public async parse(req: Request, next: NextFunction): Promise<void> {
        try {
            const type = req.headers['content-type']!

            if (!type) {
                throw Error(
                    '@lottojs/body-parser: missing Content-Type header.',
                )
            }

            const buffers = []
            for await (const chunk of req) buffers.push(chunk)

            const buffer = Buffer.concat(buffers)
            const stringeredBuffer = buffer.toString()

            if (type.startsWith('application/x-www-form-urlencoded')) {
                const params = new URLSearchParams(stringeredBuffer)
                const entries = params.entries();

                const body: Record<string, any> = {}
                for (const [key, value] of entries) body[key] = value

                req.body = body
            }

            if (type.startsWith('application/json')) {
                req.body = JSON.parse(stringeredBuffer)
            }

            if (type.startsWith('multipart/form-data')) {
                const boundary = type.split('boundary=')[1]

                if (boundary) {
                    const multipart = new Multipart()
                    const multiparts = multipart.parse(buffer, boundary)

                    const body: Record<string, any> = {}
                    const files = []
                    for (let i = 0; i < multiparts.length; i++) {
                        const data = multiparts[i]
                        const { contentType } = data

                        if (contentType === '') {
                            const key = data.name.replace('[]', '')
                            const finalContent = data.content
                                .toString()
                                .replace(/(\r\n|\n|\r)/gm, '')

                            if (body[key]) {
                                const newData = [
                                    Array.isArray(body[key])
                                        ? [...body[key]]
                                        : body[key],
                                ]
                                newData.push(finalContent)
                                body[key] = newData.flat()
                            } else {
                                body[key] = finalContent
                            }
                        } else {
                            files.push(data)
                        }
                    }

                    req.body = body
                    req.files = files
                }
            }

            if (type.startsWith('text/plain')) {
                req.body = stringeredBuffer
            }

            next()
        } catch {
            req.body = null
            req.files = null
            next()
        }
    }
}
