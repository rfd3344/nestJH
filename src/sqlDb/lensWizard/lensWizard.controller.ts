import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';
import { LensWizardService } from './lensWizard.service';
import { LensWizard } from './lensWizard.entity';
import { CreateLensWizardDto, CreateDecisionDto } from './lensWizard.dto';

@Controller('LensWizard')
@ApiTags('LensWizard')
export class LensWizardController {
  constructor(private service: LensWizardService) {}

  @Get()
  index(): Promise<LensWizard[]> {
    return this.service.getLensWizards();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async getById(@Param('id') id): Promise<any> {
    return this.service.findLensWizard(id);
  }

  @Post()
  async create(@Body() body: CreateLensWizardDto): Promise<any> {
    return this.service.createLensWizard(body);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async updateWizard(
    @Param('id') id,
    @Body() entityData: LensWizard,
  ): Promise<any> {
    entityData.id = Number(id);
    return this.service.updateLensWizard(id, entityData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.service.deleteLensWizard(id);
  }

  @Get(':wizardId/decision')
  @ApiParam({ name: 'wizardId', example: '1' })
  async getAllDecision(@Param('wizardId') wizardId): Promise<any> {
    return this.service.getDecisions({ wizardId });
  }

  @Post(':wizardId/decision')
  @ApiParam({ name: 'wizardId', example: '1' })
  async createDecision(
    @Param('wizardId') wizardId,
    @Body() body: CreateDecisionDto,
  ): Promise<any> {
    return this.service.createDecision({ wizardId, createDto: body });
  }

  @Patch(':wizardId/decision/:id')
  @ApiParam({ name: 'wizardId', example: '1' })
  @ApiParam({ name: 'id', example: '1' })
  async updateDecision(
    @Param('id') id,
    @Body() body: CreateDecisionDto,
  ): Promise<any> {
    return this.service.updateDecision(id, body);
  }
}
