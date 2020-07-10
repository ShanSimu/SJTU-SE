import * as React from 'react';
import {View,Text,AsyncStorage,ActivityIndicator, FlatList, Image,StyleSheet,TouchableHighlight,TextInput,Button,DeviceEventEmitter} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getCart, emptyCart, getOrder} from "../utils/services";
import object from "../utils/constant";

export class CartScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            iconBase64:"",
            details:"",
            number:0,
        };
    };

    handlePay = () => {
        const callback = () =>{
            console.log("purchase done!");
            this.setState({data:[]});
        };
        console.log("pay!");
        emptyCart({"customer":object.userID} , callback);

        const message = "empty the cart";
        DeviceEventEmitter.emit('cart',message);
    };

    componentDidMount() {
        const callback = (data) =>{
            console.log(data);
            this.setState({data:data});
        };
        getCart({"customer":object.userID} , callback);

        this.listener = DeviceEventEmitter.addListener('book',(message) => {
            console.log("Cart Updated !");
            getCart({"customer":object.userID} , callback);
        });
    };

    renderBook=({ item })=>{
        return (
            <TouchableHighlight onPress={()=>{this.navigateToDetail({item});}} >
                <View style={styles.container}>
                    <Image
                        source={{uri: item.iconBase64}}
                        style={styles.image}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.name}>{item.title}</Text>
                        <Text style={styles.author}>{item.author}</Text>
                        <Text>{item.number}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 2}}>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderBook}
                    style={styles.list}
                    keyExtractor={item => item.key}
                />
                <View>
                    <Button
                        onPress={this.handlePay}
                        title="Buy"
                        color="#841584"
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },
    author: {
        fontSize:10,
        textAlign: 'center',
    },
    rightContainer: {
        flex: 1,
        paddingRight:10,
    },
    image: {
        width: 53,
        height: 81
    },
    list: {
        paddingLeft:10,
        paddingRight:5,
    },
});
