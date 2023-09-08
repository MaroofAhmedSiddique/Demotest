import React from 'react';
import renderer from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from '../screens/ProfileScreen'; // Import your component

// Mock AsyncStorage methods
AsyncStorage.getItem = jest.fn(() =>
  Promise.resolve(
    '{"name":"John","fullName":"John mailto:doe","email":"john@example.com"}',
  ),
);
AsyncStorage.clear = jest.fn(() => Promise.resolve());

// Mock navigation props
const navigation = {
  reset: jest.fn(),
};

describe('UserProfileScreen', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ProfileScreen navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('loads user data from AsyncStorage', async () => {
    await renderer.create(<ProfileScreen navigation={navigation} />);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('user_data');
  });

  it('logs out when the logout button is pressed', async () => {
    const component = renderer.create(
      <ProfileScreen navigation={navigation} />,
    );
    const logoutButton = component.root.findByProps({testID: 'logoutButton'});
    await logoutButton.props.onPress();
    expect(AsyncStorage.clear).toHaveBeenCalled();
    expect(navigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  });
});
