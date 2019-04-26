import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'cw-card',
  styleUrl: 'cw-card.scss',
  shadow: true
})
export class CwCard {

  @Prop() complete: boolean = false;

  protected componentDidLoad() {
  }

  render() {
    const cssClasses = `cw-card`;

    return <div class={ cssClasses }>
      <slot name="header" />
      <slot name="content" />
    </div>;
  }
}
