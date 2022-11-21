import {ModuleWithProviders, NgModule} from '@angular/core';
import {ApolloClientOptions, DefaultOptions, gql, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
// import {BASE_URL, COVID19_API} from './tokens/token';
import { ConfigService } from '@labshare/base-ui-services';
// import { HttpClient } from '@angular/common/http';
// import { lastValueFrom } from 'rxjs';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
};
@NgModule({})
export class OdpCovid19UiModule {
  public static forRoot(): ModuleWithProviders<OdpCovid19UiModule> {
    return {
      ngModule: OdpCovid19UiModule,
      providers: [
        {
          provide: APOLLO_OPTIONS,
          useFactory: (httpLink: HttpLink, configService: ConfigService): ApolloClientOptions<any> => {
            const variantGraphQL = configService.get('odp.variantApiUrl')
            
            
            return {
              link: httpLink.create({
                uri: variantGraphQL ? `${variantGraphQL}/graphql` : '/covid19-api/graphql'
              }),
              cache: new InMemoryCache(),
              defaultOptions
            };
          },
          deps: [HttpLink, ConfigService]
        }
      ]
    };
  }
}
