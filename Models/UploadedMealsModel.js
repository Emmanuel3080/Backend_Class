const mongoose = require("mongoose");


const uploadedMealSchema = new mongoose.Schema({
    ProductName : {
    type : String,
    required: true
    },
    preferredPrice : {
        type : Number,
        required : true
    },
    Reasons : {
        type : String,
        minLength : 10
    }


    
})

const uploadedMealModel = mongoose.model("UploadedMeals", uploadedMealSchema)

module.exports = uploadedMealModel