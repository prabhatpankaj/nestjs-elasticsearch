import { Injectable } from '@nestjs/common';
import { CoreService } from 'src/core/core.service';

@Injectable()
export class CarService {
    constructor(
        private readonly coreService: CoreService
      ) {}
    
    async getCar(id:number) {
        const Url = 'makes/'+ id + '?populate[models][populate]=*&populate[logo]=*';
        const data = await this.coreService.fetchDataFromExternalUrl(Url);
        return data;
    }

    extractModelsAndVariants(data) {
        const modelsData = data?.attributes?.models?.data || [];
        const modelsWithVariants = modelsData.map((model) => {
            const modelName = model.attributes?.Name || '';
            const modelSlug = model.attributes?.slug || '';
            const modelId = model.id || '';
            const variantsData = model.attributes?.variants?.data || [];
            const coloursData = model.attributes?.ImagesForColor || [];
            const variants = variantsData.map((variant) => {
                return {
                    variantId: variant.id,
                    name: variant.attributes?.name || '',
                    slug: variant.attributes?.slug || '',
                };
        });

        const colours = coloursData.map((colour) => {
            return {
                colourId: colour.id,
                ColorName: colour.ColorName || '',
                ColorCode: colour.ColorCode || '',
            };
        });

          return {
            name: modelName,
            modelId:modelId,
            slug: modelSlug,
            variants: variants,
            colours: colours
          };
        });
      
        return modelsWithVariants;
    }

      
    createCar(data) {        
        const document = {
            make: data.attributes.name,
            makeId: data.id,
            slug: data.attributes.slug,
            image: data.attributes.logo.data.attributes.url,
            models: this.extractModelsAndVariants(data)
          };

        return document;
    }

}
