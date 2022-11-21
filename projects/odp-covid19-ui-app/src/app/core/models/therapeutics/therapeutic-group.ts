export interface TherapeuticGroup {
  drugs: TherapeuticItem[];
  displayName: string;
  drugClass: string;
  displayOrder: number;
}

export interface TherapeuticItem {
  drugName: string;
  priority: number;
  drugCompany: string;
  otherNames: string[];
}
