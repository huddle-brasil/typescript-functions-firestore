import * as express from "express";
import { exampleRouter } from "./example"

const app = express()

app.use('/examples', exampleRouter)

export const routes = app