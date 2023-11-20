import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

interface CustomScreenProps {
  name: string;
  navigation: any; // Corrija a tipagem de acordo com o tipo de navegação apropriado
}

const CustomScreen: React.FC<CustomScreenProps> = ({ name, navigation }: CustomScreenProps) => {
  return (
    <View>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ alignItems: 'flex-end', margin: 16 }}
          onPress={() => navigation.openDrawer()}
        >
          <FontAwesome5 name="bars" size={24} color="#161924" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.text}>{name}Screen</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: '#161924',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default CustomScreen;
