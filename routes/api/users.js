const express = require('express');

const ctrl = require("../../controllers/users");
const {ctrlWrapper} = require("../../helpers");

const {validateBody, authenticate, upload} = require('../../middlewares');

const {schemas} = require('../../models/user')

const router = express.Router();

router.post("/signup", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));
router.post("/verify", validateBody(schemas.emailSchema), ctrlWrapper(ctrl.resendEmail));

router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch("/", authenticate, validateBody(schemas.subscriptionSchema), ctrlWrapper(ctrl.subscription));

router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

module.exports = router;