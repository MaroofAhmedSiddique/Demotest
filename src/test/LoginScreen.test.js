import React from 'react';
import renderer, {act} from 'react-test-renderer';
import LoginScreen from '../screens/LoginScreen';

test('LoginScreen renders correctly', () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Email input can be typed into', () => {
  const component = renderer.create(<LoginScreen />);
  const emailInput = component.root.findByProps({placeholder: 'Email'});
  emailInput.props.onChangeText('test@example.com');
  expect(emailInput.props.value).toBe('test@example.com');
});

describe('LoginScreen', () => {
  it('calls handleLogin when the login button is pressed', () => {
    // Create a mock navigation object
    const navigation = {
      replace: jest.fn(),
    };

    // Render the component
    const component = renderer.create(<LoginScreen navigation={navigation} />);
    const instance = component.root;

    // Find the login button by its testID and simulate a press
    const loginButton = instance.findByProps({testID: 'loginButton'});
    loginButton.props.onPress();

    // Clean up
    component.unmount();
  });
});

test('Error message is displayed for empty email', () => {
  const component = renderer.create(<LoginScreen />);
  const loginButton = component.root.findByProps({testID: 'loginButton'});
  loginButton.props.onPress();
  const errorLabel = component.root.findByProps({testID: 'errorLabel'});
  expect(errorLabel.props.children).toBe('Email is required');
});
