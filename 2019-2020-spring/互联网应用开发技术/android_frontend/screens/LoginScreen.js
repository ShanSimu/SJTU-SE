import React, { useState } from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    Button,
    Alert
} from 'react-native';
import {login} from "../utils/services";
let {width,height} = Dimensions.get('window');
import object from "../utils/constant";
const myState = 0;
export function LoginScreen({ navigation }){
    const [name, setName] = useState('');
    const [password,setPassword]=useState('');
    return (
        <View style={{ flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.titleStyle}>Login</Text>
                {/*账号和密码*/}
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => setName(text)}
                    value={name}
                    placeholder={'请输入用户名'} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder='请输入密码'
                    onChangeText={text => setPassword(text)}
                    value={password}
                    password={true}/>

                {/*登录*/}
                <Button style={styles.loginBtnStyle} title="登录1" onPress={() => {
                    console.log('go');
                    // navigation.navigate('Home');
                    const callback = (data) => {
                        if(data.myState === 3){
                            object.userID = data.userID;
                            navigation.navigate('Home');
                        }
                        else{
                            console.log('username or password is incorrect !');
                        }
                    };

                    login({"username":name, "password":password}/*values*/,callback);
                }}>
                    <Text style={{color:'white'}}>登录</Text>
                </Button>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // 侧轴的对齐方式
        justifyContent: "center",
        alignItems:'center',
    },
    textInputStyle: {
        width:width*0.9,
        height:40,
        backgroundColor:'white',
        textAlign:'center',
        marginBottom:5
    },
    loginBtnStyle: {
        width: width*0.9,
        height: 40,
        backgroundColor:'blue',
        marginTop:30,
        marginBottom: 20,
        borderRadius:10
    },
    settingStyle: {
        width: width*0.85,
        height: 40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    titleStyle: {
        fontSize:40,
        alignItems:'center',
        paddingBottom:10
    },
});
