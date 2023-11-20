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
  noneTasks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollRenderTasks: {
    marginBottom: 87,
  },
  renderTasks: {
    justifyContent: 'flex-start',
    top: 0,
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  newTaskButton: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  taskButtons: {
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
