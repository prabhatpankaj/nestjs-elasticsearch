import { Body, Controller, Get, OnModuleInit, Param, ParseIntPipe } from '@nestjs/common';
import { CarService } from './car.service';
import { SearchService } from 'src/search/search.service';


@Controller('/cars')
export class CarController implements OnModuleInit {
  private indexName = 'cars';

  constructor(
    private carService: CarService,
    private searchService: SearchService,
  ) {}


  async onModuleInit() {
    // create index if not exists
    if (!(await this.searchService.indexExists({index: this.indexName}))) {
      await this.searchService.createIndex({index: this.indexName});
    }
  }

  @Get('/:id')
  async getCar(@Param('id', ParseIntPipe) id: number): Promise<string> {
    let result;

    try {
        result = await this.searchService.getDocument(
            {index: this.indexName},
            {id: id.toString()},
        );
    } catch (e) {
        result = await this.carService.getCar(id);
    // insert into ES
        if (result) {
            const bodydata = this.carService.createCar(result.data)
            await this.searchService.insertDocument(
                {index: this.indexName},
                bodydata,
                {id: result.data['id']},
            );
            } 
            result = await this.searchService.getDocument(
                {index: this.indexName},
                {id: id.toString()}
                ,
            ); 
        }
        result = result['_source'];
        return result;
    }

}
