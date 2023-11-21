import { Button, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { styles } from './stylesCarModal';

interface Veiculo {
    id: number;
    modelo: string;
    fabricante: string;
    tipo_motor: string;
    ano_modelo: number;
    ano_fabricacao: number;
    cor: string;
    qtd_portas: number;
    placa: string;

}

interface CarModalProps {
    modalVisible: boolean;
    updatingCar: Veiculo | null;
    closeAndClearModal: () => void;
    saveCar: (newCarData?: Partial<Veiculo>) => void; // Aceita um argumento opcional
    setUpdatingCarID: React.Dispatch<React.SetStateAction<[] | null>>;
    handleEditCar: (updatedCar: Veiculo) => void; // Aceita um Veiculo como parâmetro
    createCar: (
        modelo: string,
        fabricante: string,
        tipo_motor: string,
        ano_modelo: number,
        ano_fabricacao: number,
        cor: string,
        qtd_portas: number,
        placa: string
    ) => void;
}


const CarModal: React.FC<CarModalProps> = ({
    modalVisible,
    handleEditCar,
    closeAndClearModal,
    saveCar,
    setUpdatingCarID,
    createCar,
    updatingCar,
}) => {

    const [carData, setCarData] = useState<Partial<Veiculo>>({
        modelo: '',
        fabricante: '',
        tipo_motor: '',
        ano_modelo: 0,
        ano_fabricacao: 0,
        cor: '',
        qtd_portas: 0,
        placa: '',
    });

    const handleSaveCar = async () => {
        if (updatingCar) {
            await handleEditCar(
                {
                    ...updatingCar,
                    ...carData,
                } as Veiculo
            );
        } else {
            await createCar(
                carData.modelo || '',
                carData.fabricante || '',
                carData.tipo_motor || '',
                carData.ano_modelo || 0,
                carData.ano_fabricacao || 0,
                carData.cor || '',
                carData.qtd_portas || 0,
                carData.placa || ''
            );
        }
        closeAndClearModal();
    };



    const handleTextInputChange = (key: keyof Veiculo, value: string | number) => {
        setCarData({
            ...carData,
            [key]: value,
        });
    };

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
                            placeholder="Modelo"
                            value={carData.modelo}
                            onChangeText={(text) => handleTextInputChange('modelo', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Fabricante"
                            value={carData.fabricante}
                            onChangeText={(text) => handleTextInputChange('fabricante', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Tipo Motor"
                            value={carData.tipo_motor}
                            onChangeText={(text) => handleTextInputChange('tipo_motor', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ano Modelo"
                            value={carData.ano_modelo ? carData.ano_modelo.toString() : ''}
                            onChangeText={(text) => handleTextInputChange('ano_modelo', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ano Fabricação"
                            value={carData.ano_fabricacao ? carData.ano_fabricacao.toString() : ''}
                            onChangeText={(text) => handleTextInputChange('ano_fabricacao', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cor"
                            value={carData.cor}
                            onChangeText={(text) => handleTextInputChange('cor', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Quantidade de Portas"
                            value={carData.qtd_portas ? carData.qtd_portas.toString() : ''}
                            onChangeText={(text) => handleTextInputChange('qtd_portas', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Placa"
                            value={carData.placa}
                            onChangeText={(text) => handleTextInputChange('placa', text)}
                        />
                    </View>
                    <View style={styles.modalFooter}>
                        <View style={styles.modalButtonGroup}>
                            <TouchableOpacity onPress={handleSaveCar} style={{ ...styles.modalButton, ...styles.modalButtonSave }}>
                                <Text>Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={closeAndClearModal} style={{ ...styles.modalButton, ...styles.modalButtonCancel }}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

export default CarModal;
