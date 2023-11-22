import { Button, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

interface Modelo {
    id: number;
    nome: string;
}

interface TipoMotor {
    id: number;
    tipo_motor: string;
}

interface Fabricante {
    id: number;
    nome: string;
}

export default function RegisterCar() {
    const [modelo, setModelo] = useState<Modelo[]>([]);
    const [fabricante, setFabricante] = useState<Fabricante[]>([]);
    const [tipo_motor, setTipo_motor] = useState<TipoMotor[]>([]);
    const [ano_modelo, setAno_modelo] = useState('');
    const [ano_fabricacao, setAno_fabricacao] = useState('');
    const [cor, setCor] = useState('');
    const [qtd_portas, setQtd_portas] = useState('');
    const [placa, setPlaca] = useState('');
    const [selectedModelo, setSelectedModelo] = useState('');
    const [selectedFabricante, setSelectedFabricante] = useState('');
    const [selectedTipoMotor, setSelectedTipoMotor] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    /**
     * TODO: Carregar os tipo_motor do banco de dados
     */

    const fetchTipoMotor = () => {
        fetch('http://192.168.0.11:5000/tipo_motor')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setTipo_motor(data); // Atualiza o estado com os dados recebidos
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                if (error instanceof TypeError && error.message === 'Network request failed') {
                    console.error('Network request failed. Check server availability or connection.');
                }
            });

    };

    useEffect(() => {
        fetchTipoMotor();
    }, []);

    /**
     * TODO: Carregar os modelos dos carros do banco de dados
     */

    const fetchModelo = () => {
        fetch('http://192.168.0.11:5000/modelo')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setModelo(data); // Atualiza o estado com os dados recebidos
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                if (error instanceof TypeError && error.message === 'Network request failed') {
                    console.error('Network request failed. Check server availability or connection.');
                }
            });

    };

    useEffect(() => {
        fetchModelo();
    }, []);

    /**
     * TODO: Carregar os fabricantes dos carros do banco de dados
     */

    const fetchFabricante = () => {
        fetch('http://192.168.0.11:5000/fabricante')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setFabricante(data); // Atualiza o estado com os dados recebidos
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                if (error instanceof TypeError && error.message === 'Network request failed') {
                    console.error('Network request failed. Check server availability or connection.');
                }
            });

    };

    useEffect(() => {
        fetchFabricante();
    }, []);

    const handleRegisterCar = async () => {
        try {
            const response = await fetch('http://192.168.0.11:5000/veiculos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    modelo,
                    fabricante,
                    tipo_motor,
                    ano_modelo,
                    ano_fabricacao,
                    cor,
                    qtd_portas,
                    placa,
                }),
            });
            if (response.ok) {
                console.log('Car created successfully.');
            } else {
                console.error('Car creation failed:', response.statusText);
            }
            clearFields();
        } catch (error) {
            console.error('Error creating car:', error);
        }
        console.log(modelo, fabricante, tipo_motor, ano_modelo, ano_fabricacao, cor, qtd_portas, placa);
        console.log(JSON.stringify({
            modelo,
            fabricante,
            tipo_motor,
            ano_modelo,
            ano_fabricacao,
            cor,
            qtd_portas,
            placa,
        }));
    }

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        clearFields();
    };

    const clearFields = () => {
        setModelo([]);
        setFabricante([]);
        setTipo_motor([]);
        setAno_modelo('');
        setAno_fabricacao('');
        setCor('');
        setQtd_portas('');
        setPlaca('');
    };



    return (
        <View style={styles.registerContainer}>
            <TouchableOpacity
                onPress={openModal}
                style={styles.newCarButton}
            >
                <Text>Cadastrar Novo Carro</Text>
            </TouchableOpacity>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
                statusBarTranslucent={true}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Cadastro de veículo</Text>
                    <View style={styles.viewContent}>
                        <Picker
                            selectedValue={selectedModelo}
                            onValueChange={(itemValue) => setSelectedModelo(itemValue)}
                        >
                            <Picker.Item label="Selecione o modelo" value="" />
                            {modelo.map(item => (
                                <Picker.Item key={item.id} label={item.nome} value={item.nome} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={selectedFabricante}
                            onValueChange={(itemValue) => setSelectedFabricante(itemValue)}
                        >
                            <Picker.Item label="Selecione o fabricante" value="" />
                            {fabricante.map(item => (
                                <Picker.Item key={item.id} label={item.nome} value={item.nome} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.viewContent}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setAno_modelo}
                            value={ano_modelo}
                            placeholder="Ano do Modelo"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setAno_fabricacao}
                            value={ano_fabricacao}
                            placeholder="Ano de Fabricação"
                        />
                    </View>

                    <View style={styles.viewContent}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setQtd_portas}
                            value={qtd_portas}
                            placeholder="Quantidade de Portas"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setPlaca}
                            value={placa}
                            placeholder="Placa"
                        />
                    </View>

                    <View style={styles.viewContent}>
                        <Picker
                            selectedValue={selectedTipoMotor}
                            onValueChange={(itemValue) => setSelectedTipoMotor(itemValue)}
                        >
                            <Picker.Item label="Selecione o tipo de motor" value="" />
                            {tipo_motor.map(item => (
                                <Picker.Item key={item.id} label={item.tipo_motor} value={item.tipo_motor} />
                            ))}
                        </Picker>
                        <TextInput
                            style={styles.input}
                            onChangeText={setCor}
                            value={cor}
                            placeholder="Cor"
                        />
                    </View>
                    <View style={styles.footerInputs}>
                        <Button title="Cadastrar" onPress={handleRegisterCar} />
                        <Button title="Cancelar" onPress={closeModal} />
                    </View>

                </View>
                <View>
                    <Button title="Fechar" onPress={closeModal} />
                </View>
            </Modal>
        </View>
    );
}

export const styles = StyleSheet.create({
    registerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1f91c1',
    },
    newCarButton: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        backgroundColor: '#1f91c1',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
    },
    title: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    viewContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    footerInputs: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        gap: 10,
        justifyContent: 'flex-end',
        paddingTop: 70,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});