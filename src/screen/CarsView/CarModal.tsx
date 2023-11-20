import { Button, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { styles } from './stylesCarModal';

interface TaskModalProps {
    modalVisible: boolean;
    editingTaskId: string | null; // Alterado para string | null
    newTaskTitle: string;
    newTaskDescription: string;
    closeAndClearModal: () => void;
    saveTask: () => void;
    setNewTaskTitle: (text: string) => void;
    setNewTaskDescription: (text: string) => void;
    setEditingTaskId: React.Dispatch<React.SetStateAction<string | null>>;
    handleEditTask: (newTitle: string, newDescription: string) => void;
    createTask: (title: string, description: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
    modalVisible,
    editingTaskId,
    newTaskTitle,
    newTaskDescription,
    closeAndClearModal,
    saveTask,
    setNewTaskTitle,
    setNewTaskDescription,
    setEditingTaskId,
    handleEditTask,
    createTask,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeAndClearModal}
            style={styles.modal}
            statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.contentModal}>
                    <View style={styles.textInputGroup}>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={newTaskTitle}
                            onChangeText={setNewTaskTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={newTaskDescription}
                            onChangeText={setNewTaskDescription}
                        />
                    </View>
                    <View style={styles.modalFooter}>
                        <View style={styles.modalButtonGroup}>
                            <TouchableOpacity onPress={editingTaskId ? () => handleEditTask(newTaskTitle, newTaskDescription) : () => createTask(newTaskTitle, newTaskDescription)} style={{ ...styles.modalButton, ...styles.modalButtonSave }}>
                                <Text>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeAndClearModal} style={{ ...styles.modalButton, ...styles.modalButtonCancel }}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default TaskModal;
