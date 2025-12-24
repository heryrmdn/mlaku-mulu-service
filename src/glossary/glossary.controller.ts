import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GlossaryService } from './glossary.service';
import { Glossary } from './entity/glossary.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { Permission } from 'src/auth/permission.decorator';
import { PermissionGuard } from 'src/auth/permission.guard';
import { Permission as PermissionUtil } from 'src/shared/utils/permission';

@Controller('glossary')
@UseInterceptors(ResponseInterceptor)
export class GlossaryController {
  constructor(private readonly glossaryService: GlossaryService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.ListGlossary)
  @Get()
  getList(): Promise<Glossary[]> {
    return this.glossaryService.getList();
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.DetailGlossary)
  @Get(':id')
  getDetailById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Glossary | null> {
    return this.glossaryService.getDetailById(id);
  }
}
