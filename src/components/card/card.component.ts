import './card.style.css';

class Card {
  private $card: HTMLDivElement = document.createElement('div');
  private $heading: HTMLHeadingElement = document.createElement('h1');
  private $content: HTMLDivElement = document.createElement('div');

  constructor(type: string) {
    this.$card.classList.add('card', `${type}-card`);
    this.$heading.classList.add('heading');
    this.$content.classList.add('content');
  }

  update(title: string, content: HTMLElement[]): HTMLDivElement {
    this.$heading.textContent = title;
    this.$content.append(...content);
    this.$card.replaceChildren(this.$heading, this.$content);

    return this.$card;
  }
}

export default Card;
