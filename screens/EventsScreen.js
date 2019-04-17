import React from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  Button
} from "react-native";
import { default as service } from "./services";

export default class EventsScreen extends React.Component {
  static navigationOptions = {
    title: "Events"
  };

  state = {
    data: [],
    refresh: true
  };

  componentDidMount() {
    this.fetchData("events");
  }

  fetchData() {
    service("events")
      .then(res => {
        this.setState({ refresh: false, data: res });
      })
      .catch(err => {
        this.setState({ data: [], refresh: false });
      });
  }

  loadingView() {
    return (
      <View>
        {this.state.refresh ? (
          <ActivityIndicator size="small" color="#00ff00" />
        ) : null}
      </View>
    );
  }
  emptyView() {
    return (
      <View>
        {this.state.refresh ? null : (
          <Button
            onPress={() => {
              this.setState({ refresh: true });
              this.fetchData("Events");
            }}
            title={this.state.data.length ? "Refresh" : "Retry"}
          />
        )}
      </View>
    );
  }

  renderItem(item) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.name || "Name"}</Text>
        <Text style={styles.body}>{item.description || "Description"}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.loadingView()}
        {this.emptyView()}
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff"
  },
  card: {
    flex: 1,
    backgroundColor: "#00ff00",
    minHeight: 75, 
    flexDirection: 'column', 
    borderWidth: 2,
    borderRadius: 6,
    margin: 4,
    padding: 4

  },
  space: {
    height: 8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  body: {
    fontSize: 16
  }
});
