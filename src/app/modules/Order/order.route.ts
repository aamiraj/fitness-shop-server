import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../User/user.constant";
import { OrderControllers } from "./order.controller";
import { updateOrderValidationSchema } from "./order.validation";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OrderControllers.getAllOrders
);

router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OrderControllers.getSingleOrder
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateOrderValidationSchema),
  OrderControllers.updateOrder
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OrderControllers.deleteOrder
);

export const OrderRoutes = router;
