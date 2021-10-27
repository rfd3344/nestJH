import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('math:wordcount')
  wordCount(text: string): any {
    console.warn('wordCount', text)
    return `MessagePattern ${text}`;
    // return this.appService.calculateWordCount(text);
  }
}