import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modal: {
        paddingTop: 30,
      },
      modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      contentModal: {
        width: 350,
        height: 200,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor: '#fff',
      },
      textInputGroup: {
        padding: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
      },
      modalFooter: {
        alignItems: 'center',
      },
      modalButtonGroup: {
        justifyContent: 'space-between',
        width: 250,
        rowGap: 10,
        flexDirection: 'row',
      },
      modalButton: {
        width: 100,
        padding: 8,
        borderRadius: 4,
        marginTop: 4,
        alignItems: 'center',
      },
      modalButtonSave: {
        backgroundColor: '#3498db',
    
      },
      modalButtonCancel: {
        backgroundColor: '#e74c3c',
      },
});