from flask import Blueprint, render_template, request, redirect, url_for
from app.db.index import perfil_modelos

home_bp = Blueprint('home', __name__)

# Carrega os modelos uma vez ao iniciar
MODELOS_DATA = perfil_modelos()

# Rota principal com pesquisa
@home_bp.route('/', methods=['GET'])
def index():
    termo = request.args.get('pesquisa', '').strip().lower()
    
    # Filtra modelos pelo nome, se houver termo
    modelos_filtrados = [m for m in MODELOS_DATA if termo in m.get("nome", "").lower()] if termo else []

    # Se houver apenas 1 resultado → redireciona para o perfil
    if len(modelos_filtrados) == 1:
        return redirect(url_for("home.perfil_modelo", id=modelos_filtrados[0]["id"]))

    # Se houver mais de 1 ou nenhum → renderiza lista
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

    # Renderiza perfil com galerias de ensaios
    return render_template('pages/perfil.html', titulo="Perfil", modelo=modelo)

# Página de modelos completa
@home_bp.route('/modelos')
def page_modelo():
    return render_template('pages/modelos.html', titulo="Modelo", modelos=MODELOS_DATA)

# Página de galeria
@home_bp.route('/galeria')
def imagens():
    return render_template('pages/galeria.html', titulo="Galeria", modelos=MODELOS_DATA)

# Página de galeria
@home_bp.route('/contato')
def contatos():
    return render_template('pages/contato.html', titulo="Contato")
