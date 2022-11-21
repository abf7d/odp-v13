import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {AboutTraceQuery} from '../../models/trace/about-trace-ql';

@Injectable({
  providedIn: 'root'
})
export class AboutTraceQL extends Query<AboutTraceQuery, {}> {
  override document = gql`
    {
      traceAbout {
        edges {
          node {
            id
            displayOrder
            title
            text
          }
        }
      }
    }
  `;
}
