import {instance as controller} from '../controllers/example'
import * as express from "express"

const router = express.Router()
router.post('/', controller.route_postJSON.bind(controller))
router.get('/', controller.route_getJSON.bind(controller))
router.get('/otherExample-examples', controller.route_getOtherExampleExamplesJSON.bind(controller))

export const exampleRouter = router