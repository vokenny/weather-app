import './card.style.css';

export default function Card(title: string, content: any): HTMLDivElement {
  const card: HTMLDivElement = document.createElement('div');
  card.classList.add('card');
  card.textContent = "If you're reading this, you're cool :)";

  return card;
}
