import Mongoose from 'mongoose';

export async function connect(uri: string): Promise<void | never> {
    try {
        await Mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log(`successfully connected to db`);
    } catch (error: any) {
        console.log(`error occurred when connecting to database error: ${error.message}`);
    }
}
