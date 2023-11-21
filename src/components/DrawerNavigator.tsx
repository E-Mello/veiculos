import CarsView from '../screen/CarsView';
import Consultas from '../screen/Consultas';
import HomeView from '../screen/HomeView';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Sidebar from './Sidebar';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <Sidebar {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeView} />
        <Drawer.Screen name="Carros" component={CarsView} />
        <Drawer.Screen name="Consultas" component={Consultas} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
