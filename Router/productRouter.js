const express = require("express");
const {
  addProductHandler,
  getAllProductsHandler,
  deleteAllProductHandler,
  getProductByIdHandler,
  updateProductHandler,
  uploadMealWish,
  ViewAllUploadedMeal,
} = require("../Controller/ProductControl");
const testMiddleWare = require("../MiddleWares/middleWare1");
const isAdmin = require("../MiddleWares/isAdmin");
const isPremiumUser = require("../MiddleWares/isPremimumUser");
const isLoggedIn = require("../MiddleWares/isLoggedIn");
const isActive = require("../MiddleWares/isActive");
const productRouter = express.Router();

productRouter.post("/product/add", isLoggedIn, isActive,   addProductHandler);
productRouter.get("/product/all", getAllProductsHandler);
productRouter.delete("/product/delete",isAdmin, deleteAllProductHandler);
productRouter.get("/product/:productId", getProductByIdHandler);
productRouter.patch("/product/update/:productId", updateProductHandler);
productRouter.post("/product/uploadMeal",  isLoggedIn,isPremiumUser , uploadMealWish)
productRouter.get("/product/view/upload", isAdmin,ViewAllUploadedMeal)
      
module.exports = productRouter;    
