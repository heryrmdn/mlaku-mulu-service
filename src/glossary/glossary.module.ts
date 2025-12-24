import { Module } from '@nestjs/common';
import { GlossaryController } from './glossary.controller';
import { GlossaryService } from './glossary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Glossary } from './entity/glossary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Glossary])],
  controllers: [GlossaryController],
  providers: [GlossaryService],
  exports: [GlossaryService],
})
export class GlossaryModule {}
