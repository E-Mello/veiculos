import Consultas from '../screen/Consultas';
import HomeView from '../screen/HomeView';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Sidebar from './Sidebar';
import TasksView from '../screen/CarsView';
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
        <Drawer.Screen name="Tasks" component={TasksView} />
        <Drawer.Screen name="Consultas" component={Consultas} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
