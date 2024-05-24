from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
import pickle 

# Create a Flask application instance
app = Flask(__name__)

# Enable CORS for all routes, allowing requests from any origin
CORS(app,resources={r"/*":{"origins":"*"}})

model = pickle.load(open('trained_model.pkl', 'rb'))

data = {
    'work_location_Atlanta, GA': [0],
    'work_location_Austin, TX': [0],
    'work_location_Bronx, NY': [0],
    'work_location_Brooklyn, NY': [0],
    'work_location_Chicago, IL': [0],
    'work_location_Hartford, CT': [0],
    'work_location_Los Angeles, CA': [0],
    'work_location_Manhattan, NY': [0],
    'work_location_New Haven, CT': [0],
    'work_location_Newington, CT': [0],
    'work_location_Norwalk, CT': [0],
    'work_location_Queens, NY': [0],
    'work_location_South Windsor, CT': [0],
    'work_location_St Paul, MN': [0],
    'work_location_West Hartford, CT': [0],
    'job_role_Employee': [0],
    'job_role_HR': [0],
    'job_role_Manager': [0]
}

# Create DataFrame
datadf = pd.DataFrame(data)

# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)
  
# Define a route for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        query_df = pd.DataFrame([data])

        model_df = pd.DataFrame([[]])
        #job role
        model_df[query_df.iloc[0,0]] = 1
        # work location
        model_df[query_df.iloc[0,1]] = 1
        datadf.update(model_df)
        print(datadf)

        prediction = model.predict(datadf)

        model_df[query_df.iloc[0,0]] = 0
        # work location
        model_df[query_df.iloc[0,1]] = 0
        datadf.update(model_df)
        return jsonify({'Prediction': list(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)