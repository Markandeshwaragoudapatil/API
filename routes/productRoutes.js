const express = require("express");
const asyncHandler=require("../utils/asyncHandler");

const router = express.Router();

const {
    getProduct,getAllProducts,addProduct,deleteProduct,modifyProduct
} = require("../controllers/productController");

router.get("/",asyncHandler(getAllProducts));
router.get("/:id",asyncHandler(getProduct));
router.post("/",asyncHandler(addProduct));
router.delete("/:id",asyncHandler(deleteProduct));
router.put("/:id",asyncHandler(modifyProduct))

module.exports = router;