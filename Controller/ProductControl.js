const mongoose = require("mongoose");
const productModel = require("../Models/productModel");
const uploadedMealModel = require("../Models/UploadedMealsModel");

const addProductHandler = async (req, res) => {
  // console.log( req.middleWare1);
  console.log(req.user);

  try {
    const addProduct = await productModel.create(req.body);

    if (!addProduct) {
      res.status(404).json({
        Message: "Product unable to add",
        Status: "Error",
      });
    }
    return res.status(200).json({
      Message: "Product Added Succesfully",
      Staus: "Succesful",
      Product: addProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllProductsHandler = async (req, res) => {
  try {
    const showAllProducts = await productModel.find();
    if (!showAllProducts) {
      res.status(404).json({
        Message: "Product Unable To fetch",
        Status: "Error",
      });
    }
    return res.status(202).json({
      Message: "All Products Fetched",
      Status: "Successful",
      No_of_products: showAllProducts.length,
      AllProducts: showAllProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteAllProductHandler = async (req, res) => {
  try {
    const deleteAll = await productModel.deleteMany({});
    if (deleteAll) {
      res.status(200).json({
        Message: "All Products Deleted",
        Status: "Succecc",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProductByIdHandler = async (req, res) => {
  const { productId } = req.params;
  try {
    const getProductById = await productModel.findById(productId);
    if (!getProductById) {
      res.status(404).json({
        Message: "Product Id Not Found",
        Status: "success",
      });
    }
    return res.status(201).json({
      Message: `Product Fetched`,
      Status: "Successful",
      product: getProductById,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProductHandler = async (req, res) => {
  const { productId } = req.params;
  try {
    const updateProduct = await productModel.findByIdAndUpdate(
      productId,
      req.body
    );
    if (!updateProduct) {
      res.status(404).json({
        Message: "Unabble to update product",
        Status: "Error",
      });
    }
    return res.status(201).json({
      Message: "Product Updated Successfully",
      Status: "Suuccess",
      UpdatedProuct: updateProduct,
    });
  } catch (error) {
    console.log(error);
  }
};
const uploadMealWish = async (req, res) => {
  let userProfile;
  try {
    const uploadMeal = await uploadedMealModel.create(req.body);
    if(!uploadMeal){
      res.status(401).json({
        Message : "Unable To Upload Products"
      })
    }
    return res.status(201).json({
      Message : "Product Uploaded Successfullyy",
      Status : "Success",
      userProfile : req.user,
      Uploaded_Products : uploadMeal
    })
  } catch (error) {
    console.log(error);
    
  }
};

const ViewAllUploadedMeal = async(req,res)=>{   
  try {
    const getUploadedMeal = await uploadedMealModel.find()
    if(!getUploadedMeal){
      res.status(401).json({
        Message : "Meals unable to fetch"
      })
    }
    return res.status(201).json({
      Message : "Uploaded Meal Fetched",
      Status : "Succcess",   
      No_Of_UploadedMeals : getUploadedMeal.length,
      getUploadedMeal
    })
  } catch (error) {
    console.log(error);
    
  }
}
module.exports = {
  addProductHandler,
  getAllProductsHandler,
  deleteAllProductHandler,
  getProductByIdHandler,
  updateProductHandler,
  uploadMealWish,
  ViewAllUploadedMeal
};
