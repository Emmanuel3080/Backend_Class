const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,

    },
    description : {
        type : String
    },

    status : {
        type : String,
        default : "pending",
        enum : ["pending", "rejected", "approved"]
    }
})

const productModel = mongoose.model("emmaproducts",productSchema)

module.exports = productModel