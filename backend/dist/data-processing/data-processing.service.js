"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DataProcessingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataProcessingService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const data_record_entity_1 = require("../entities/data-record.entity");
const setting_entity_1 = require("../entities/setting.entity");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const parse_log_file_1 = require("./helpers/parse-log-file");
const reading_entity_1 = require("../readings/entities/reading.entity");
let DataProcessingService = DataProcessingService_1 = class DataProcessingService {
    constructor(dataRecordRepo, settingRepo, readingRepo) {
        this.dataRecordRepo = dataRecordRepo;
        this.settingRepo = settingRepo;
        this.readingRepo = readingRepo;
        this.logger = new common_1.Logger(DataProcessingService_1.name);
    }
    async handleCron() {
        this.logger.log('Running data processing cron job');
        await this.processDataFiles();
    }
    async processDataFiles() {
        try {
            let inputDirectory = './data/input';
            const dirSetting = await this.settingRepo.findOneBy({ key: 'inputDirectory' });
            if (dirSetting) {
                inputDirectory = dirSetting.value;
            }
            if (!fs.existsSync(inputDirectory)) {
                this.logger.warn(`Directory does not exist: ${inputDirectory}`);
                return;
            }
            const files = fs.readdirSync(inputDirectory);
            for (const file of files) {
                const filePath = path.join(inputDirectory, file);
                const stats = fs.statSync(filePath);
                if (!stats.isFile())
                    continue;
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const record = this.dataRecordRepo.create({
                    fileName: file,
                    content: fileContent,
                });
                await this.dataRecordRepo.save(record);
                const dateFromFile = this.extractDateFromFilename(file);
                const parsed = (0, parse_log_file_1.parseLogFile)(fileContent, dateFromFile);
                await this.saveParsedReadings(parsed, file);
                this.logger.log(`Processed file: ${file}`);
            }
            this.logger.log(`Processed ${files.length} file(s).`);
        }
        catch (error) {
            this.logger.error('Error processing files', error);
        }
    }
    extractDateFromFilename(fileName) {
        const match = fileName.match(/(\d{4})(\d{2})(\d{2})/);
        if (!match) {
            return new Date();
        }
        const [_, yyyy, mm, dd] = match;
        const year = parseInt(yyyy, 10);
        const month = parseInt(mm, 10) - 1;
        const day = parseInt(dd, 10);
        return new Date(year, month, day);
    }
    async saveParsedReadings(parsed, sourceFile) {
        if (!parsed || !parsed.length)
            return;
        const toSave = parsed.map((r) => {
            const entity = new reading_entity_1.Reading();
            entity.sourceFile = sourceFile;
            entity.timestamp = r.timestamp;
            entity.statusRaw = r.statusRaw;
            entity.headtankLevel = r.headtankLevel;
            entity.temperatureLevel = r.temperatureLevel;
            entity.batteryLevel = r.batteryLevel;
            entity.ACvoltLevel = r.ACvoltLevel;
            entity.enabledLoads = r.enabledLoads;
            entity.balast = r.balast;
            return entity;
        });
        await this.readingRepo.save(toSave);
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataProcessingService.prototype, "handleCron", null);
DataProcessingService = DataProcessingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(data_record_entity_1.DataRecord)),
    __param(1, (0, typeorm_1.InjectRepository)(setting_entity_1.Setting)),
    __param(2, (0, typeorm_1.InjectRepository)(reading_entity_1.Reading)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DataProcessingService);
exports.DataProcessingService = DataProcessingService;
