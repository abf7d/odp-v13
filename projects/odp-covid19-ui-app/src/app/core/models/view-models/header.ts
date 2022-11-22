export interface Header {
  order: number;
  priority?: number;
  name: string;
  drugCompany?: string;
  otherNames?: string[];
  items?: Header[];
  showChildren?: boolean;
  y?: number;
}
