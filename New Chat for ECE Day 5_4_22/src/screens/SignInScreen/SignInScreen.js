import React, {Component, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Auth} from 'aws-amplify';

class SignInScreen extends Component {

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     name: ''
  //   }
  //   this.nameChange = this.nameChange.bind(this);
    
  // }

  // nameChange(name) {
  //   this.setState({name});
  // }

  render() {
    const {height} = useWindowDimensions();
    //const navigation = useNavigation();
    const {navigation} = this.props;
    const val = this.props.route.params.val;
    console.log(this.props.test);
    console.log(this.props.route.params.val)
    
    const [loading, setLoading] = useState(false);

    const {
      control,
      handleSubmit,
      formState: {errors},
    } = useForm();

    const onSignInPressed = async data => {
      if (loading) {
        return;
      }

      setLoading(true);
      try {
        const response = await Auth.signIn(data.username, data.password);
        console.log(response);
        
      } catch (e) {
        Alert.alert('Oops', e.message);
      }
      setLoading(false);
    };

    const onForgotPasswordPressed = () => {
      navigation.navigate('ForgotPassword');
    };

    const onSignUpPress = () => {
      navigation.navigate('SignUp');
    };

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text>SIgn in to da account</Text>
          <CustomInput
            name="username"
            placeholder="Username"
            control={control}
            rules={{required: 'Username is required'}}
          />

          <CustomInput
            name="password"
            placeholder="Password"
            secureTextEntry
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 3,
                message: 'Password should be minimum 3 characters long',
              },
            }}
          />

          <CustomButton
            text={loading ? 'Loading...' : 'Sign In'}
            onPress={handleSubmit(onSignInPressed)}
            
          />

          <CustomButton
            text="Forgot?"
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
          />

          <SocialSignInButtons />
          
          <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
