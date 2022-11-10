const express = require('express');
const ctrl = require('../../controllers/contacts');
const {ctrlWrapper} = require("../../helpers")

const {isValidId, validateBody} = require('../../middlewares');

const {schemas} = require("../../models/contact")

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll))

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById))

router.post("/",  validateBody(schemas.addSchema), ctrlWrapper(ctrl.add))

router.put("/:contactId", isValidId, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById))

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById))

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusById))

module.exports = router;
