#import IPython.display as ipd
import librosa
import librosa.display
import matplotlib.pyplot as plt
import keras

# filename = 'bark.wav'
# plt.figure(figsize=(12,4))
# data,sample_rate = librosa.load(filename)
# _ = librosa.display.waveshow(data,sr=sample_rate)
# ipd.Audio(filename)

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Activation, Flatten
from tensorflow.keras.layers import Convolution2D, MaxPooling2D
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.layers import Dense,Dropout,Activation, Flatten, Conv2D, MaxPooling2D
from keras.utils import np_utils
from sklearn import metrics 
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical
from keras.saving import saving_utils
#from keras.saving import pickle_utils

import numpy as np
from keras.models import Sequential
from keras.layers import LSTM
from keras.layers import Dense, Dropout, Activation, Flatten
from keras.layers import Convolution1D, MaxPooling1D
from tensorflow.keras.optimizers import Adam
from keras.utils import np_utils
from sklearn import metrics 

# import numpy as np
# %matplotlib inline
import matplotlib.image as mpimg
import matplotlib.pyplot as plt
import tensorflow as tf
tf.compat.v1.set_random_seed(2019)

model_name = "local-dog-bark-detection-model"

model = keras.models.load_model('/Users/cheffbcookin/Desktop/Senior Design/Senior_Design/model_flask/modelAPI/model2')

model.build(input_shape=(40,))
model.summary()


import numpy as np

def extract_feature(file_name):
   
    try:
        audio_data, sample_rate = librosa.load(file_name, res_type='kaiser_fast')
        mfccs = librosa.feature.mfcc(y=audio_data, sr=sample_rate, n_mfcc=40)
        mfccsscaled = np.mean(mfccs.T,axis=0)
        
    except Exception as e:
        print("Error encountered while parsing file: ", file)
        return None, None

    return np.array([mfccsscaled])



def print_prediction(file_name):
    prediction_feature = extract_feature(file_name)

    predicted_vector = model.predict(prediction_feature)
    predicted_vector = np.argmax(predicted_vector, axis = 1)
    predicted_class = le.inverse_transform(predicted_vector)
    print("The predicted class is:", predicted_class[0], '\n')
    return predicted_class[0]
    #print("The predicted class is:", predicted_vector[0], '\n')

import pandas as pd

from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical

metadata = pd.read_csv('/Users/cheffbcookin/Desktop/Senior Design/Senior_Design/model_flask/modelAPI/BarkClassification.csv')
features = []
for index, row in metadata.iterrows():

    class_label = row["class"]
    features.append([class_label])
    
featuresdf = pd.DataFrame(features, columns=['class'])

class_list = featuresdf['class']
y = np.array(class_list.tolist())

le = LabelEncoder()
yy = to_categorical(le.fit_transform(y))


filename = '/Users/cheffbcookin/Desktop/Senior Design/Senior_Design/model_flask/modelAPI/bark.wav'

print_prediction(filename)

filename = '/Users/cheffbcookin/Desktop/Senior Design/Senior_Design/model_flask/modelAPI/growl.wav'

print_prediction(filename)

filename = '/Users/cheffbcookin/Desktop/Senior Design/Senior_Design/model_flask/modelAPI/whine.wav'

print_prediction(filename)


#turn it into a flask api
from flask import Flask, request, jsonify

app = Flask(__name__)
import json 
import requests

url = 'http://18.219.228.229:3000/classification'

@app.route('/predict', methods=['POST'])
def predict():
    audio_data = request.files["'data'"]
    print(audio_data)
    print('hello')
    # print(request.get_json())
    # d = request.get_json()
    # print(d['username'])
    #name = request.get_json['username']
    # query_df = pd.DataFrame(json_)
    # query = pd.get_dummies(query_df)
    
    #classifier = joblib.load('classifier.pkl')
    print_prediction(audio_data)
    #content = {'prediction': prediction, 'username': name}
    #req = requests.post(url, json=content)
    #print(prediction)
    
    return "OK!"
    

@app.route('/gps', methods=['POST'])
def gps():
    d = request.get_json()
    longitude = d['Longitude']
    latitude = d['Latitude']
    print("longitude: ", longitude)
    print("latitude: ", latitude)
    
    return "OK!"



if __name__ == '__main__':
     app.run(port=8080)
     
     