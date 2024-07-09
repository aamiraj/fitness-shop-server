import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is retrieved succesfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products are retrieved succesfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { customer } = req.body;
  const result = await ProductServices.updateProductIntoDB(id, customer);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is updated succesfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is deleted succesfully",
    data: result,
  });
});

export const ProductControllers = {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
