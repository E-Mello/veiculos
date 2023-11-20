import { Modal, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { styles } from './stylesCarDetailsModal';

interface TaskDetailsModalProps {
    visible: boolean;
    task: { id: string; title: string; description: string };
    onClose: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ visible, task, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{task.title}</Text>
                    <Text style={styles.modalDescription}>{task.description}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default TaskDetailsModal;
