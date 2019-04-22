## This code takes the JSON data while POST request an performs the prediction using loaded model and returns
## the results in JSON format.
# Import libraries
import numpy as np
from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the model
model = pickle.load(open('model.pkl','rb'))

@app.route('/api',methods=['POST'])
def predict():
    # Get the data from the POST request.
    data = request.get_json(force=True)
    xyz=[]
    xyz.append(int (float(data['x']) * 100))
    xyz.append(int (float(data['y']) * 100))
    xyz.append(int (float(data['z']) * 100))
    # Make prediction using model loaded from disk as per the data.
    prediction = model.predict([xyz])

    # Take the first value of prediction
    #output = prediction[0]
    return jsonify(float(prediction[0]))

if __name__ == '__main__':
    app.run(port=5000, debug=True)
