import * as React from 'react';
import { View, Text, Button, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlatlistInfinity from './src/flatlistInfinity';
import RealmSync from './src/realmSyncToServer/index'

LogBox.ignoreLogs(['Warning: ...', 'ERROR: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Stack = createNativeStackNavigator();

const GateWay = (props) => {

  const navigate = (screenName) => {
    props.navigation.navigate(screenName)
  }

  return (
    <View>
      <Button title='FlatlistInfinity' onPress={() => navigate('FlatlistInfinity')}></Button>
      <Button title='RealmSync' onPress={() => navigate('RealmSync')}></Button>
    </View>
  )
}

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GateWay" component={GateWay} />
        <Stack.Screen name="FlatlistInfinity" component={FlatlistInfinity} />
        <Stack.Screen name="RealmSync" component={RealmSync} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App