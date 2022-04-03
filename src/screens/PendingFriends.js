import React, { Component } from 'react';

import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Item,
  Button,
  StyleSheet,
  SegmentedControlIOSBase,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import {List,ListItem, Avatar } from 'react-native-elements';




class PendingFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
        data: [],
        refreshing: true,
        }
    }

    componentDidMount() {
        // this.fetchCats();
        this.fetchFriends();
    }

    getListViewItem = (item) => {  
        console.log('trying to add my friend' + item);
        this.addFriend(item);
    }  

    fetchFriends(e){
        // this.setState({ refreshing: true });
        const requestOptions = {
            method: 'POST',
            headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {username: this.props.nameOfUser}
            ),
          };
          console.log('username' + this.props.userName);
          fetch('http://18.219.228.229:3000/get_recs', requestOptions) //elastic ip.. cool.
            .then(response => response.json())
            .then(resJson => {
              console.log(JSON.stringify(resJson))
              console.log(resJson)
              this.setState({data: resJson });
              //this.predictionChange(data["message"])
            })
            .catch(e => {
                console.log(e);
                
            });
    }

    addFriend(e){
        const requestOptions = {
          method: 'POST',
          headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {username: this.props.nameOfUser, pending: e}
          ),
        };
        fetch('http://18.219.228.229:3000/friends', requestOptions) //elastic ip.. cool.
          .then(response => response.json())
          .then(data => {
            console.log(JSON.stringify(data))
            console.log(data)
            //this.predictionChange(data["message"])
          })
          .then(this.checkFriend(this.props.userName))
          .then(this.deleteFriend(this.props.userName))
          .catch(error=> console.log(error))
    
    
          // delay(1000).then(() => this.checkFriend(this.state.searchName));
          // //
          // delay(1000).then(() => this.deleteFriend(this.state.searchName));
    
      }
    
      checkFriend(e){
        const requestOptionsTwo = {
          method: 'GET',
          headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
        };
        fetch('http://18.219.228.229:3000/check_match', requestOptionsTwo) //elastic ip.. cool.
          .then(response => response.json())
          .then(data => {
            console.log(JSON.stringify(data))
            console.log(data)
            //this.predictionChange(data["message"])
          })
          .catch(error=> console.log(error))
      }
    
      deleteFriend(e){
        const requestOptionsThree = {
          method: 'GET',
          headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
        };
        fetch('http://18.219.228.229:3000/delete_pending', requestOptionsThree) //elastic ip.. cool.
          .then(response => response.json())
          .then(data => {
            console.log(JSON.stringify(data))
            console.log(data)
            //this.predictionChange(data["message"])
          })
          .catch(error=> console.log(error))
      }

    fetchCats() {
        this.setState({ refreshing: true });
        // getCats(10, 10) // 10 random results from 10th page
        //   .then(res => res.json())
        //   .then(resJson => {
        //     this.setState({ data: resJson, refreshing: false });
        //   }).catch(e => {
        //     console.log(e);
        //     this.setState({ refreshing: false });
        //   });
        this.setState({data : this.state.data, refreshing:false})
    }

    

    ItemSeparator = () => <View style={style.separator} />

    renderItemComponent = (data) =>  
    <TouchableOpacity style={styles.container}>

    </TouchableOpacity>
  
    handleRefresh = () => {
      this.setState({ refreshing: false }, () => { this.fetchCats()});
    }

    


    render() 
    {
        const {nameOfUser} = this.props;
        console.log('testing' + nameOfUser);
          const Item = ({ title }) => (
            <View >
              <Text onPress={this.getListViewItem.bind(this, title)}>{title}</Text>
            </View>
          );

            const renderedItem = ({item}) => (
                <Item title={item.title}/>
            );

            const myListEmpty = () => {
            return (
                <View style={{ alignItems: "center" }}>
                <Text style={style.item}>You have no friends</Text>
                </View>
            );
            };

    return (
        <SafeAreaView>
            <FlatList
                data={this.state.data}
                renderItem={renderedItem}
        
            />
      </SafeAreaView>
    );
  }
}



const style = StyleSheet.create({
    container: {
      height: 300,
      margin: 10,
      backgroundColor: '#FFF',
      borderRadius: 6,
      ...Platform.select({
        ios: {
          shadowOffset: { width: 0, height: 2 },
          shadowColor: 'black',
          shadowOpacity: 0.8,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    image: {
      height: '100%',
      borderRadius: 4,
    },
    separator: {
      height: 2,
      backgroundColor: "rgba(0,0,0,0.5)",
      marginLeft: 10,
      marginRight: 10,
    }
  });




  export default PendingFriends;