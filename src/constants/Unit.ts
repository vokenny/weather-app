export const enum UnitSystem {
  Metric = 'metric',
  Imperial = 'imperial',
}

export const UNITS = {
  [UnitSystem.Metric]: '°C',
  [UnitSystem.Imperial]: '°F',
};

export const UNITS_NAME = {
  [UnitSystem.Metric]: 'Celsius',
  [UnitSystem.Imperial]: 'Fahrenheit',
};
