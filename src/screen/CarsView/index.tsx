import { Button, Modal, ScrollView, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import { styles } from './styles';
import { styles as stylesTaskModal } from './stylesTaskModal'

interface Veiculo {
  id: number;
  id_modelo: number;
  id_fabricante: number;
  ano_modelo: number;
  ano_fabricacao: number;
  cor: number;
  qtd_portas: number;
  placa: string;
  tipo_motor: number;

}

const CarsView: React.FC = () => {
  const [cars, setCars] = useState<Veiculo[]>([]);
  const [editingCarsId, seteditingCarsId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCarPlaca, setNewCarPlaca] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');


  useEffect(() => {
    fetchCars();
  }, []);

  setNewCarPlaca

  const fetchCars = async () => {
    try {
      const response = await fetch(`http://192.168.0.84:5000/veiculos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCars(data);
      console.log('Tasks fetched successfully:', data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  const renderTasks = () => {
    return cars.map(car => (
      <TaskItem
        key={car.id}
        car={car}
        editCar={() => {
          seteditingCarsId(car.id);
          setNewCarPlaca(car.title);
          setNewTaskDescription(car.description);
          setModalVisible(true);
        }}
        deleteCar={() => handledeleteCar(car.id)}
      />
    ));
  };

  const createCar = async () => {
    if (newCarPlaca) {
      try {
        const response = await fetch('http://192.168.0.84:5000/veiculos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: newCarPlaca, description: newTaskDescription, completed: false }),
        });

        if (response.ok) {
          console.log('Task created successfully.');
          await fetchCars();
          closeAndClearModal(); // Fechar e limpar a modal após criar a tarefa
        } else {
          console.error('Task creation failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const handledeleteCar = async (taskId: string) => {
    try {
      const response = await fetch(`http://192.168.0.84:5000/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await fetchCars(); // Atualizar a lista de carros após a exclusão
      } else {
        console.error('Task deletion failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditCar = async (newTitle: string, newDescription: string) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === editingCarsId);

      if (taskToUpdate) {
        const updatedTask = {
          ...taskToUpdate,
          title: newTitle,
          description: newDescription,
        };

        const response = await fetch(`http://192.168.0.84:5000/tasks/${editingCarsId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        });

        if (response.ok) {
          const updatedTasks = tasks.map(task =>
            task.id === editingCarsId ? updatedTask : task
          );
          setTasks(updatedTasks);
          closeAndClearModal(); // Fechar e limpar a modal de edição após a atualização
        } else {
          console.error('Task update failed:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error updating task:', error);
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
    seteditingCarsId(null); // Limpar o ID de edição
    setnewCarPlaca(''); // Limpar o título
    setNewTaskDescription(''); // Limpar a descrição
  };

  return (
    <View style={styles.container}>
      <Button
        title={showCompleted ? 'Mostrar tarefas pendentes' : 'Mostrar tarefas concluídas'}
        onPress={() => {
          setShowCompleted(!showCompleted);
        }}
      />


      <View style={styles.newTaskButton}>
        <Button title="Nova Tarefa" onPress={openModal} />
      </View>

      <ScrollView style={styles.scrollRenderTasks}>
        <View style={styles.renderTasks}>
          {renderTasks()}
        </View>
      </ScrollView>

      {/* Modal */}
      <TaskModal
        modalVisible={modalVisible}
        editingCarsId={editingCarsId}
        newCarPlaca={newCarPlaca}
        newTaskDescription={newTaskDescription}
        closeAndClearModal={closeAndClearModal}
        saveTask={editingCarsId ? () => handleEditTask(newCarPlaca, newTaskDescription) : createTask}
        setnewCarPlaca={setnewCarPlaca}
        setNewTaskDescription={setNewTaskDescription}
        seteditingCarsId={seteditingCarsId}
        handleEditTask={handleEditTask}
        createTask={createTask}
      />
    </View>
  );
};

export default CarsView;
