import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'cw-button',
  styleUrl: 'cw-button.scss',
  shadow: true
})
export class CwButton {

  @Prop() protected buttonText: string = 'Please click on me!';
  @Prop() protected type: 'submit' | 'button' | 'reset' = 'button';
  @Prop() protected disabled: boolean = false;

  @Event() protected onCwSubmit: EventEmitter;
  @Event() protected onCwReset: EventEmitter;

  protected onClick(): void {
    if (this.disabled) {
      return;
    }
    if (this.type === 'submit') {
      this.onCwSubmit.emit();
    } else if (this.type === 'reset') {
      this.onCwReset.emit();
    }
  }


  protected render(): JSX.Element {
    const cssClasses = `cw-button ${ this.disabled ? 'cw-button--disabled' : '' }`;

    return <button class={ cssClasses }
      type={ this.type }
      disabled={ this.disabled }
      onClick={ () => this.onClick() }>
      { this.buttonText }
    </button>
  }
}
