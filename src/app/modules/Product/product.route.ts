import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../User/user.constant";
import { ProductControllers } from "./product.controller";
import {
  ProductValidations,
  updateProductValidationSchema,
} from "./product.validation";
import { upload } from "../../middlewares/multerHelper";
import { uploadToCloudinary } from "../../utils/cloudinaryHelper";
import { Express } from "express";

const router = express.Router();

const uploadImageToCloud = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.files) {
      const images = await uploadToCloudinary(
        req?.files as Express.Multer.File[]
      );
      const data = JSON.parse(req.body.data);
      data.images = images.concat(data.images);
      req.body = data;
    }
    next();
  } catch (error) {
    next(error);
  }
};

//remember to add auth middleware
router.post(
  "/",
  upload.array("images"),
  uploadImageToCloud,
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct
);

// router.post(
//   "/",
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   upload.array("images"),
//   uploadImageToCloud,
//   validateRequest(ProductValidations.createProductValidationSchema),
//   ProductControllers.createProduct
// );

router.get("/", ProductControllers.getAllProducts);

router.get("/:id", ProductControllers.getSingleProduct);

// remember to add auth middleware,
router.patch(
  "/:id",
  upload.array("images"),
  uploadImageToCloud,
  validateRequest(updateProductValidationSchema),
  ProductControllers.updateProduct
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProductControllers.deleteProduct
);

export const ProductRoutes = router;
