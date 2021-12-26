import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UpdateResult,
  DeleteResult,
  FindOneOptions,
  FindConditions,
} from 'typeorm';
import { LensWizard, Decision } from './lensWizard.entity';
import { CreateLensWizardDto } from './lensWizard.dto';
import { updateCascadeDB } from '@/utils/typeorm.utils';

@Injectable()
export class LensWizardService {
  constructor(
    @InjectRepository(LensWizard)
    private lensWizardRepo: Repository<LensWizard>,
    @InjectRepository(Decision)
    private decisionRepo: Repository<Decision>,
  ) {}

  private readonly lensWizardRelations = [
    'decisions',
    'decisions.choices',
    'steps',
  ];

  async getLensWizards(): Promise<LensWizard[]> {
    return await this.lensWizardRepo.find({
      // relations: ['decisions', 'decisions.choices'],
    });
  }

  async findLensWizard(id: number, options: any = {}): Promise<LensWizard> {
    return await this.lensWizardRepo.findOne(id, {
      relations: this.lensWizardRelations,
      ...options,
    });
  }

  async createLensWizard(entity: CreateLensWizardDto): Promise<any> {
    return await this.lensWizardRepo.save(entity);
  }


  async updateLensWizard(id, updatingQuery: any): Promise<UpdateResult> {
    // return await this.lensWizardRepo.update(entity.id, entity);
    return updateCascadeDB(
      this.lensWizardRepo,
      id,
      updatingQuery,
      this.lensWizardRelations,
    );
  }

  async deleteLensWizard(id): Promise<DeleteResult> {
    return await this.lensWizardRepo.delete(id);
  }

  async getDecisions({ wizardId }): Promise<Decision[]> {
    return await this.decisionRepo.find({
      relations: ['choices'],
    });
  }

  async findDecision(id, options: FindOneOptions = {}): Promise<Decision> {
    return await this.decisionRepo.findOne(id, {
      relations: ['choices'],
    });
  }

  async createDecision({ wizardId, createDto }): Promise<Decision> {
    const savingQuery = { ...createDto, wizard: wizardId };
    return await this.decisionRepo.save(savingQuery);
  }

  async updateDecision(id, updatingQuery: any): Promise<any> {
    // const decision = await this.findDecision(id);
    // const nextDecision = {
    //   ...decision,
    //   ...updatingQuery,
    // }
    // console.warn(id, decision, nextDecision)
    // return await this.decisionRepo.save(nextDecision);
    const relations = ['choices'];
    return updateCascadeDB(this.decisionRepo, id, updatingQuery, relations);
  }
}
