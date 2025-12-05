from flask import Blueprint, render_template
from app.db.index import index_page, perfil_modelos

home_bp = Blueprint('home', __name__)

HOME_DATA = index_page()
MODELOS_DATA = perfil_modelos()


@home_bp.route('/')
def index():
    return render_template('pages/index.html', home=HOME_DATA, modelos=MODELOS_DATA)