import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../User/user.constant";
import { ProductControllers } from "./product.controller";
import {
  ProductValidations,
  updateProductValidationSchema,
} from "./product.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct
);

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
