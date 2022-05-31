"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckController = void 0;
const Env_1 = require("./../../Env");
const DateUtils_1 = require("../../base/utils/DateUtils");
const SuccessResponse_1 = require("../models/dto/response/success/SuccessResponse");
const HealthCheck_1 = require("../models/domain/HealthCheck");
class HealthCheckController {
    constructor() {
        this.startupAt = new Date();
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let metricInfo = undefined;
            if (req.query.query == 'metric') {
                metricInfo = new HealthCheck_1.MetricInfo(new HealthCheck_1.AppInfo(Env_1.env.app.name, Env_1.env.app.version, Env_1.env.app.host, Env_1.env.app.port, Env_1.env.app.env), new HealthCheck_1.AppMetric(process.memoryUsage(), (0, DateUtils_1.timeSinceFriendly)(this.startupAt), this.startupAt));
            }
            const healthCheck = new HealthCheck_1.HealthCheck(metricInfo);
            next(new SuccessResponse_1.SuccessResponse(healthCheck));
        });
    }
}
exports.HealthCheckController = HealthCheckController;
//# sourceMappingURL=HealthCheckController.js.map