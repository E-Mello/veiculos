import { Modal, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { styles } from './stylesCarDetailsModal';

interface CardDetailsModalProps {
    visible: boolean;
    car: {
        id: number;
        modelo: string;
        fabricante: string;
        tipo_motor: string;
        ano_modelo: number;
        ano_fabricacao: number;
        cor: string;
        qtd_portas: number;
        placa: string;
    };
    onClose: () => void;
}

const CarDetailModal: React.FC<CardDetailsModalProps> = ({ visible, car, onClose }) => {
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
                    <Text style={styles.modalTitle}>{car.fabricante}</Text>
                    <Text style={styles.modalDescription}>{car.modelo}</Text>
                    <Text style={styles.modalDescription}>{car.tipo_motor}</Text>
                    <Text style={styles.modalDescription}>{car.cor}</Text>
                    <Text style={styles.modalDescription}>{car.qtd_portas} Portas</Text>
                    <Text style={styles.modalDescription}>{car.placa}</Text>
                    <Text style={styles.modalDescription}>{car.ano_fabricacao}</Text>
                    <Text style={styles.modalDescription}>{car.ano_modelo}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CarDetailModal;
