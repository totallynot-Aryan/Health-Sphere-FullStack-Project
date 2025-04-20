import pickle
import pandas as pd

model = pickle.load(open('D:/E-healthcare-Management-System-main/ML/heart-disease-predictor/heart.pkl', 'rb'))


test_input = pd.DataFrame([{
    "age": 60,
    "sex": 1,
    "cp": 3,
    "trestbps": 180,
    "chol": 250,
    "fbs": 1,
    "restecg": 1,
    "thalach": 130,
    "exang": 1,
    "oldpeak": 3.5,
    "slope": 2,
    "ca": 3,
    "thal": 7
}])

print(model.predict(test_input))
