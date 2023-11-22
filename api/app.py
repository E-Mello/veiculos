from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import uuid
import os
from dotenv import load_dotenv

# funcao para carregar as variaveis ambientes
load_dotenv()

host = os.getenv('DATABASE_HOST')
user = os.getenv('DATABASE_USERNAME')
password = os.getenv('DATABASE_PASSWORD')
database = os.getenv('DATABASE')

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}},
     methods=["GET", "POST", "PUT", "DELETE"])

db_config = {
    'host': host,
    'user': user,
    'password': password,
    'database': database,
}

mysql = mysql.connector.connect(**db_config)

# Listar todos os veículos


@app.route('/veiculos', methods=['GET'])
def get_veiculos():
    try:
        cursor = mysql.cursor(dictionary=True)
        cursor.execute('''
            SELECT v.id, m.nome AS modelo, f.nome AS fabricante, t.tipo_moto AS tipo_motor, 
                   v.ano_modelo, v.ano_fabricacao, v.cor, v.qtd_portas, v.placa
            FROM veiculo v
            JOIN modelo m ON v.id_modelo = m.id
            JOIN fabricante f ON v.id_fabricante = f.id
            JOIN tipo_motor t ON v.id_tipo_motor = t.id
        ''')
        veiculos = cursor.fetchall()
        return jsonify(veiculos)
    except Exception as e:
        return jsonify({'error': 'Erro ao recuperar veículos', 'details': str(e)}), 500
    finally:
        if 'cursor' in locals() and cursor is not None:
            cursor.close()


# Listar todos os tipo dos motores
@app.route('/tipo_motor', methods=['GET'])
def get_tipo_motor():
    cursor = None  # Inicializa o cursor como None
    try:
        cursor = mysql.cursor(dictionary=True)
        cursor.execute('''
            SELECT *
            FROM tipo_motor
        ''')
        tipo_motor = cursor.fetchall()
        return jsonify(tipo_motor)
    except Exception as e:
        return jsonify({'error': 'Erro ao recuperar tipos de motores', 'details': str(e)}), 500
    finally:
        if cursor is not None:  # Verifica se o cursor foi inicializado antes de tentar fechá-lo
            cursor.close()


# Listar todos os modelos


@app.route('/modelo', methods=['GET'])
def get_modelo():
    cursor = None
    try:
        cursor = mysql.cursor(dictionary=True)
        cursor.execute('''
            SELECT *
            FROM modelo
        ''')
        modelo = cursor.fetchall()
        return jsonify(modelo)
    except Exception as e:
        return jsonify({'error': 'Erro ao recuperar modelos', 'details': str(e)}), 500
    finally:
        if cursor is not None:
            cursor.close()


# Listar todos os fabricantes


@app.route('/fabricante', methods=['GET'])
def get_fabricante():
    cursor = None
    try:
        cursor = mysql.cursor(dictionary=True)
        cursor.execute('''
            SELECT *
            FROM fabricante
        ''')
        fabricante = cursor.fetchall()
        return jsonify(fabricante)
    except Exception as e:
        return jsonify({'error': 'Erro ao recuperar fabricantes', 'details': str(e)}), 500
    finally:
        if cursor is not None:  # Verifica se o cursor foi inicializado antes de tentar fechá-lo
            cursor.close()


# Cadastrar veículo


@app.route('/veiculos', methods=['POST'])
def criar_veiculo():
    try:
        data = request.json
        id_modelo = data['id_modelo']
        id_fabricante = data['id_fabricante']
        ano_modelo = data['ano_modelo']
        ano_fabricacao = data['ano_fabricacao']
        cor = data['cor']
        qtd_portas = data['qtd_portas']
        placa = data.get('placa', '')  # Pode ser nulo
        tipo_motor = data['tipo_motor']

        cursor = mysql.cursor()

        # Inserir os dados na tabela 'veiculo' sem o campo ID
        cursor.execute(
            'INSERT INTO veiculo (id_modelo, id_fabricante, ano_modelo, ano_fabricacao, cor, qtd_portas, placa, tipo_motor) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            (id_modelo, id_fabricante, ano_modelo,
             ano_fabricacao, cor, qtd_portas, placa, tipo_motor)
        )

        mysql.commit()
        cursor.close()

        return jsonify({'message': 'Veículo criado com sucesso'})

    except Exception as e:
        return jsonify({'error': 'Falha ao criar veículo', 'details': str(e)}), 500


# Atualizar veículo por ID
@app.route('/veiculos/<string:veiculo_id>', methods=['PUT'])
def update_veiculo(veiculo_id):
    try:
        data = request.json
        id_modelo = data['id_modelo']
        id_fabricante = data['id_fabricante']
        ano_modelo = data['ano_modelo']
        ano_fabricacao = data['ano_fabricacao']
        cor = data['cor']
        qtd_portas = data['qtd_portas']
        placa = data.get('placa', '')  # Pode ser nulo
        tipo_motor = data['tipo_motor']

        cursor = mysql.cursor()

        # Atualizar os dados do veículo
        cursor.execute(
            'UPDATE veiculo SET id_modelo = %s, id_fabricante = %s, ano_modelo = %s, ano_fabricacao = %s, cor = %s, qtd_portas = %s, placa = %s, tipo_motor = %s WHERE id = %s',
            (id_modelo, id_fabricante, ano_modelo, ano_fabricacao,
             cor, qtd_portas, placa, tipo_motor, veiculo_id)
        )

        mysql.commit()
        cursor.close()

        return jsonify({'message': 'Veículo atualizado com sucesso'})
    except Exception as e:
        return jsonify({'error': 'Falha ao atualizar veículo', 'details': str(e)}), 500

# Deletar veículo por ID


@app.route('/veiculos/<string:veiculo_id>', methods=['DELETE'])
def delete_veiculo(veiculo_id):
    try:
        cursor = mysql.cursor()
        cursor.execute('DELETE FROM veiculo WHERE id = %s', (veiculo_id,))
        mysql.commit()
        cursor.close()

        return jsonify({'message': 'Veículo deletado com sucesso'})
    except Exception as e:
        return jsonify({'error': 'Falha ao deletar veículo', 'details': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
