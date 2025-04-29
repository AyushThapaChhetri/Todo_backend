"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
const auth_controller_1 = require("./../src/controller/auth.controller");
const models = {};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "ignore", "bodyCoercion": true });
function RegisterRoutes(app) {
    const args_AuthController_signup = {
        signupData: { "in": "body", "name": "signupData", "required": true, "dataType": "any" },
    };
    app.post('/api/auth/signup', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1._AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1._AuthController.prototype.signup)), async function _AuthController_signup(request, response, next) {
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: args_AuthController_signup, request, response });
            const controller = new auth_controller_1._AuthController();
            await templateService.apiHandler({
                methodName: 'signup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    const args_AuthController_login = {
        loginData: { "in": "body", "name": "loginData", "required": true, "dataType": "any" },
    };
    app.post('/api/auth/login', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1._AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1._AuthController.prototype.login)), async function _AuthController_login(request, response, next) {
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: args_AuthController_login, request, response });
            const controller = new auth_controller_1._AuthController();
            await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    const args_AuthController_refresh = {
        refreshData: { "in": "body", "name": "refreshData", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "refreshToken": { "dataType": "string", "required": true } } },
    };
    app.post('/api/auth/refresh', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1._AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1._AuthController.prototype.refresh)), async function _AuthController_refresh(request, response, next) {
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: args_AuthController_refresh, request, response });
            const controller = new auth_controller_1._AuthController();
            await templateService.apiHandler({
                methodName: 'refresh',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    const args_AuthController_logout = {
        logoutData: { "in": "body", "name": "logoutData", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "refreshToken": { "dataType": "string", "required": true } } },
    };
    app.post('/api/auth/logout', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1._AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1._AuthController.prototype.logout)), async function _AuthController_logout(request, response, next) {
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: args_AuthController_logout, request, response });
            const controller = new auth_controller_1._AuthController();
            await templateService.apiHandler({
                methodName: 'logout',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
}
