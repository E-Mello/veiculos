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
                <View style={styles.modalContentMedium}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Descrição completa do veículo</Text>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.modalDescription}>Fabricante: {car.fabricante}</Text>
                                <Text style={styles.modalDescription}>Modelo: {car.modelo}</Text>
                                <Text style={styles.modalDescription}>Tipo de motor: {car.tipo_motor}</Text>
                                <Text style={styles.modalDescription}>Cor: {car.cor}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.modalDescription}>{car.qtd_portas} Portas</Text>
                                <Text style={styles.modalDescription}>Placa: {car.placa}</Text>
                                <Text style={styles.modalDescription}>Ano de fabricação: {car.ano_fabricacao}</Text>
                                <Text style={styles.modalDescription}>Ano do modelo: {car.ano_modelo}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    );
};

export default CarDetailModal;
