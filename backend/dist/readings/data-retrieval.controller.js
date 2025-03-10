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
exports.DataRetrievalController = void 0;
const common_1 = require("@nestjs/common");
const data_retrieval_service_1 = require("./data-retrieval.service");
let DataRetrievalController = class DataRetrievalController {
    constructor(dataRetrievalService) {
        this.dataRetrievalService = dataRetrievalService;
    }
    async getAllRecords() {
        return this.dataRetrievalService.findAll();
    }
    async getRecordById(id) {
        return this.dataRetrievalService.findOne(id);
    }
    async createRecord(dto) {
        return this.dataRetrievalService.create(dto);
    }
    async updateRecord(id, dto) {
        return this.dataRetrievalService.update(id, dto);
    }
    async deleteRecord(id) {
        return this.dataRetrievalService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataRetrievalController.prototype, "getAllRecords", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DataRetrievalController.prototype, "getRecordById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataRetrievalController.prototype, "createRecord", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DataRetrievalController.prototype, "updateRecord", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DataRetrievalController.prototype, "deleteRecord", null);
DataRetrievalController = __decorate([
    (0, common_1.Controller)('data'),
    __metadata("design:paramtypes", [data_retrieval_service_1.DataRetrievalService])
], DataRetrievalController);
exports.DataRetrievalController = DataRetrievalController;
