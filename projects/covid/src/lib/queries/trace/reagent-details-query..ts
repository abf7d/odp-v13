import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {ReagentDetailsQuery} from '../../models/trace/reagent-details-ql';

@Injectable({
  providedIn: 'root'
})
export class ReagentDetailsQL extends Query<ReagentDetailsQuery, {}> {
  override document = gql`
    {
      traceReagent {
        edges {
          node {
            id
            sampleId
            reagentName
            reagentCommonName
            reagentClass
            reagentSource
            reagentLot
            reagentConc
            reagentMolecularWeight
            reagentTiter
            reagentAC50Unit
            reagentCAS
            reagentSMILES
            reagentLink
            reagentAssays
            reagentMoa
          }
        }
      }
    }
  `;
}
