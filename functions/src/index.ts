import * as functions from 'firebase-functions'
import * as express from 'express'

import {routes as app} from './routes/routes'
// import {middlewareTest} from './utils/middlewareTest'
import { crossDomain } from "./utils/crossDomain"

const main = express()

main.use(crossDomain)
// main.use(middlewareTest)
main.use(app)
export const api = functions.https.onRequest(main)
