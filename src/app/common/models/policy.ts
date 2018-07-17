

import { CoverageType, Risk, Agency, Customer} from './index';

export class Policy {
  Id: number;
  Name: string;
  Description: string;
  Coverage: Array<CoverageType>;
  StartDay: Date;
  CoveragePeriod: number;
  Ammount: number;
  RiskType: Risk;
  Agency: Agency;
  Customer: Customer;
}
