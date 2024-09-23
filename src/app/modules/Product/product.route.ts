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
  _res: Response,
  next: NextFunction
) => {
  try {
    if (req.files) {
      const images = await uploadToCloudinary(
        req?.files as Express.Multer.File[]
      );
      req.body = { images: images, ...JSON.parse(req.body.data) };
    }
    next();
  } catch (error) {
    next(error);
  }
};

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

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateProductValidationSchema),
  ProductControllers.updateProduct
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProductControllers.deleteProduct
);

export const ProductRoutes = router;
