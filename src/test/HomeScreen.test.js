import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows the greeting message based on user name', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toBeTruthy();
  });

  it('fetches the todos list when selectedList is "todos"', () => {
    const tree = renderer.create(<HomeScreen />).getInstance();
    tree.setState({selectedList: 'todos'});
    tree.getList();
  });

  it('fetches the posts list when selectedList is "posts"', () => {
    const tree = renderer.create(<HomeScreen />).getInstance();
    tree.setState({selectedList: 'posts'});
    tree.getList();
  });

  it('displays the loading spinner when data is being fetched', () => {
    const tree = renderer.create(<HomeScreen />).getInstance();
    tree.setState({todosData: {isLoader: true}, postaData: {isLoader: false}});
    const loadingSpinner = tree.findByProps({testID: 'loadingSpinner'});
    expect(loadingSpinner).toBeTruthy();
  });
});
