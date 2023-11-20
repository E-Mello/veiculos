import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import TaskDetailsModal from './TaskDetailsModal';
import { styles } from './stylesCarItem';

interface TaskItemProps {
    task: {
        id: string;
        title: string;
        description: string;
        completed: boolean;
    };
    editTask: () => void;
    deleteTask: () => Promise<void>;
    toggleTaskCompletion: () => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, editTask, deleteTask, toggleTaskCompletion }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={task.completed ? styles.taskContainerCompleted : styles.taskContainer}>
            <Text style={task.completed ? styles.taskTitleCompleted : styles.taskTitle}>
                {task.title}
            </Text>
            <View style={styles.taskItemGroupButton}>
                <TouchableOpacity
                    onPress={editTask}
                    style={{ ...styles.button, ...styles.editButton }}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={deleteTask}
                    style={{ ...styles.button, ...styles.deleteButton }}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toggleTaskCompletion} // Adicione o onPress aqui
                    style={{
                        ...styles.button,
                        ...styles.completeButton,
                        backgroundColor: task.completed ? '#e0e0e0' : '#4caf50',
                    }}
                >
                    <Text style={styles.buttonText}>
                        {task.completed ? 'Unmark' : 'Mark'} as Completed
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={openModal}
                    style={{ ...styles.button, ...styles.viewButton }}
                >
                    <Text style={styles.buttonText}>View Details</Text>
                </TouchableOpacity>
            </View>
            <TaskDetailsModal visible={modalVisible} task={task} onClose={closeModal} />
        </View>
    );
};

export default TaskItem;
