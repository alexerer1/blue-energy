"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const setting_entity_1 = require("./settings/entities/setting.entity");
const files_module_1 = require("./files/files.module");
const readings_module_1 = require("./readings/readings.module");
const scheduler_module_1 = require("./scheduler/scheduler.module");
const settings_module_1 = require("./settings/settings.module");
const file_record_entity_1 = require("./files/entities/file-record.entity");
const reading_entity_1 = require("./readings/entities/reading.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'src/data/database.sqlite',
                entities: [file_record_entity_1.FileRecord, reading_entity_1.Reading, setting_entity_1.Setting],
                synchronize: true,
            }),
            files_module_1.FilesModule,
            readings_module_1.ReadingsModule,
            scheduler_module_1.SchedulerModule,
            settings_module_1.SettingsModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
