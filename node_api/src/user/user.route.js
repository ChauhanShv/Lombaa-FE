const router = require("../modules/express").instance.Router();
const { checkSchema } = require("express-validator");
const UserController = require("./user.controller");
const schema = require("./user.data-schema");
const {
    setPassword: setPasswordSchema, activeSchema,
    phoneSchema, emailSchema,
    forgetPasswordSchema, connectGoogleSchema,
    connectFacebookSchema,
    updateSchema,
    pictureUploadSchema,
    coverUploadSchema
} = require("./schema");
const authMiddleware = require("../auth/auth.middleware");

const multer = require("multer")
const storage = multer.memoryStorage()

const controller = new UserController();

module.exports = () => {
    router.post("/", checkSchema(schema), (req, res, next) => controller.create(req, res, next));

    router.put("/password", authMiddleware, checkSchema(setPasswordSchema), (req, res, next) => controller.setPassword(req, res, next));
    router.put("/active", authMiddleware, checkSchema(activeSchema), controller.updateActive);
    router.put("/email", authMiddleware, checkSchema(emailSchema), controller.changeEmail);
    router.post("/email", authMiddleware, controller.verifyEmail);
    router.put("/phone", authMiddleware, checkSchema(phoneSchema), controller.updatePhone);

    router.delete("/facebook", authMiddleware, controller.deleteFacebook);
    router.delete("/google", authMiddleware, controller.deleteGoogle);

    router.post('/password/forget', checkSchema(forgetPasswordSchema), controller.forgetPassword);
    router.get('/password/reset/verify-token', controller.verifyResetPasswordToken);
    router.put('/password/reset', controller.resetPassword);

    router.put("/facebook", checkSchema(connectFacebookSchema), authMiddleware, controller.connectFacebook);
    router.put("/google", checkSchema(connectGoogleSchema), authMiddleware, controller.connectGoogle);

    router.get("/isActive", authMiddleware, controller.isActive);

    router.post("/update", authMiddleware, checkSchema(updateSchema), controller.updateUser);

    router.put("/picture", multer({ storage: storage }).any(), checkSchema(pictureUploadSchema), authMiddleware, controller.uploadProfilePicture);
    router.put("/cover", multer({ storage: storage }).any(), checkSchema(coverUploadSchema), authMiddleware, controller.uploadCoverPicture);

    return router;
};
