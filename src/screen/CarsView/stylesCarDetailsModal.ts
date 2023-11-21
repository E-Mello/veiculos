import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
  },
  modalContentMedium: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  column: {
    flex: 1,
    marginLeft: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
