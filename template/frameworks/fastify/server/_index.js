require('mithril/test-utils/browserMock')(global)

import Mitts from 'mitts'
import { express as MittsExpress } from 'mitts/loader'
import Fastify from 'fastify'

import config from '../config/config'
import client from '../src/index<% if (typescript === "yes") { %>.ts<% } %>'

const fastify = Fastify({
  logger: true,
})

async function start() {
  const port = process.env.PORT || 3000
  const host = process.env.HOST || 'localhost'

  const mitts = MittsExpress({
    html: config.paths.htmlEntry,
    manifest: config.paths.mittsManifest,
    createSession(cookies) {},
    createStore: client.store,
    routes: client.routes,
  })

  fastify.use(mitts.middleware())

  await Mitts.preloadAll()

  fastify.listen(port, host, (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
}

start()
