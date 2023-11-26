import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { SearchModule } from 'src/search/search.module';
import { CarController } from './car.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [SearchModule, CoreModule],
  providers: [CarService],
  controllers: [CarController]
})
export class CarModule {}
