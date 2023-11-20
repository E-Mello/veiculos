import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { styles } from './styles';

interface SidebarProps {
  navigation: any;
}

const Sidebar: React.FC<SidebarProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Logo Fictícia */}
        <Image
          source={require('../../../assets/logo.png')} // Substitua pelo caminho da sua logo
          style={styles.logo}
        />
        {/* Botão para Fechar a Sidebar */}
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Feather name="x" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />

      {/* Wrap das opções com View para aplicar o espaçamento */}
      <View style={styles.linkContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.link}
        >
          <Feather name="home" size={20} color="#333" style={styles.icon} />
          <Text>Página Inicial</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Tasks')}
          style={styles.link}
        >
          <Feather name="pen-tool" size={20} color="#333" style={styles.icon} />
          <Text>Veículos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Consultas')}
          style={styles.link}
        >
          <Feather name="list" size={20} color="#333" style={styles.icon} />
          <Text>Consultas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sidebar;
