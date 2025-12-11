from flask import Flask 

def create_app():
    app = Flask(__name__)

    from app.rote.home import home_bp
    app.register_blueprint(home_bp)

    print(app.url_map)

    return app