import { Schema, model } from "mongoose";

interface IVisit {
    ip: string,
    browser: string,
    date: Date
}

const visitSchema = new Schema<IVisit>({
    ip: {
        type: String,
        required: true,
    },
    browser: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

export default model<IVisit>("visit", visitSchema);