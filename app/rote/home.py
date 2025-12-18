from flask import Blueprint, render_template, request, redirect, url_for, jsonify, current_app
from app.db.index import perfil_modelos
import json
import os

home_bp = Blueprint('home', __name__)

# Carrega os modelos uma vez ao iniciar
MODELOS_DATA = perfil_modelos()

# Rota principal com pesquisa
@home_bp.route('/', methods=['GET'])
def index():
    termo = request.args.get('pesquisa', '').strip().lower()
    
    modelos_filtrados = [m for m in MODELOS_DATA if termo in m.get("nome", "").lower()] if termo else []

    if len(modelos_filtrados) == 1:
        return redirect(url_for("home.perfil_modelo", id=modelos_filtrados[0]["id"]))

    return render_template(
        'pages/index.html',
        titulo="home",
        modelos=modelos_filtrados if termo else MODELOS_DATA,
        pesquisa=termo,
        nenhum_resultado=(termo and len(modelos_filtrados) == 0)
    )

# Perfil do modelo
@home_bp.route("/perfil/<int:id>")
def perfil_modelo(id):
    modelo = next((m for m in MODELOS_DATA if m["id"] == id), None)
    if not modelo:
        return "Modelo não encontrado", 404
    return render_template('pages/perfil.html', titulo="Perfil", modelo=modelo)

# Páginas fixas
@home_bp.route('/modelos')
def page_modelo():
    return render_template('pages/modelos.html', titulo="Modelo", modelos=MODELOS_DATA)

@home_bp.route('/galeria')
def imagens():
    return render_template('pages/galeria.html', titulo="Galeria", modelos=MODELOS_DATA)

@home_bp.route('/contato')
def contatos():
    return render_template('pages/contato.html', titulo="Contato")

@home_bp.route('/servico')
def servicos():
    return render_template('pages/servicos.html', titulo="Serviços")

# Página de mensagens
@home_bp.route('/msg/<int:id>')
def msg(id):
    modelo = next((m for m in MODELOS_DATA if m["id"] == id), None)
    if not modelo:
        return "Modelo não encontrado", 404
    return render_template('pages/msg.html', titulo="Mensagem", modelo=modelo)

# Chatbot - retorna resposta baseada em JSON
@home_bp.route('/chat/<int:id>', methods=['POST'])
def chat_modelo(id):
    data = request.json
    user_message = data.get('message', '').lower()

    # Caminho absoluto para o JSON
    json_path = os.path.join(current_app.root_path, 'static', 'data', 'chatbot.json')
    
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            responses = json.load(f)
    except FileNotFoundError:
        return jsonify({'response': 'Erro: arquivo de respostas não encontrado.'})
    except json.JSONDecodeError:
        return jsonify({'response': 'Erro: arquivo de respostas inválido.'})

    # Resposta padrão
    bot_response = responses.get('default', "Desculpe, não entendi sua mensagem.")

    # Procura palavra-chave simples
    for keyword, response in responses.items():
        if keyword != 'default' and keyword in user_message:
            bot_response = response
            break

    return jsonify({'response': bot_response})
