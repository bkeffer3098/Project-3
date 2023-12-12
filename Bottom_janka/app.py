
import json, os, re
import pandas as pd
import numpy as np 
from flask import Flask, render_template, jsonify


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/merged_data/')
def merged_data():   
    file_path = os.path.join(app.static_folder, 'merged_data.json')
    with open(file_path,'r') as f:
        data=f.read()
        return jsonify(data) 

@app.route('/final_data/')
def get_final_data():  
    file_path = os.path.join(app.static_folder, 'final_data.json')
    with open(file_path,'r') as f:
        data=f.read()
        return jsonify(data) 

if __name__ == "__main__":
    app.run(debug=True)


