import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateBillDto } from 'src/app/dto/bill/create-bill.dto';
import { EditBillDto } from 'src/app/dto/bill/edit-bill.dto';
import { ResponseBillDto } from 'src/app/dto/bill/response-bill.dto';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';
import { CreateBill } from 'src/app/use-cases/bill/create-bill';
import { DeleteBill } from 'src/app/use-cases/bill/delete-bill';
import { EditBill } from 'src/app/use-cases/bill/edit-bill';
import { FindOneBill } from 'src/app/use-cases/bill/find-one-bill';
import { GetAllBills } from 'src/app/use-cases/bill/get-all-bills';
import { CreateBillItem } from 'src/app/use-cases/bill-item/create-bill-item';
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
    private readonly useDeleteBill: DeleteBill,
    private readonly useCreteBillItem: CreateBillItem,
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
  @ApiResponse({
    status: 200,
    type: ResponseBillDto,
  })
  async findOne(@Param() param: FindOneParamDto) {
    const response = await this.useFindOneBill.execute(param);
    return BillViewModel.toHTTP(response);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: ResponseBillDto,
  })
  async update(@Param() param: FindOneParamDto, @Body() body: EditBillDto) {
    const response = await this.useEditBill.execute(param, body);
    return BillViewModel.toHTTP(response);
  }

  @Delete(':id')
  async delete(@Param() param: FindOneParamDto) {
    const response = await this.useDeleteBill.execute(param);
    return BillViewModel.toHTTP(response);
  }
}
