"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRetrievalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const data_record_entity_1 = require("../data/entities/data-record.entity");
const typeorm_2 = require("typeorm");
let DataRetrievalService = class DataRetrievalService {
    constructor(dataRecordRepo) {
        this.dataRecordRepo = dataRecordRepo;
    }
    async findAll() {
        return this.dataRecordRepo.find();
    }
    async findOne(id) {
        const record = await this.dataRecordRepo.findOne({ where: { id } });
        if (!record) {
            throw new common_1.NotFoundException(`DataRecord with id ${id} not found`);
        }
        return record;
    }
    async create(dto) {
        const newRecord = this.dataRecordRepo.create(dto);
        return this.dataRecordRepo.save(newRecord);
    }
    async update(id, dto) {
        const record = await this.findOne(id);
        Object.assign(record, dto);
        return this.dataRecordRepo.save(record);
    }
    async remove(id) {
        const record = await this.findOne(id);
        await this.dataRecordRepo.remove(record);
    }
};
DataRetrievalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(data_record_entity_1.DataRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DataRetrievalService);
exports.DataRetrievalService = DataRetrievalService;
