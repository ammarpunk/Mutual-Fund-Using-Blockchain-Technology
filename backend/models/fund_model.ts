import mongoose, {Schema} from 'mongoose'

const MODEL_NAME = 'Fund';

const fundSchema = new Schema({
    address: String,
    name: String,
    image: String,
    summary: String,
    rating: Number,
    cap: String, // Large Cap, Mid Cap, Small Cap
    details: {
        risk: String,
        sip: Number,
        expense: Number,
        nav: Number,
        size: {
            type: "Number",
            default: 0
        }
    },
    pros: [String],
    cons: [String],
    description: String,
    objective: String,
    tax: String,
    investments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Investment'
        }
    ]
}, {
    timestamps: true
})

const Model = (mongoose.models && mongoose.models[MODEL_NAME]) || mongoose.model(MODEL_NAME, fundSchema);

export default Model
