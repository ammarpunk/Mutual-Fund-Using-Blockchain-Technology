import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

const connectDB = (handler: any) => async (req: NextRequest, res: NextResponse) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(`mongodb://${process.env.NEXT_PUBLIC_DB_USER}:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0-shard-00-00.vfbq7.mongodb.net:27017,cluster0-shard-00-01.vfbq7.mongodb.net:27017,cluster0-shard-00-02.vfbq7.mongodb.net:27017/${process.env.NEXT_PUBLIC_DB_NAME}?ssl=true&replicaSet=atlas-2s8b2p-shard-0&authSource=admin&retryWrites=true&w=majority`);
    return handler(req, res);
};

export default connectDB;