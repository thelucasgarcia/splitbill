import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseBillDto } from 'src/app/dto/bill/response-bill.dto';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';
import { CreateBillItemDto } from 'src/app/dto/bill-item/create-bill-item.dto';
import { EditBillItemDto } from 'src/app/dto/bill-item/edit-bill-item.dto';
import { CreateBillItem } from 'src/app/use-cases/bill-item/create-bill-item';
import { DeleteBillItem } from 'src/app/use-cases/bill-item/delete-bill-item';
import { EditBillItem } from 'src/app/use-cases/bill-item/edit-bill-item';
import { FindOneBillItem } from 'src/app/use-cases/bill-item/find-one-bill-item';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { BillItemViewModel } from 'src/http/view-models/bill-item.view-model';

@ApiBearerAuth()
@ApiTags('Bills Items')
@UseGuards(JwtAuthGuard)
@Controller('bill/item')
export class BillItemController {
  constructor(
    private readonly useFindOneBillItem: FindOneBillItem,
    private readonly useCreteBillItem: CreateBillItem,
    private readonly useEditBillItem: EditBillItem,
    private readonly useDeleteBillItem: DeleteBillItem,
  ) {}

  @Post()
  async create(@Body() body: CreateBillItemDto) {
    const response = await this.useCreteBillItem.execute(body);
    return BillItemViewModel.toHTTP(response);
  }

  @Get()
  async findAll() {
    return [];
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: ResponseBillDto,
  })
  async findOne(@Param() param: FindOneParamDto) {
    const response = await this.useFindOneBillItem.execute(param);
    return BillItemViewModel.toHTTP(response);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: ResponseBillDto,
  })
  async update(@Param() param: FindOneParamDto, @Body() body: EditBillItemDto) {
    const response = await this.useEditBillItem.execute(param, body);
    return BillItemViewModel.toHTTP(response);
  }

  @Delete(':id')
  async delete(@Param() param: FindOneParamDto) {
    const response = await this.useDeleteBillItem.execute(param);
    return BillItemViewModel.toHTTP(response);
  }
}
