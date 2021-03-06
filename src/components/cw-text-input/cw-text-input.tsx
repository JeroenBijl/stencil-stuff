import { Component, Element, Event, EventEmitter, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'cw-text-input',
  styleUrl: 'cw-text-input.scss',
  shadow: true
})
export class CwTextInput implements ICwInputElement {
  private inputText: HTMLInputElement;

  @State() private error: string = '';

  @Element() private element: HTMLElement;

  @Prop() public disabled: boolean = false;
  @Prop() public id: string = '';
  @Prop() public name: string = '';
  @Prop() public max: number;
  @Prop() public maxlength: number = 500;
  @Prop() public min: number;
  @Prop() public minlength: number = 0;
  @Prop() public pattern: string;
  @Prop() public placeholder: string;
  @Prop() public readonly: boolean = false;
  @Prop() public required: boolean = false;
  @Prop() public type: string = 'text';
  @Prop({ mutable: true }) public value: string = '';

  @Event() private inputStateChanged: EventEmitter;
  @Event() private cwChange: EventEmitter;
  @Event() private cwBlur: EventEmitter;
  @Event() private cwFocus: EventEmitter;
  @Event() private cwInput: EventEmitter;

  @Method()
  public setFocus(): void {
    this.inputText.focus();
  }

  @Method()
  public reset(): void {
    this.value = this.element.getAttribute('value') || '';
  }

  @Method()
  public validate(): boolean {
    this.error = this.inputText.validationMessage;
    return !this.error;
  }

  protected componentDidLoad(): void {
    this.emitInputState();
  }

  protected componentDidUnload(): void {
    this.emitInputState(false);
  }

  protected componentDidUpdate(): void {
    this.emitInputState();
  }

  protected onBlur(): void {
    this.validate();
    this.cwBlur.emit();
  }

  protected onChange(): void {
    this.cwChange.emit();
  }

  protected onFocus(): void {
    this.cwFocus.emit();
  }

  protected onInput(): void {
    this.value = this.inputText.value;
    this.cwInput.emit();
  }

  protected render() {
    const attributes = {
      disabled: this.disabled,
      id: this.id,
      name: this.name,
      max: this.max,
      maxLength: this.maxlength,
      min: this.min,
      minLength: this.minlength,
      pattern: this.pattern,
      placeholder: this.placeholder,
      readonly: this.readonly,
      required: this.required,
      type: this.type,
      value: this.value
    };

    const cssMainClasses = `cw-text-input ${ this.error ? 'cw-text-input--error' : '' }`;

    return <div class={ cssMainClasses }>
      <input ref={ (element) => this.inputText = element }
        class='cw-text-input__field'
        { ...attributes }
        onBlur={ () => this.onBlur() }
        onChange={ () => this.onChange() }
        onFocus={ () => this.onFocus() }
        onInput={ () => this.onInput() }
      />
      { this.error && <span class='cw-text-input__field__error-message'>{ this.error }</span> }
    </div>
  }

  private emitInputState(connected: boolean = true): void {
    this.inputStateChanged.emit({
      connected,
      disabled: this.disabled,
      valid: !this.error,
    });
  }
}
