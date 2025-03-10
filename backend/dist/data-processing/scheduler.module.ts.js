"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataProcessingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const data_record_entity_1 = require("../entities/data-record.entity");
const setting_entity_1 = require("../entities/setting.entity");
const data_processing_service_1 = require("./data-processing.service");
const data_processing_controller_1 = require("./data-processing.controller");
const reading_entity_1 = require("../readings/entities/reading.entity");
let DataProcessingModule = class DataProcessingModule {
};
DataProcessingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([data_record_entity_1.DataRecord, setting_entity_1.Setting, reading_entity_1.Reading]),
        ],
        providers: [data_processing_service_1.DataProcessingService],
        controllers: [data_processing_controller_1.DataProcessingController],
        exports: [data_processing_service_1.DataProcessingService],
    })
], DataProcessingModule);
exports.DataProcessingModule = DataProcessingModule;
