import React from 'react';
import renderer from 'react-test-renderer';
import {TouchableOpacity} from 'react-native';
import PostDetailsScreen from '../screens/PostdetailScreen'; // Import your component

// Mock navigation props
const navigation = {
  goBack: jest.fn(),
};

describe('PostDetailsScreen', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <PostDetailsScreen
          route={{params: {item: {}}}}
          navigation={navigation}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls goBack when back button is pressed', () => {
    const component = renderer.create(
      <PostDetailsScreen
        route={{params: {item: {}}}}
        navigation={navigation}
      />,
    );
    const backButton = component.root.findByType(TouchableOpacity);
    backButton.props.onPress();
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
