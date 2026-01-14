/**
 * Button Component
 * Creates reusable button elements with consistent styling
 */
class Button {
  constructor(text, className = 'btn-primary', onClick = null, type = 'button') {
    this.text = text;
    this.className = className;
    this.onClick = onClick;
    this.type = type;
  }

  render() {
    const button = document.createElement('button');
    button.type = this.type;
    button.className = `btn ${this.className}`;
    button.textContent = this.text;
    
    if (this.onClick) {
      button.addEventListener('click', this.onClick);
    }
    
    return button;
  }

  static create(text, className = 'btn-primary', onClick = null, type = 'button') {
    const btn = new Button(text, className, onClick, type);
    return btn.render();
  }
}

export { Button };
