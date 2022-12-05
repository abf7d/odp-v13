import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {VariantsMutationsQuery} from '../../models/trace/variants-mutations-ql';

@Injectable({
  providedIn: 'root'
})
export class VariantMutationsQL extends Query<VariantsMutationsQuery, {}> {
  override document = gql`
    {
      traceMutation {
        edges {
          node {
            id
            assayType
            variantLineage
            variantWHOName
            variantMutationSpike
            variantMutationNonSpike
            variantSource
            variantIsolate
            variantPassageHistory
            variantTiter
            variantRefStrain
          }
        }
      }
    }
  `;
}
