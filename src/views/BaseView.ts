class BaseView {
  private $main: HTMLElement = document.createElement('main');
  $view: HTMLElement = document.createElement('div');

  constructor() {
    this.$main.id = 'main-content';
    document.body.replaceChildren(this.$main);
  }

  update(): void {
    this.$main.replaceChildren(this.$view);
  }
}

export default BaseView;
