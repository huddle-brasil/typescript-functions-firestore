
import { firestore } from "firebase-admin";
import * as moment from 'moment-timezone';

export const toMoment = fields => {
    for (const i in fields) {
        if (fields[i] instanceof firestore.Timestamp) {
            fields[i] = moment(fields[i].toDate()).tz('America/Sao_Paulo').format()
            continue
        }
        if (fields[i].constructor === [].constructor || fields[i].constructor === {}.constructor) {
            fields[i] = toMoment(fields[i])
        }
    }
    return fields
}

export const toTimestamp = fields => {
    if (fields.constructor !== [].constructor && fields.constructor !== {}.constructor) {
        if (moment.isMoment(fields)) {
            return firestore.Timestamp.fromDate(fields.toDate())
        }
        return fields
    }

    for (const i in fields) {
        if (moment.isMoment(fields[i])) {
            fields[i] = firestore.Timestamp.fromDate(fields[i].toDate())
            continue
        }
        if (fields[i].constructor === [].constructor || fields[i].constructor === {}.constructor) {
            fields[i] = toTimestamp(fields[i])
        }
    }
    return fields
}