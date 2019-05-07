import {db as _db} from "../main"
import { firestore } from "firebase-admin";
import { toMoment } from "../utils/date"

export type Document = FirebaseFirestore.DocumentData & { 
    createdAt?: firestore.Timestamp,
    updatedAt?: firestore.Timestamp
}
export abstract class Base { 
    id: string = ""
    fields: Document | FirebaseFirestore.DocumentData;
    readonly db: FirebaseFirestore.CollectionReference;
    constructor(context: string) {
        this.db = _db.collection(context)
    }

    ref() {
        if(this.id.length < 0) {
            const doc = this.db.doc()
            this.id = doc.id
            return doc
        }
        return this.db.doc(this.id)
    }

    async save() {
        if(this.id) {
            if(!this.fields.createdAt) {
                this.fields.createdAt = firestore.Timestamp.now()
            } else {
                this.fields.updatedAt = firestore.Timestamp.now()
            }
            await this.db.doc(this.id).set(this.fields, {merge: true})
            return true
        }
        this.fields.createdAt = firestore.Timestamp.now()
        const docRef = await this.db.add(this.fields)
        this.id = docRef.id
        return true
    }

    async load(id: string) {
        const doc = (await this.db.doc(id).get()).data()
        if(!doc) return null
        this.fields = doc
        this.id = id
        return this
    }
    
    async loadAll() {
        const snap = await this.db.get()
        if (!snap) return null
        const docs = []
        snap.docs.forEach(doc => {
            let fields = doc.data()
            fields.id = doc.id
            fields = toMoment(fields)
            docs.push({id: doc.id, fields})
        })
        if (docs.length === 1) return docs[0]
        if (docs instanceof Array && docs.length === 0) return false
        return docs
    }

    async loadByProperty(property: string, value: any) {
        const snap = await this.db.where(property, '==', value).get()
        if (!snap) return null
        const docs = []
        snap.forEach(doc => {
            let fields = doc.data()
            fields.id = doc.id
            fields = toMoment(fields)
            docs.push({id: doc.id, fields})
        })
        if (docs.length === 1) return docs[0]
        if (docs instanceof Array && docs.length === 0) return false
        return docs
    }

    async loadContainsInProperty(property: string, value: any) {
        const snap = await this.db.get()
        if (!snap) return null
        const docs = []
        snap.forEach(doc => {
            let fields = doc.data()
            if (fields[property].every(item => item !== value)) return
            fields.id = doc.id
            fields = toMoment(fields)
            docs.push({id: doc.id, fields})
        })
        if (docs.length === 1) return docs[0]
        if (docs instanceof Array && docs.length === 0) return false
        return docs
    }
}