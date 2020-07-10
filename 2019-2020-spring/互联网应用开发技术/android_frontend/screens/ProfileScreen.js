import * as React from 'react';
import { Button, View, Text } from 'react-native';

export class ProfileScreen extends React.Component{
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home Screen</Text>
                <Button
                    title="BookListScreen"
                    onPress={()=>this.props.navigation.goBack()}
                />
            </View>
        );
    }
}
