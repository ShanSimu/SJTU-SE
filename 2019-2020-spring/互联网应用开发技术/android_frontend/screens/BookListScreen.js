import * as React from 'react';
import {View,Text,AsyncStorage,ActivityIndicator, FlatList, Image,StyleSheet,TouchableHighlight,TextInput,DeviceEventEmitter} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getBooks} from "../utils/services";
export class BookListScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            books:[],
            searchBooks:[],
            iconBase64:"",
            details:"",
        };
    };

    componentDidMount() {
        const callback = (data) =>{
            this.setState({books:data,searchBooks:data});
        };
        getBooks({"search":null} , callback);

    };

    search = (value) =>{
        let needle = value.toLowerCase();
        if(!needle){
            // console.log("empty");
            this.setState({searchBooks:this.state.books});
            // console.log(this.)
            return;
        }

        let tmpData = this.state.books.filter(function (row) {
            return (row.title.toString().toLowerCase().indexOf(needle) > -1
                ||row.author.toString().toLowerCase().indexOf(needle) > -1
                ||row.isbn.toString().toLowerCase().indexOf(needle) > -1);
        });
        this.setState({searchBooks:tmpData});

    };

    navigateToDetail({item}){
        this.props.navigation.push("Detail",{detail:item});
    };

    renderBook=({ item })=>{
        return (
            <TouchableHighlight onPress={()=>{this.navigateToDetail({item});}} >
                <View style={styles.container}>
                    <Image
                        source={{uri: item.icon.iconBase64}}
                        style={styles.image}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.name}>{item.title}</Text>
                        <Text style={styles.author}>{item.author}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 2}}>
                <TextInput
                    onChangeText={text =>this.search(text)}
                />
                <FlatList
                    data={this.state.searchBooks}
                    renderItem={this.renderBook}
                    style={styles.list}
                    keyExtractor={item => item.key}
                />
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
        backgroundColor: "#F5FCFF"
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
        backgroundColor: '#F5FCFF',
    },
});
