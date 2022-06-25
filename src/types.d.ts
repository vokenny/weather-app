import { UnitSystem } from './constants/Unit';

type Config = {
  BASE_URL: string;
  API_KEY: string;
};

type QueryParams = {
  q?: string;
  units?: UnitSystem;
};
