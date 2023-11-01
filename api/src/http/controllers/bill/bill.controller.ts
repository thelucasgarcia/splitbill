import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateBillDto } from 'src/app/dto/bill/create-bill.dto';
import { EditBillDto } from 'src/app/dto/bill/edit-bill.dto';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';
import { CreateBill } from 'src/app/use-cases/bill/create-bill';
import { EditBill } from 'src/app/use-cases/bill/edit-bill';
import { FindOneBill } from 'src/app/use-cases/bill/find-one-bill';
import { GetAllBills } from 'src/app/use-cases/bill/get-all-bills';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { BillViewModel } from 'src/http/view-models/bill.view-model';

@ApiBearerAuth()
@ApiTags('Bills')
@UseGuards(JwtAuthGuard)
@Controller('bill')
export class BillController {
  constructor(
    private readonly useGetAllBills: GetAllBills,
    private readonly useFindOneBill: FindOneBill,
    private readonly useCreateBill: CreateBill,
    private readonly useEditBill: EditBill,
  ) {}

  @Post()
  async create(@Req() req: Request, @Body() body: CreateBillDto) {
    const user = req.user;
    const response = await this.useCreateBill.execute(body, user['id']);
    return BillViewModel.toHTTP(response);
  }

  @Get()
  async findAll() {
    const response = await this.useGetAllBills.execute();
    return response.map(BillViewModel.toHTTP);
  }

  @Get(':id')
  async findOne(@Param() param: FindOneParamDto) {
    const response = await this.useFindOneBill.execute(param);
    return BillViewModel.toHTTP(response);
  }

  @Patch(':id')
  async update(@Param() param: FindOneParamDto, @Body() body: EditBillDto) {
    const response = await this.useEditBill.execute(param, body);
    return BillViewModel.toHTTP(response);
  }
}
