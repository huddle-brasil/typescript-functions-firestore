import {Base, Document} from "./base"
import { firestore } from "firebase-admin"

export type OtherExampleDocument = Document & {
    id?: string
    timestamp?: firestore.Timestamp
    string: string
    enum: OtherExampleEnum
    number: number
}

export enum OtherExampleEnum {
    FIRST_VALUE = "first value",
    SECOND_VALUE = "second value"
}

export const OTHER_EXAMPLE_OBJECT = {
    firstValue: 1,
    secondValue: 2,
    thirdValue: {
        firstValue: 3, 
        secondValue: 4
    }
}

export class OtherExample extends Base {

    fields: OtherExampleDocument
    constructor() {
        super("otherExamples")
        this.fields = {
            string: "",
            enum: OtherExampleEnum.FIRST_VALUE,
            number: OTHER_EXAMPLE_OBJECT.firstValue
        }
    }

    async create() {
        this.id = this.fields.id
        return await super.save()
    }

    async save() {
        return await super.save()
    }

}