/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";
import { USER_ROLE } from "./user.constant";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-customer",
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createCustomer
);

router.post(
  "/create-admin",
  auth(USER_ROLE.superAdmin),
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createAdmin
);

router.post(
  "/change-status/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus
);

router.get(
  "/me",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.customer),
  UserControllers.getMe
);

export const UserRoutes = router;
