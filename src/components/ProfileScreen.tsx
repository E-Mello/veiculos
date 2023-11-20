import CustomScreen from './CustomScreen'; // Caminho corrigido para o componente CustomScreen
import React from 'react';

const ProfileScreen = ({ navigation }: any) => (
  <CustomScreen navigation={navigation} name="Profile" /> // Usar o componente CustomScreen
);

export default ProfileScreen;
