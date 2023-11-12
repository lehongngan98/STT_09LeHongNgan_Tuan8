import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import { MaterialCommunityIcons ,Feather } from '@expo/vector-icons';



const Home = ({navigation}) => {
  const [enteredName, setEnteredName] = useState('');
  // đọc api :https://654ad12a5b38a59f28ee40a4.mockapi.io/api/v1/
  const getUserAPI = async () => {
    return await fetch('https://654ad12a5b38a59f28ee40a4.mockapi.io/user')
      .then((response) => response.json())
      .then((json) => {
        return json
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    getUserAPI().then((users) => {
      console.log(users)
    })
  }, [])
  return (
    <SafeAreaView style={{flex:1,alignItems:'center'}}>
      <Text style={{fontSize:30,color:'#8353E2',marginTop:'40%'}}>Manager Your Task</Text>
      <View style={{width:'70%',height:40,borderRadius:10,borderWidth:1,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:30}}>
        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
        <TextInput style={{width:'80%',height:20,fontSize:20,marginLeft:10}} id='name'
          placeholder="Enter your name"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) => setEnteredName(text)}
        />
      </View>
      <TouchableOpacity style={{width:'70%',height:40,borderRadius:10,backgroundColor:'#00BDD6',justifyContent:'center',alignItems:'center',marginTop:30,flexDirection:'row'}}
      //  click sẽ kiểm tra name voi api name
      onPress={() => {
          
          if (enteredName.trim().length === 0) {
            alert('Please enter a valid name');
            return;
          }

          getUserAPI().then((users) => {
            const matchingUser = users.find((user) => user.name === enteredName);
            if (matchingUser) {
              console.log(`User found: ${matchingUser.name}`);
              // Navigate to task management page
              navigation.navigate('DetailUser', { user: matchingUser });
            } else {
              console.log(`User with name ${enteredName} not found`);
              alert(`User with name ${enteredName} not found. Please register first.`);
            }
          });
        }}
      >
        <Text style={{fontSize:20,color:'white',marginRight:5}}>Get Stated</Text>
        <Feather name="arrow-right" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home