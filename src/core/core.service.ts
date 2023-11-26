import { Injectable,  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AxiosResponse } from 'axios';


@Injectable()
export class CoreService {
    constructor(
        private readonly configService: ConfigService,
      ) {}

    async fetchDataFromExternalUrl(url: string): Promise<any> {
        const externalUrl = this.configService.get<string>('NEXT_PUBLIC_STRAPI_API_URL') + url;
        const response: AxiosResponse = await axios.get(externalUrl);
        return response.data;
    }
}
