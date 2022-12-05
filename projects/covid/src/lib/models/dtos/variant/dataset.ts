export interface VariantDataset {
  reportId: string;
  reportName: string;
  dataSource: string;
  dataSourceUrls: string[];
  dateReported: string;
  viralLineages: string[];
  viralAgentType: string[];
  mutations: string[];
  therapeuticAgents: string[];
  assayTypes: string[];
  assayCellLines: string[];
  submitter: string; //
  uploadedDate: string;
  numView: string;
  dataFileDownloadUrl: string;
  viralTypes: string[];
  drugNames: string[];
  drugClasses: string[];
  viralProteinFullPartials: string[];
  dataSourceType: string;
  viralLineageFull: string[];
}
