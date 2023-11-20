import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 40,
        paddingHorizontal: 20,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
      logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 20,
      },
      separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
      },
      linkContainer: {
        flex: 1,
        paddingTop: 7,
        gap: 20, // Define o espaçamento entre as opções
      },
      link: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        marginRight: 10,
      },
});
