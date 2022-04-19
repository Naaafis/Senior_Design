# Senior_Design
Repository for storing code for our Senior Design Project

In this branch, the following files are of importance:

- model_flask/Intermediate.js: Node server to accept incoming POST request with audio files from ESP32

- model_flask/modelAPI: python FLASK API hosting ML modelAPI

IntermediateJS invokes modelAPI once a new file arrives

- train_model.py is the main file that is used to train our model

- tileAPI.py is used to aquire locations from TILE modules. 
