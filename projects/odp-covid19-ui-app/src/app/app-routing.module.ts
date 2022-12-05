import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MobileMenuComponent } from '@odp/shared';
// import {HomepageComponent} from '../app/pages/homepage/homepage.component';
// import {SummaryComponent} from '../app/pages/variant/summary/summary.component';
// import {DatasetsComponent} from '../app/pages/variant/datasets/datasets.component';
// import {AssayComponent} from '../app/pages/assay/assay/assay.component';
// import {AssayOverviewComponent} from '../app/pages/assay/overview/overview.component';
// import {ActivityComponent} from './pages/variant/activity/activity-layout/activity.component';
// import {VariantAboutComponent} from './pages/variant/about/about.component';
// import {VariantGlossaryComponent} from './pages/variant/glossary/glossary.component';
// import {MobileMenuComponent} from './layouts/mobile-menu/mobile-menu.component';
// import {InVivoGridComponent} from './pages/variant/in-vivo-grid/vivo-layout/in-vivo-grid.component';
// import {RelatedResourcesComponent} from './pages/variant/related-resources/related-resources.component';
// import {TraceLayoutComponent} from './pages/variant/trace/trace-layout/trace-layout.component';
// import {TraceVariantDataComponent} from './pages/variant/trace/trace-variant-data/trace-variant-data.component';
// import {TraceAssayComponent} from './pages/variant/trace/trace-assay/trace-assay.component';
// import {TraceReagentComponent} from './pages/variant/trace/trace-reagent/trace-reagent.component';
// import {TraceMutationComponent} from './pages/variant/trace/trace-mutation/trace-mutation.component';
// import {TraceAboutComponent} from './pages/variant/trace/trace-about/trace-about.component';
import {AboutComponent} from './features/about/about.component';
import { AssayComponent } from './features/assay/assay/assay.component';
import { AssayOverviewComponent } from './features/assay/overview/overview.component';
import { HomepageComponent } from './features/homepage/homepage.component';
// import {HighlightsComponent} from './pages/highlights/highlights.component';
// import {AnimalModelsComponent} from './pages/variant/animal-models/animal-models.component';
// import {AnimalModelsSummaryComponent} from './pages/variant/animal-models/summary/animal-models-summary.component';
// import {SamFieldGuideComponent} from './pages/variant/animal-models/sam-field-guide/sam-field-guide.component';
// import {NhpFieldGuideComponent} from './pages/variant/animal-models/nhp-field-guide/nhp-field-guide.component';
// import {ActivResourcesComponent} from './pages/variant/animal-models/activ-resources/activ-resources.component';
// import {SmallAnimalDetailsComponent} from './pages/variant/animal-models/small-animal-details/small-animal-details.component';
// import {NhpDetailsComponent} from './pages/variant/animal-models/nhp-details/nhp-details.component';
// import {Gs441524StudiesComponent} from './pages/variant/screening-data/gs441524-studies/gs441524-studies.component';
// import {CurveClassesComponent} from './pages/variant/screening-data/curve-classes/curve-classes.component';
// import {MonkeypoxComponent} from './pages/monkeypox/monkeypox.component';
// import {DataBrowserComponent} from './pages/variant/screening-data/data-browser/data-browser.component';
// import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'about',
    component: MobileMenuComponent,
    children: [
      {
        path: '',
        component: AboutComponent
      }
    ]
  },
  
  {
    path: '',
    component: HomepageComponent
  },
  // {
  //   path: 'summary',
  //   component: MobileMenuComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: SummaryComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'monkeypox',
  //   component: MonkeypoxComponent
  // },
  // {
  //   path: 'animal-models/small-animals/:id',
  //   component: MobileMenuComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: SmallAnimalDetailsComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'animal-models/nhp/:id',
  //   component: MobileMenuComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: NhpDetailsComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'animal-models/nhp-details',
  //   component: MobileMenuComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: NhpDetailsComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'animal-models',
  //   component: MobileMenuComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: AnimalModelsComponent,
  //       children: [
  //         {
  //           path: 'summary',
  //           component: AnimalModelsSummaryComponent
  //         },
  //         {
  //           path: 'sam-field-guide',
  //           component: SamFieldGuideComponent
  //         },
  //         {
  //           path: 'nhp-field-guide',
  //           component: NhpFieldGuideComponent
  //         },
  //         {
  //           path: 'activ-resources',
  //           component: ActivResourcesComponent
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: 'databrowser',
  //   component: DataBrowserComponent
  // },
  // {
  //   path: 'GS-441524',
  //   component: Gs441524StudiesComponent
  // },
  // {
  //   path: 'curveclasses',
  //   component: CurveClassesComponent
  // },
  // {
  //   path: 'about',
  //   component: MobileMenuComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: AboutComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'highlights',
  //   component: MobileMenuComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: HighlightsComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'datasets',
  //   component: MobileMenuComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: DatasetsComponent
  //     }
  //   ]
  // },
  {
    path: 'assays',
    component: MobileMenuComponent,
    children: [
      {
        path: '',
        component: AssayComponent
      }
    ]
  },
  // {
  //   path: 'activity',
  //   component: ActivityComponent
  // },


  {
    path: 'activity',
    loadChildren: () => import('./lazy-routes/activity/activity-route.module').then(m => m.ActivityRouteModule),
},


  // {
  //   path: 'in-vivo',
  //   component: InVivoGridComponent
  // },
  // {
  //   path: 'activity/:variant',
  //   component: ActivityComponent
  // },
  {
    path: 'assays/:id/:assay',
    component: MobileMenuComponent,
    children: [
      {
        path: '',
        component: AssayOverviewComponent
      }
    ]
  },
  // {
  //   path: 'variant-about',
  //   component: MobileMenuComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: VariantAboutComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'variant-glossary',
  //   component: MobileMenuComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: VariantGlossaryComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'related-resources',
  //   component: MobileMenuComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: RelatedResourcesComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'trace',
  //   component: TraceLayoutComponent,
  //   children: [
  //     {
  //       path: 'variant-data',
  //       component: TraceVariantDataComponent
  //     },
  //     {
  //       path: 'assay',
  //       component: TraceAssayComponent
  //     },
  //     {
  //       path: 'reagent',
  //       component: TraceReagentComponent
  //     },
  //     {
  //       path: 'mutation',
  //       component: TraceMutationComponent
  //     },
  //     {
  //       path: 'about',
  //       component: TraceAboutComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


