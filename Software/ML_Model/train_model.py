import librosa
import numpy as np

def extract_features(file_name):
   
    try:
        audio, sample_rate = librosa.load(file_name, res_type='kaiser_fast') 
        mfccs = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40)
        mfccsscaled = np.mean(mfccs.T,axis=0)
        
    except Exception as e:
        print("Error encountered while parsing file: ", file_name)
        return None 
     
    return mfccsscaled

import pandas as pd
import os
import librosa

# Set the path to the full (Collected Audio) dataset 
fulldatasetpath = './audio/'
metadata = pd.read_csv('./metadata/BarkClassification.csv')

features = []

# Iterate through each sound file and extract the features 
for index, row in metadata.iterrows():
    
    file_name = os.path.join(
        os.path.abspath(fulldatasetpath),
        'fold' + str(row["fold"]) + '/',
        str(row["slice_file_name"])
    )
    
    class_label = row["class"]
    data = extract_features(file_name)
    
    features.append([data, class_label])

# Convert into a Panda dataframe 
featuresdf = pd.DataFrame(features, columns=['feature','class'])

print('Finished feature extraction from ', len(featuresdf), ' files')

print(featuresdf)

from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical

# Convert features and corresponding classification labels into numpy arrays
X = np.array(featuresdf.feature.tolist())
class_list = featuresdf['class']
y = np.array(class_list.tolist())

# Encode the classification labels
le = LabelEncoder()
yy = to_categorical(le.fit_transform(y))

# split the dataset 
from sklearn.model_selection import train_test_split 
import tensorflow as tf

x_train, x_test, y_train, y_test = train_test_split(X, yy, test_size=0.2, random_state = 42)


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

num_labels = yy.shape[1]
filter_size = 2

#Construct model 
model = Sequential()

model.add(Dense(16, input_shape=(40,)))
model.add(Activation('relu'))

model.add(Dense(32))
model.add(Activation('relu'))

model.add(Dense(64))
model.add(Activation('relu'))

model.add(Dense(128))
model.add(Activation('relu'))

model.add(Flatten())

model.add(Dense(550))
model.add(Dropout(0.1,seed = 2019))

model.add(Dense(400))
model.add(Dropout(0.3,seed = 2019))

model.add(Dense(300))
model.add(Dropout(0.4,seed = 2019))

model.add(Dense(200))
model.add(Activation('relu'))
model.add(Dropout(0.2,seed = 2019))

model.add(Dense(num_labels))
model.add(Activation('softmax'))

# model = tf.keras.models.Sequential([
#     tf.keras.layers.Conv1D(16,(1),activation = "relu" , input_shape = (40,1)) ,
#     tf.keras.layers.MaxPooling1D(2),
#     tf.keras.layers.Conv1D(32,(3),activation = "relu") ,  
#     tf.keras.layers.AveragePooling1D(2),
#     tf.keras.layers.Conv1D(64,(2),activation = "relu") ,  
#     tf.keras.layers.MaxPooling1D(2),
#     tf.keras.layers.Conv1D(128,(1),activation = "relu"),  
#     tf.keras.layers.MaxPooling1D(2),
#     tf.keras.layers.Flatten(), 
#     tf.keras.layers.Dense(550,activation="relu"),      #Adding the Hidden layer
#     tf.keras.layers.Dropout(0.1,seed = 2019),
#     tf.keras.layers.Dense(400,activation ="relu"),
# #     tf.keras.layers.Dropout(0.3,seed = 2019),
# #     tf.keras.layers.Dense(300,activation="relu"),
# #     tf.keras.layers.Dropout(0.4,seed = 2019),
# #     tf.keras.layers.Dense(200,activation ="relu"),
# #     tf.keras.layers.Dropout(0.2,seed = 2019),
#     tf.keras.layers.Dense(4,activation = "softmax")   #Adding the Output Layer
# ])


model.compile(loss='categorical_crossentropy', metrics=['accuracy'], optimizer='adam')

# Display model architecture summary 
model.build(input_shape=(40,))
model.summary()

# Calculate pre-training accuracy 
score = model.evaluate(x_test, y_test, verbose=0)
accuracy = 100*score[1]

print("Pre-training accuracy: %.4f%%" % accuracy)


from keras.callbacks import ModelCheckpoint
from datetime import datetime

num_epochs = 550
num_batch_size = 32

checkpointer = ModelCheckpoint(filepath='model/weights.hdf5',
                               verbose=1, save_best_only=True)
start = datetime.now()

model.fit(x_train, y_train, batch_size=num_batch_size, epochs=num_epochs, 
          validation_data=(x_test, y_test), callbacks=[checkpointer], verbose=1)

duration = datetime.now() - start
print("Training completed in time: ", duration)

# Evaluating the model on the training and testing set
score = model.evaluate(x_train, y_train, verbose=0)
print("Training Accuracy: ", score[1])

score = model.evaluate(x_test, y_test, verbose=0)
print("Testing Accuracy: ", score[1])


model.save('model/model2')

import librosa
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

filename = "growl.wav"
print_prediction(filename)