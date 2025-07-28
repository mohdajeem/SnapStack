import mongoose from 'mongoose';

const defaultJsxCode = `export default function App() {
      return <h1>Enter a prompt and click Generate!</h1>
    }`;

const messageSchema = mongoose.Schema({
        role: {
            type: String,
            enum: ['user', 'assistant'],
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
    {
        _id: false,
        timestamps: true
    }
)

const sessionSchema = mongoose.Schema({
        title: {
            type: String
        },
        chatHistory: {
            type: [messageSchema],
            default: []
        },
        jsxCode: {
            type: String,
            default: defaultJsxCode
        },
        cssCode: {
            type: String,
            default: ''
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps : true
    }
);

export default mongoose.model('Session', sessionSchema);