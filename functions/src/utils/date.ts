
import { firestore } from "firebase-admin";
import * as moment from 'moment-timezone';

export const toDate = fields => {
    for (const i in fields) {
        if (fields[i] instanceof firestore.Timestamp) {
            fields[i] = moment(fields[i].toDate()).tz('America/Sao_Paulo').format()
            continue
        }
        if (fields[i].constructor === [].constructor || fields[i].constructor === {}.constructor) {
            fields[i] = toDate(fields[i])
        }
    }
    return fields
}