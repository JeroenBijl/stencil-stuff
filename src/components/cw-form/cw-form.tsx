
import { Component, Element, Event, EventEmitter, Listen, Method, Prop, State } from '@stencil/core';
import { getFirstNode } from '../utils';

interface IFormElement {
  disabled: boolean;
  node: ICwInputElement & EventTarget;
  valid: boolean;
}


interface IFormElements {
  [key: string]: IFormElement;
}

@Component({
  tag: 'cw-form',
})
export class Rfs2Form {
  private registeredFormElements: IFormElements = {};

  @Element() private element: HTMLElement;

  @State() private isSubmitted: boolean = false;

  @Prop() private action: string;
  @Prop() private method: string;

  @Event() private cwFormSubmit: EventEmitter;

  @Method()
  public reset(): void {
    this.element.querySelector('form').reset();

    Object.keys(this.registeredFormElements).forEach((element) => {
      this.registeredFormElements[element].node.reset();
    });
  }

  @Listen('inputStateChanged')
  protected onFormElementStateChange(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const node = event.target as ICwInputElement & EventTarget;
    const elementId: string = node.id;

    if (event.detail.connected) {
      this.registeredFormElements[elementId] = {
        disabled: event.detail.disabled,
        node,
        valid: event.detail.valid,
      };
    } else {
      delete this.registeredFormElements[elementId];
    }
  }

  @Listen('onCwReset')
  protected onResetHandler(event: Event): void {
    event.preventDefault();
    this.reset();
  }

  @Listen('onCwSubmit')
  protected onSubmitHandler(event: Event): boolean {
    if (this.isSubmitted) {
      event.preventDefault();
      return false;
    }

    const invalidNodes = this.getInvalidFormElements();
    const isInvalid = invalidNodes.length > 0;

    if (isInvalid) {
      event.preventDefault();

      const firstNode: HTMLElement = getFirstNode(this.element, invalidNodes);
      firstNode.focus();

      return false;
    }

    this.isSubmitted = true;
    this.cwFormSubmit.emit(this.element.firstElementChild);

    if (this.action) {
      return true;
    }

    // If no action specified we prevent the default form submitting
    event.preventDefault();
    return false;
  }

  protected render(): JSX.Element {
    return (
      <form
        autocomplete="off"
        action={ this.action }
        method={ this.method }
        noValidate={ true }>
        <slot />
      </form>
    );
  }

  private getInvalidFormElements(): HTMLElement[] {
    return Object.keys(this.registeredFormElements).reduce((invalidFormElements: HTMLElement[], formElementId: string) => {
      const formElement = this.registeredFormElements[formElementId];

      if (!formElement.disabled && !formElement.node.validate() && formElement.node instanceof HTMLElement) {
        invalidFormElements.push(formElement.node);
      }

      return invalidFormElements;
    }, []);
  }
}
