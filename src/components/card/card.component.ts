import './card.style.css';

export default function Card(
  title: string,
  content: HTMLElement[]
): HTMLDivElement {
  const $card: HTMLDivElement = document.createElement('div');
  $card.classList.add('card');

  const $heading: HTMLHeadingElement = document.createElement('h1');
  $heading.textContent = title;

  const $content: HTMLDivElement = document.createElement('div');
  $content.classList.add('card-content');
  $content.append(...content);

  $card.append($heading, $content);

  return $card;
}
