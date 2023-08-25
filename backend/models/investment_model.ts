import mongoose, {Schema} from 'mongoose'

const MODEL_NAME = 'Investment';

const investmentSchema = new Schema({
    investor: {
        type: Schema.Types.ObjectId,
        ref: 'Investor'
    },
    fund: {
        type: Schema.Types.ObjectId,
        ref: 'Fund'
    },
    amount: Number
}, {
    timestamps: true
})

const Model = (mongoose.models && mongoose.models[MODEL_NAME]) || mongoose.model(MODEL_NAME, investmentSchema);

export default Model
