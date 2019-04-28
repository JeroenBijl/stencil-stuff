import { Component } from '@stencil/core';

@Component({
  tag: 'cw-card',
  styleUrl: 'cw-card.scss',
  shadow: true
})
export class CwCard {


  render() {
    const cssClasses = `cw-card`;

    return <div class={ cssClasses }>
      <slot name="header" />
      <slot name="content" />
    </div>;
  }
}
