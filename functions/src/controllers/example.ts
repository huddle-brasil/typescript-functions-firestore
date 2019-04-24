import { Request, Response } from "express"
import { Example, ExampleDocument } from "../models/example"
import * as rp from "request-promise-native"
import * as moment from 'moment-timezone'
import { toMoment } from "../utils/date"
import { ENV }  from "../config/env"

export class SoloGameController{
    private async callEndpoint(body) {
        let result
        try {
            result = await rp({
                "method": 'POST',
                "headers": {'content-type' : 'application/json'},
                "uri": ENV.exampleUrl,
                "body": body,
                "json": true
            })
        } catch (error) {
            console.error(error)
            return error
        }
        return result
    }
    
    async route_postJSON(req: Request, res: Response) {
        try {
            const doc = req.body as ExampleDocument
            const example = new Example()
            if (!doc.otherExampleId) return res.status(400).send({"response": "otherExampleId is necessary"})
            Object.assign(example.fields, doc)
            if (!await example.create()) return res.sendStatus(422)
            example.fields.id = example.id
            example.fields = toMoment(example.fields)
            return res.json({
                "soloGame": example.fields,
                "now": moment().tz('America/Sao_Paulo').format()
            })
        } catch (error) {
            return res.json({
                error
            })
        }
    }

    async route_getJSON(req: Request, res: Response) {
        const exampleId = req.params.exampleId
        if (!exampleId) return res.status(400).send({"response": "exampleId is necessary"})
        const example = new Example()
        if (!await example.load(exampleId)) return res.status(400).send({"response": "example not found", exampleId: exampleId})
        example.fields.id = example.id
        example.fields = toMoment(example.fields)
        return res.json({
            "example": example.fields, 
            "now": moment().tz('America/Sao_Paulo').format()
        })
    }

    async route_getOtherExampleExamplesJSON(req: Request, res: Response) {
        const otherExampleId = res.get("otherExampleId") || req.query.otherExampleId
        if (!otherExampleId) return res.status(400).send({"response": "otherExampleId is necessary"})
        const examples: any = await new Example().loadByProperty("otherExampleId", otherExampleId)
        if (!examples) return res.status(422).send({"response": "error on get examples by otherExampleId"})
        return res.json({
            examples,
            "now": moment().tz('America/Sao_Paulo').format()
        })
    }
}

export const instance = new SoloGameController() 