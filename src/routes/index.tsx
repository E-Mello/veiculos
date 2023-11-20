import DrawerNavigator from '../components/DrawerNavigator'; // Corrija o caminho para o seu DrawerNavigator
import { NavigationContainer } from '@react-navigation/native'; // Importe o NavigationContainer
import React from 'react';

const Routes = () => (
  <NavigationContainer> {/* Adicione o NavigationContainer aqui */}
    <DrawerNavigator />
  </NavigationContainer>
);

export default Routes;
