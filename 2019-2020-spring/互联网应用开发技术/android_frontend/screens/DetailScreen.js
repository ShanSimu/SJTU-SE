import * as React from 'react';
import {View,Text,Image,StyleSheet,Button,DeviceEventEmitter} from 'react-native';
import object from "../utils/constant";
import {buyBooks} from "../utils/services";

export class DetailScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isbn:"",
            stocks:0,
        }
    }

    handleBuy = () =>{
        const callback = (data) =>{
            console.log(data);
        };

        buyBooks({"customer":object.userID,"book":this.props.route.params.detail.key},callback);

        const message = "Buy a new book";
        DeviceEventEmitter.emit('book',message);
    };
    render(){
        // console.log(this.props.route.params.detail);
        let detail=this.props.route.params.detail;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={{uri: detail.icon.iconBase64}}
                    style={styles.image}
                />
                <View >
                    <Text style={styles.name}>{detail.title}</Text>
                </View>
                <View >
                    <Text >作者：{detail.author}</Text>
                    <Text >ISBD：{detail.isbn}</Text>
                    <Text>库存：{detail.stocks}</Text>
                </View>
                <View>
                    <Text style={styles.description}>{detail.details}</Text>
                </View>
                <View>
                    <Button
                        onPress={this.handleBuy}
                        title="Buy"
                        color="#841584"
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    name:{
        fontSize:20
    },
    image: {
        width: 182,
        height: 245
    },
    description:{
        paddingLeft:50,
        paddingRight:55
    }
});
