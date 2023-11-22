import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  noneCars: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollRenderCars: {
    marginBottom: 87,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  renderCars: {
    justifyContent: 'flex-start',
    top: 0,
  },
  carDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  carButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    zIndex: 1,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
