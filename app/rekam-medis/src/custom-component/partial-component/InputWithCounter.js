import React, { Component } from 'react';

const emptyString = '';

class InputWithCounter extends Component {
  constructor(props) {
    super(props);

    const { count, counterPositionStyle, children, ...nativeProps } = props;

    this.count = count;
    this.nativeProps = {
      ...{
        onChange: (e) =>
          this.setState({
            count: this.count - e.target.value.length,
            value: e.target.value,
          }),
      },
      ...nativeProps,
    };

    if (false === counterPositionStyle) {
      this.counterProps = {
        className: 'help-block pull-right',
      };
    } else {
      this.counterProps = {
        style: counterPositionStyle,
      };
    }

    const value = props.value || props.defaultValue || emptyString;

    this.state = {
      count: this.count - value.length,
      value: value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      const value = nextProps.value || nextProps.defaultValue || emptyString;

      const {
        count,
        counterPositionStyle,
        children,
        ...nativeProps
      } = nextProps;
      this.nativeProps = { ...this.nativeProps, ...nativeProps };

      this.setState({
        count: this.count - value.length,
        value: value,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }

  render() {
    const { value, ...props } = this.nativeProps,
      valueAttribute =
        undefined === props.defaultValue ? 'value' : 'defaultValue';

    return (
      <div>
        {React.cloneElement(this.props.children, {
          ...this.props.children.props,
          ...props,
          ...{ [valueAttribute]: this.state.value },
        })}

        {false !== this.count && (
          <span {...this.counterProps}>
            <span className="label label-default">{this.state.count}</span>
          </span>
        )}
      </div>
    );
  }
}

InputWithCounter.defaultProps = {
  className: 'form-control',
  value: '',
  count: false,

  counterPositionStyle: false,

  onFocus: (e) => e.target.setSelectionRange(0, 9999),
};

class InputText extends Component {
  render() {
    return (
      <InputWithCounter {...this.props}>
        <input
          ref={(element) => (this.element = element)}
          type="text"
          maxLength={this.props.count}
        />
      </InputWithCounter>
    );
  }

  focus() {
    this.element.focus();
  }
}

class TextArea extends Component {
  render() {
    return (
      <InputWithCounter {...this.props}>
        <textarea
          ref={(element) => (this.element = element)}
          maxLength={this.props.count}
        />
      </InputWithCounter>
    );
  }

  focus() {
    this.element.focus();
  }
}

export { InputText as default, TextArea as TextAreaWithCounter };
