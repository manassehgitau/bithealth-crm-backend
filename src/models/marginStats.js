import mongoose from "mongoose";

const marginSchema = new mongoose.Schema({
    userProfitMargin: {
        type: Number,
        required: true
    },
    employeeProfitMargin: {
        type: Number,
        required: true
    },
    customerProfitMargin: {
        type: Number,
        required: true
    },
    productsProfitMargin: {
        type: Number,
        required: true
    }
})

const Margin = mongoose.model("Margin", marginSchema);
export default Margin