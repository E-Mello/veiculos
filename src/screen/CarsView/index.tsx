import { Button, Modal, ScrollView, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import CarItem from './CarItem';
import CarModal from './CarModal';
import { styles as styleCarModal } from './stylesCarModal'
import { styles } from './styles';

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

const CarsView: React.FC = () => {
  const [cars, setCars] = useState<Veiculo[]>([]);
  const [updateCar, setUpdateCar] = useState<Veiculo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    fetchCars();
  }, []);

  // Buscar a listagem de carros
  const fetchCars = async () => {
    try {
      const response = await fetch(`http://192.168.0.11:5000/veiculos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      setCars(data); // Certifique-se de que o backend já retorna os nomes correspondentes

      console.log('Veículos buscados com sucesso:', data);
    } catch (error) {
      console.error('Erro ao buscar os veículos:', error);
    }
  };


  const renderCars = () => {
    return cars.map(car => (
      <CarItem
        key={car.id}
        car={car}
        updateCar={() => {
          setUpdateCar(car);
          setModalVisible(true);
        }}
        handleDeleteCar={() => handleDeleteCar(car.id)}
      />
    ));
  };

  const createCar = async (newCarData: Partial<Veiculo>) => {
    try {
      const response = await fetch('http://192.168.0.11:5000/veiculos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCarData), // Enviar os dados do novo carro
      });

      if (response.ok) {
        console.log('Car created successfully.');
        await fetchCars();
        closeAndClearModal(); // Fechar e limpar a modal após criar o carro
      } else {
        console.error('Car creation failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };


  const handleDeleteCar = async (carID: number) => {
    try {
      const response = await fetch(`http://192.168.0.11:5000/veiculos/${carID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await fetchCars(); // Atualizar a lista de carros após a exclusão
      } else {
        console.error('Falhou a tentativa de deletar o veículo:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar o veículo:', error);
    }
  };

  const handleEditCar = async (
    carId: number,
    updatedCarData: Partial<Veiculo>
  ) => {
    try {
      const response = await fetch(`http://192.168.0.11:5000/veiculos/${carId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCarData), // Enviar os dados atualizados do veículo
      });

      if (response.ok) {
        await fetchCars(); // Atualizar a lista de carros após a edição
        closeAndClearModal(); // Fechar e limpar a modal de edição após a atualização
      } else {
        console.error('Car update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeAndClearModal = () => {
    setModalVisible(false);
    setUpdateCar(null); // Limpar o ID de edição
  };

  const handleEditCarWrapper = async (updatedCar: Veiculo) => {
    try {
      const response = await fetch(`http://192.168.0.11:5000/veiculos/${updatedCar.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCar), // Enviar os dados atualizados do veículo
      });

      if (response.ok) {
        await fetchCars(); // Atualizar a lista de carros após a edição
        closeAndClearModal(); // Fechar e limpar a modal de edição após a atualização
      } else {
        console.error('Car update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };




  return (
    <View style={styles.container}>
      <View style={styles.newCarButton}>
        <Button title="Cadastrar Novo Carro" onPress={openModal} />
      </View>

      <ScrollView style={styles.scrollRenderCars}>
        <View style={styles.renderCars}>
          {renderCars()}
        </View>
      </ScrollView>

      {/* Modal */}
      {/* <CarModal
        modalVisible={modalVisible}
        handleEditCar={handleEditCarWrapper}
        closeAndClearModal={closeAndClearModal}
        saveCar={
          editingCarsId
            ? () => handleEditCarWrapper(editedCar) // Use o carro que será editado aqui
            : (newCarData?: Partial<Veiculo>) => createCar(newCarData || {}) // Trata o argumento opcional
        }
        createCar={createCar}
        setUpdatingCarID={setUpdatingCarID}
        updatingCar={updatingCar}
        key={updatingCar?.id}
      /> */}
    </View>
  );
};

export default CarsView;
