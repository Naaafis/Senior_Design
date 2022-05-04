import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Friend #1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Friend #2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Friend #3',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Friend #4',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Friend #5',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'Friend #6',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d77',
    title: 'Friend #7',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d78',
    title: 'Friend #8',
  },
];

const Item = ({title}) => (
  <View>
    <Text style={styles.body}>{title}</Text>
  </View>
);

class FriendsScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    };
    this.searchNameChange = this.searchNameChange.bind(this);
  }

  searchNameChange(searchName){
    this.setState({searchName});
  }

  componentDidMount() {
    const requestOptions = {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({username: this.props.route.params.userName}),
    };
    fetch('http://18.219.228.229:3000/get_friends', requestOptions) //elastic ip.. cool.
      .then(response => response.json())
      .then(resJson => {
        console.log(JSON.stringify(resJson))
        console.log(resJson)
        this.setState({data: resJson });
        //this.predictionChange(data["message"])
      })
      .catch(error => console.log(error));
  }

  render() {
    const renderItem = ({item}) => <Item title={item.title} />;

    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Friends</Text>
        <View style={styles.list}>
          <FlatList
            data={this.state.data}
            renderItem={renderItem}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'darksalmon',
  },
  list: {
    alignSelf: 'center',
    backgroundColor: 'peachpuff',
    maxHeight: 500,
    width: '90%',
  },
  title: {
    alignSelf: 'center',
    marginTop: 1,
    fontFamily: 'Sarpanch-ExtraBold',
    fontSize: 48,
    color: 'yellow',
  },
  body: {
    marginTop: 30,
    marginLeft: 20,
    fontFamily: 'Sarpanch-Bold',
    fontSize: 34,
    color: 'black',
  },
  inputBox: {
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    fontSize: 18,
    color: 'black',
    backgroundColor: 'bisque',
  },
  buttonContainer: {
    marginTop: 24,
    alignSelf: 'center',
    minWidth: 200,
    elevation: 10,
    backgroundColor: '#009688',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export {FriendsScreen};