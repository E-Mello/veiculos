import { Button, Modal, ScrollView, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import CarItem from './CarItem';
import CarModal from './CarModal';
import RegisterCar from '../../components/CarsComponents/RegisterCar';
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
  const [editingCarID, setEditingCarID] = useState<number | null>(null);
  const [updateCar, setUpdateCar] = useState<Veiculo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');


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

      if (!response.ok) {
        throw new Error(`Erro ao buscar os veículos: ${response.statusText}`);
      }

      const data = await response.json();
      setCars(data);
      setErrorMessage(''); // Limpa a mensagem de erro caso a busca tenha sido bem-sucedida
      console.log('Veículos buscados com sucesso:', data);
    } catch (error: any) {
      console.error('Erro ao buscar os veículos:', error.message);
      setErrorMessage('Erro ao buscar os veículos. Por favor, tente novamente.'); // Define a mensagem de erro para exibir na interface
    }
  };

  const renderCars = () => {
    return cars.map(car => (
      <CarItem
        key={car.id}
        car={car}
        updateCar={() => {
          setUpdateCar(car);
        }}
        handleDeleteCar={() => handleDeleteCar(car.id)}
      />
    ));
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
        // closeAndClearModal(); // Fechar e limpar a modal de edição após a atualização
      } else {
        console.error('Car update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating car:', error);
    }
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
        // closeAndClearModal(); // Fechar e limpar a modal de edição após a atualização
      } else {
        console.error('Car update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };




  return (
    <View style={styles.container}>
      {/* RegisterCar Component */}
      <RegisterCar />

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <ScrollView style={styles.scrollRenderCars}>
          <View style={styles.renderCars}>
            {renderCars()}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CarsView;
