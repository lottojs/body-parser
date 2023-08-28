import { MultipartContent } from '@core/types'

const CONTENT_TYPE = 'Content-Type'
const CONTENT_DISPOSITION = 'Content-Disposition'

export interface AbstractMultipart {
    parse(body: Buffer, boundary: string): MultipartContent[]
}

export class Multipart {
    /**
     * Parse a multipart body and return all it's fields.
     * @param body buffered body
     * @param boundary string
     * @returns MultipartContent[]
     */
    public parse(body: Buffer, boundary: string): MultipartContent[] {
        const multipartArray: MultipartContent[] = []

        let boundaryHeaderStarted = false
        let boundaryContentStarted = false
        let lastlineBytes: number[] = []

        let content: number[] = []

        let multipartElement = this.createNewMultipart()
        for (let i = 0; i < body.length; i++) {
            const byteContent = body[i]

            if (byteContent === 0x0a) {
                const lineContent = Buffer.from(lastlineBytes).toString()

                if (
                    !boundaryHeaderStarted &&
                    lineContent.indexOf(boundary) !== -1
                ) {
                    if (boundaryContentStarted) {
                        multipartElement.content = Buffer.from(content)
                        multipartArray.push(multipartElement)
                        multipartElement = this.createNewMultipart()
                        content = []
                    }
                    boundaryHeaderStarted = true
                    boundaryContentStarted = false
                } else if (boundaryHeaderStarted) {
                    this.parseBoundaryHeaderContent(
                        lineContent,
                        multipartElement,
                    )

                    if (lineContent.length === 1) {
                        boundaryHeaderStarted = false
                        boundaryContentStarted = true
                    }
                } else if (boundaryContentStarted) {
                    content.push(...lastlineBytes)
                    content.push(byteContent)
                }

                lastlineBytes = []
            } else {
                lastlineBytes.push(byteContent)
            }
        }

        return multipartArray
    }

    /**
     * Retrieve informations from the body.
     * @param lineContent multipart line
     * @param multipartElement multipart content
     */
    private parseBoundaryHeaderContent(
        lineContent: string,
        multipartElement: MultipartContent,
    ) {
        if (lineContent.indexOf(CONTENT_TYPE) !== -1) {
            multipartElement.contentType = lineContent.split(':')[1].trim()
        } else if (lineContent.indexOf(CONTENT_DISPOSITION) !== -1) {
            const nameContent = lineContent.split('=')[1]
            multipartElement.name = nameContent.substring(
                1,
                nameContent.indexOf('"', 1),
            )

            const fileNameContent = lineContent.split('=')[2]
            if (fileNameContent) {
                multipartElement.fileName = fileNameContent.substring(
                    1,
                    fileNameContent.indexOf('"', 1),
                )
            }
        }
    }

    /**
     * Create a new blank multipart content.
     * @returns blank MultipartContent
     */
    private createNewMultipart(): MultipartContent {
        return {
            contentType: '',
            content: Buffer.alloc(0),
            fileName: '',
            name: '',
        }
    }
}
