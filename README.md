# leekslazylogger-fastify

[![npm](https://img.shields.io/npm/v/leekslazylogger-fastify/latest?style=flat-square)](https://www.npmjs.com/package/leekslazylogger-fastify)   [![GitHub issues](https://img.shields.io/github/issues/eartharoid/leekslazylogger-fastify?style=flat-square)](https://github.com/eartharoid/leekslazylogger-fastify/issues)    [![GitHub stars](https://img.shields.io/github/stars/eartharoid/leekslazylogger-fastify?style=flat-square)](https://github.com/eartharoid/leekslazylogger-fastify/stargazers)    [![GitHub forks](https://img.shields.io/github/forks/eartharoid/leekslazylogger-fastify?style=flat-square)](https://github.com/eartharoid/leekslazylogger-fastify/network)    [![GitHub license](https://img.shields.io/github/license/eartharoid/leekslazylogger-fastify?style=flat-square)](https://github.com/eartharoid/leekslazylogger-fastify/blob/master/LICENSE)    ![Codacy grade](https://img.shields.io/codacy/grade/8af9d1431018457385c8774147410009?logo=codacy&style=flat-square)    [![Discord support server](https://discordapp.com/api/guilds/451745464480432129/embed.png?style=shield)](https://discord.gg/pXc9vyC)

## About

leekslazylogger-fastify is a logger plugin for fastify.

## Features

- Colours :)
- Status code, route, and time in ms
- Placeholders

## Getting Started

[**Click here to go the docs for customisation instructions.**](https://logger.eartharoid.me/extensions/fastify/)

```js
const FastifyLogger = require('leekslazylogger-fastify');
const log = new FastifyLogger();

// require fastify
const fastify = require('fastify')();

// use logger plugin
fastify.register(log.fastify());
// or
fastify.register(log.fastify(), {
	// options
});
```

## Support

**[Go to the docs](https://logger.eartharoid.me)**, or ask for help in [#general-support](https://discordapp.com/channels/451745464480432129/475351519516950548) on [Discord](https://discord.gg/pXc9vyC).

[![Discord](https://discordapp.com/api/guilds/451745464480432129/widget.png?style=banner4)](https://discord.gg/pXc9vyC)

## Donate

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/eartharoid)
