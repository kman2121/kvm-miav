import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import {
  TabViewAnimated,
  TabBar,
  SceneMap
} from 'react-native-tab-view';
import { 
  MiniMap,
  JunkRequest,
  MoveRequest
 } from '../../components';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const FirstRoute = () => (<MoveRequest submitJob={this.props.submitJob} />);
const SecondRoute = () => (<JunkRequest submitJob={this.props.submitJob} />);

export class EnterJobScreen extends React.PureComponent {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Moving' },
      { key: 'second', title: 'Junk Hauling' },
    ],
  };
  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    first: () => <MoveRequest submitJob={this.props.submitJob} cancel={this.props.cancel} />,
    second: () => <JunkRequest submitJob={this.props.submitJob} cancel={this.props.cancel} />
  });

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MiniMap />
            </View>
            <View style={styles.formContainer}>
                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#222'
  },
  formContainer: {
    flex: 3
  }
});
