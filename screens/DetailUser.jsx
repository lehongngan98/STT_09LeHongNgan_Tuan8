import { View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React,{useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { SearchBar } from '@rneui/themed';
import { CheckBox } from '@rneui/themed';

  const DetailUser = ({ route ,navigation}) => {
    const { user } = route.params;
    if (!user) {
      return (
        <View>
          <Text>User not found. Please go back and try again.</Text>
        </View>
      );
    }

    const [search, setSearch] = useState("");
    const [checked, setChecked] = React.useState(true);

    const toggleCheckbox = () => setChecked(!checked);
    const updateSearch = (search) => {
        setSearch(search);
    };

    // xoá job trong mảng todos 
    const deleteJob = async (id) => {
        try {
            const response = await fetch(`https://654ad12a5b38a59f28ee40a4.mockapi.io/user/${user.id}`,{
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    todos: user.todos.filter((item) => item.id !== id)
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
        <View style={{alignItems:'center',marginTop:20}}>
            <View style={{width:'80%',justifyContent:'center'}}>
                <SearchBar
                    placeholder="Search Here..."
                    onChangeText={updateSearch}
                    value={search}
                    platform="ios"
                    style={{width:'60%'}}
                />
            </View>
        </View>
        <FlatList
            data={user.todos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:10,marginVertical:5,backgroundColor:'rgba(222, 225, 250, 0.20)'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <CheckBox
                            checked={checked}
                            onPress={toggleCheckbox}
                            iconType="material-community"
                            checkedIcon="checkbox-outline"
                            uncheckedIcon={'checkbox-blank-outline'}
                        />
                        <Text style={{fontSize:20,fontWeight:700}}>{item.task}</Text>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize:16,fontWeight:700}}>{item.name}</Text>
                            <Text style={{fontSize:14,fontWeight:400,color:'gray'}}>{item.email}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginRight:20}}>                        
                        <TouchableOpacity
                            
                            // click sẽ delete job và quay lại màn hình trước đó
                            onPress={() => {deleteJob(item.id);
                                navigation.goBack()
                            }}
                        >
                            <AntDesign name="edit" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

        />
        <View>
            <TouchableOpacity style={{backgroundColor:'#FF6C44',width:'90%',height:50,justifyContent:'center',alignItems:'center',borderRadius:10,marginHorizontal:20,marginVertical:10}}
                onPress={() => navigation.navigate('AddJob', { user : user})}
            >
                <Text style={{fontSize:20,fontWeight:700,color:'white'}}>Add new task</Text>
            </TouchableOpacity>
        </View>
        
      </SafeAreaView>
    );
  };
  


export default DetailUser