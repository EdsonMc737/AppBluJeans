from flask import Blueprint, render_template
from app.db.index import index_page, perfil_modelos

home_bp = Blueprint('home', __name__)

HOME_DATA = index_page()
MODELOS_DATA = perfil_modelos()


@home_bp.route('/')
def index():
    return render_template('pages/index.html', home=HOME_DATA, modelos=MODELOS_DATA)


@home_bp.route("/perfil/<int:id>")
def perfil_modelo(id):
    # busca modelo específico
    modelo = next((m for m in MODELOS_DATA if m["id"] == id), None)

    if not modelo:
        return "Modelo não encontrado", 404

    # envia somente o modelo
    return render_template('pages/perfil.html', home=HOME_DATA, modelo=modelo)

@home_bp.route('/modelos')
def page_modelo():
    return render_template('pages/modelos.html', home=HOME_DATA, modelos=MODELOS_DATA)

    