import { View, Text ,SafeAreaView,TouchableOpacity,Image,TextInput} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const AddJob = ({route,navigation}) => {
    const {user} = route.params;
    const [value, onChangeText] = React.useState('');

    const addJob = async () => {
        try {
            const response = await fetch(`https://654ad12a5b38a59f28ee40a4.mockapi.io/user/${user.id}`,{
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    todos: [...user.todos,{id:Math.random(),task:value}]
                })
            })
            const responseJson = await response.json();
            console.log(responseJson);
        }
        catch(error) {
            console.log(error);
        }
    }


  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity style={{marginLeft:10}}
            // click sẽ quay lại màn hình trước đó
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Image
                source={{
                    uri: user.image,
                }}
                style={{ width: 50, height: 50,resizeMode:'contain',borderRadius:100 }} 
                />
                <View style={{marginRight:10,marginLeft:5}}>
                    <Text style={{fontSize:20,fontWeight:700}}>Hi {user.name}</Text>
                    <Text style={{fontSize:16,fontWeight:400,color:'gray'}}>Have agrate day a head</Text>
                </View>
            </View>

        </View>

        <View style={{alignItems:'center',marginTop:100}}>
            <Text style={{fontSize:30,fontWeight:700,color:'blue'}}>ADD YOUR JOB</Text>
        </View>

        {/* input job */}
        <View style={{alignItems:'center',marginTop:10}}>
            <View style={{alignItems:'center',marginTop:20,flexDirection:'row',borderWidth:1,width:'80%',borderRadius:10}}>
                <MaterialCommunityIcons name="book-account" size={26} color="black" style={{marginLeft:10}}/>
                <View style={{width:'80%',justifyContent:'center',marginLeft:10}}>                
                    <TextInput
                        style={{ height: 40, borderColor: 'gray',fontSize:20}}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                        placeholder="Input your job"
                        
                    />
                </View>
            </View>
        </View>

        {/* button finish */}
        <View style={{alignItems:'center',marginTop:100}}>
            <TouchableOpacity style={{backgroundColor:'rgba(0, 189, 214, 1)',width:'60%',height:50,borderRadius:10,justifyContent:'center',alignItems:'center'}}
                onPress={() => {
                    addJob();
                    navigation.navigate('Home');

                }}
            >
                <Text style={{fontSize:20,fontWeight:700,color:'white'}}>Finish</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    
  )
}

export default AddJob