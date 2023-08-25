import mongoose, {Schema} from 'mongoose'

const MODEL_NAME = 'Investor';

const investorSchema = new Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    investments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Investment'
        }
    ]
}, {
    timestamps: true
})

const Model = (mongoose.models && mongoose.models[MODEL_NAME]) || mongoose.model(MODEL_NAME, investorSchema);

export default Model
