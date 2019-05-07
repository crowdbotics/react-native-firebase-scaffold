import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import AppNavigator from 'app/pages';
import { AppContext, LoadingView } from 'app/components';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.showLoading = () => {
      this.setState({
        loading: true
      });
    };
    this.hideLoading = () => {
      this.setState({
        loading: false
      });
    };
    this.state = {
      loading: false,
      showLoading: this.showLoading,
      hideLoading: this.hideLoading
    };
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <SafeAreaView style={styles.container}>
          <AppNavigator />
        </SafeAreaView>
        <LoadingView />
      </AppContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
