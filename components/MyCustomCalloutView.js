import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';

export default class MyCustomCalloutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
          
       <Text>
           jjj
       </Text>
            <Image
                source={require('../assets/marker/stethoscope.png')}
                style={{ height: 60, width: 60, borderRadius: 30 }}
            />

          
      </View>
    );
  }
}
