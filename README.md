<a name="readme-top"></a>

<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![NPM][npm-shield]][npm-url]

</div>

<br />
<div align="center">
  <a href="https://github.com/lottojs/body-parser">
    <img src=".github/logo.png" alt="Logo" width="100" height="115">
  </a>

  <h3 align="center">@lottojs/body-parser</h3>

  <p align="center">
    NodeJS HTTP Request path and query parameters parser.
    <br />
    <br />
    <a href="https://github.com/lottojs/body-parser/issues">Report Bug</a>
    ·
    <a href="https://github.com/lottojs/body-parser/issues">Request Feature</a>
  </p>
</div>


## About The Project

HTTP Middleware done to parse body parameter from a given request, initially created to serve the [@lottojs/router](https://github.com/lottojs/router) package but nothing excludes it to be also used by the community.

Supported Content-Types:
- [x] Multipart Form (multipart/form-data).
- [x] Form URL Encoded (application/x-www-form-urlencoded).
- [x] JSON (application/json).
- [x] Text (text/plain).

## Documentation
Complete API documentation is available at [lottojs.tech][documentation-url].

## Getting Started

### Installation
   ```sh
    npm i @lottojs/body-parser
   ```
### Usage
It will depend on your scenario, basically the package exports a middleware called `bodyParser`. This middleware can be used being called and it returns a promise awaiting to receive a request and next parameters. On the end it put's the parsed body if exists at `req.body` object, all ready to be used.

```typescript
    import { createServer } from 'node:http';
    import { paramsParser } from '@lottojs/body-parser';

    createServer(
        async (req: IncomingMessage, res: ServerResponse) => {
                ...
                if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
                    bodyParser()(req, next())
                }
                ...
        },
    )
```

## Contributing

All forms of contributions are more than welcome! You can contribute in the following ways:

- Create an Issue
- Create a Pull Request
- Create third-party middlewares
- Share with your friends
- Make your application with `Lotto`.

For more details, see [Contribution Guide](./CONTRIBUTING.md).

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[contributors-shield]: https://img.shields.io/github/contributors/lottojs/body-parser.svg?style=for-the-badge
[contributors-url]: https://github.com/lottojs/body-parser/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lottojs/body-parser.svg?style=for-the-badge
[forks-url]: https://github.com/lottojs/body-parser/network/members
[stars-shield]: https://img.shields.io/github/stars/lottojs/body-parser.svg?style=for-the-badge
[stars-url]: https://github.com/lottojs/body-parser/stargazers
[issues-shield]: https://img.shields.io/github/issues/lottojs/body-parser.svg?style=for-the-badge
[issues-url]: https://github.com/lottojs/body-parser/issues
[license-shield]: https://img.shields.io/github/license/lottojs/body-parser.svg?style=for-the-badge
[license-url]: https://github.com/lottojs/body-parser/blob/master/LICENSE.txt
[npm-shield]: https://img.shields.io/npm/v/@lottojs/body-parser?style=for-the-badge&logo=npm&logoColor=FFFFFF&labelColor=555555&color=CB0001
[npm-url]: https://www.npmjs.com/package/@lottojs/body-parser
[documentation-url]: https://lottojs.tech
