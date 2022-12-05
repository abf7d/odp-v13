import {ModuleWithProviders, NgModule} from '@angular/core';
import {ApolloClientOptions, DefaultOptions, gql, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
// import {BASE_URL, COVID19_API} from './tokens/token';
import { ConfigService } from '@labshare/base-ui-services';
// import { HttpClient } from '@angular/common/http';
// import { lastValueFrom } from 'rxjs';
import * as CONST from '../../../covid/src/lib/constants/api-constants';
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
export class GraphQLModule {
  public static forRoot(): ModuleWithProviders<GraphQLModule> {
    return {
      ngModule: GraphQLModule,
      providers: [
        {
          provide: APOLLO_OPTIONS,
          useFactory: (httpLink: HttpLink, configService: ConfigService): ApolloClientOptions<any> => {
            const variantGraphQL = configService.get(CONST.VARIANT_URL_KEY)
            
            
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
