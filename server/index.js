import express from "express"
import mongoose from "mongoose"
const app = express();

const PORT = 5000;



mongoose.connnect().then(() => console.log("SuccesFully")).catch((err) => console.log("Unsuccesfull connection"))


app.listen(PORT, () => {
    console.log(`Listening to Port Number ${PORT}`)
})
