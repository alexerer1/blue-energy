"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_1 = require("@nestjs/schedule");
const scheduler_service_1 = require("./scheduler.service");
const scheduler_controller_1 = require("./scheduler.controller");
const reading_entity_1 = require("../readings/entities/reading.entity");
const file_record_entity_1 = require("../files/entities/file-record.entity");
let SchedulerModule = class SchedulerModule {
};
SchedulerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([file_record_entity_1.FileRecord, reading_entity_1.Reading]),
        ],
        providers: [scheduler_service_1.SchedulerService],
        controllers: [scheduler_controller_1.SchedulerController],
        exports: [scheduler_service_1.SchedulerService],
    })
], SchedulerModule);
exports.SchedulerModule = SchedulerModule;
