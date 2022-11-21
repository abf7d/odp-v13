export interface ReagentDetailsQuery {
  traceReagent: ReagentDetailsResult;
}
export interface ReagentDetailsResult {
  edges: ReagentDetailsEdge[];
}
export interface ReagentDetailsEdge {
  node: ReagentDetailsNode;
}
export interface ReagentDetailsNode {
  id: string;
  sampleId: string;
  reagentName: string;
  reagentCommonName: string;
  reagentClass: string;
  reagentSource: string;
  reagentLot: string;
  reagentConc: string;
  reagentMolecularWeight: string;
  reagentTiter: string;
  reagentAC50Unit: string;
  reagentCAS: string;
  reagentSMILES: string;
  reagentLink: string;
  reagentAssays: string;
  reagentMoa: string;
}
