import React, { PureComponent } from 'react';
import { Form, Picker } from 'native-base';
import PropTypes from 'prop-types';

class CurrencyForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
    };
  }

  static propTypes = {
    currencies: PropTypes.object,
    selected: PropTypes.any,
    onValueChange: PropTypes.func,
  };

  render() {
    const { currencies, selected, onValueChange } = this.props;
    return (
      <Form
        style={{
          alignItems: 'flex-end',
        }}
      >
        <Picker
          mode="dropdown"
          style={{ width: 100, height: 40 }}
          selectedValue={selected}
          onValueChange={onValueChange}
        >
          {Object.keys(currencies).map((elem, index) => {
            return (
              <Picker.Item
                label={currencies[elem]}
                value={elem}
                key={elem + index}
              />
            );
          })}
        </Picker>
      </Form>
    );
  }
}

export default CurrencyForm;
