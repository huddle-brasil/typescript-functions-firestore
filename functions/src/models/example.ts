import {Base, Document} from "./base"
import { firestore } from "firebase-admin"
import * as moment from "moment"
import { toDate } from "../utils/date"
import { OtherExample, OTHER_EXAMPLE_OBJECT } from "./otherExample";

export type ExampleDocument = Document & {
    id?: string
    otherExampleId: string
    arrayOfObject?: {
        string: string
        createdAt: firestore.Timestamp
        boolean: boolean
    }[]
    arrayOfTimestamp?: firestore.Timestamp[]
    timestamp?: firestore.Timestamp
    enum: ExampleEnum
    number?: number
}

export enum ExampleEnum {
    FIRST_VALUE = "first value",
    SECOND_VALUE = "second value"
}

export const EXAMPLE_CONST = "any value"

export class Example extends Base {

    fields: ExampleDocument;
    constructor() {
        super("examples");

        this.fields = {
            otherExampleId: "",
            enum: ExampleEnum.FIRST_VALUE
        }
    }

    async create() {
        this.id = this.fields.id;
        return await super.save();
    }

    async save() {
        return await super.save();
    }

    async otherExampleExamples(otherExampleId) {
        const snap = await this.db.where('otherExampleId', '==', otherExampleId).get()
        if (!snap) return false
        const examples = []
        snap.forEach(example => {
            let fields = example.data()
            fields.id = example.id
            fields = toDate(fields)
            examples.push(fields)
        })
        return examples
    }
}