import { UnitSystem, UNITS_NAME } from '../../constants/Unit';
import WeatherController from '../../controller/WeatherController';
import './unitsToggle.style.css';

class UnitsToggle {
  private ctrl: WeatherController;
  private $toggle: HTMLLabelElement = document.createElement('label');
  private $checkbox: HTMLInputElement = document.createElement('input');
  private $slider: HTMLSpanElement = document.createElement('span');

  constructor(ctrl: WeatherController) {
    this.ctrl = ctrl;
    this.$toggle.className = 'toggle';
    this.$checkbox.type = 'checkbox';
    this.$checkbox.className = 'check';
    this.$slider.classList.add('slider', 'glass');
    this.$slider.textContent = UNITS_NAME[UnitSystem.Metric];

    this.$toggle.replaceChildren(this.$checkbox, this.$slider);

    this.setEventListeners();
  }

  private unitsHandler(evt: MouseEvent): void {
    const $check: HTMLInputElement = evt.target as HTMLInputElement;
    const system: UnitSystem = $check.checked
      ? UnitSystem.Imperial
      : UnitSystem.Metric;

    this.ctrl.updateForecast({ units: system });
    this.$slider.textContent = UNITS_NAME[system];
  }

  private setEventListeners(): void {
    this.$checkbox.addEventListener('click', this.unitsHandler.bind(this));
  }

  build(): HTMLLabelElement {
    return this.$toggle;
  }
}

export default UnitsToggle;
