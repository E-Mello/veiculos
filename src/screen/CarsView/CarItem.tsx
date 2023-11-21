import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import CarDetailsModal from './CarDetailsModal';
import { styles } from './stylesCarItem';

interface CarItemProps {
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
    updateCar: (carId: number) => void;
    handleDeleteCar: (carId: number) => Promise<void>; // Agora a função espera um número como argumento
}


const CarItem: React.FC<CarItemProps> = ({ car, updateCar, handleDeleteCar }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.carContainer}>
            <Text style={styles.carTitle}>
                {car.id}
            </Text>
            <View style={styles.carItemGroupButton}>
                <TouchableOpacity onPress={() => updateCar(car.id)} style={{ ...styles.button, ...styles.editButton }}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDeleteCar(car.id)} style={{ ...styles.button, ...styles.deleteButton }}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={openModal}
                    style={{ ...styles.button, ...styles.viewButton }}
                >
                    <Text style={styles.buttonText}>View Details</Text>
                </TouchableOpacity>
            </View>
            <CarDetailsModal visible={modalVisible} car={car} onClose={closeModal} />
        </View>
    );
};

export default CarItem;
