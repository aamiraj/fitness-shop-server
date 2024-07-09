import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../User/user.constant";
import { ProductControllers } from "./product.controller";
import { updateProductValidationSchema } from "./product.validation";

const router = express.Router();

router.get(
  "/",
  ProductControllers.getAllProducts
);

router.get(
  "/:id",
  ProductControllers.getSingleProduct
);

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
