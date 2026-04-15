export interface Bank {
  id: number;
  name: string;
  logo: string;
  logo_bg: string;
  license: string;
  branches: number;
  atms: number;
  assets: number | string;
  assets_change: number | string;
  npl: number | string;
  deposits: number | string;
  capital: number | string;
}
