import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlatlistOptimized from './src/optimizedListView';
import RealmDatabase from './src/oflineDatabase';

const Stack = createNativeStackNavigator();

const GateWay = (props) => {

  const navigate = (screenName) => {
    props.navigation.navigate(screenName)

  }


  return (
    <View>
      <Button title='Flatlist' onPress={() => navigate('FlatlistOptimized')}></Button>
      <Button title='Realm Database' onPress={() => navigate('RealmDatabase')}></Button>
    </View>
  )
}

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GateWay" component={GateWay} />
        <Stack.Screen name="FlatlistOptimized" component={FlatlistOptimized} />
        <Stack.Screen name="RealmDatabase" component={RealmDatabase} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App