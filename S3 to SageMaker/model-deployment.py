#!/usr/bin/env python
# coding: utf-8

# ## XGBoost Model deployment in Amazon Sagemaker. 
# 
# #### This notebook should be run in an Amazon Sagemaker notebook instance. 
# 
# 
# #### Before running this notebook, 
# you should have uploaded the pre-trained model and test_point.csv from your laptop to the 
# same folder where you have this notebook file. test_point.csv contains few sample test data in csv format.
# 
# 
# This loads the pre-trained XGBoost model and saves in a S3 bucket in .tar.gz format as required by Sagemaker.
# Then it creates a sagemaker model from the model file stored in S3. 
# Then configures and creates an Endpoint to deploy the model and also tests invoking the endpoint to get prediction.
# 
# #### Please remember not to run the last "Delete the Endpoint" cell if you want to test the deployed model from a client. 
# 
# 
# After the exercise is over, 
# ##### you should cleanup the Sagemaker resources as described in 
# https://docs.aws.amazon.com/sagemaker/latest/dg/ex1-cleanup.html to avoid charges incurred because of resources left behind.
# 
# 
# 

# ### Import libraries

# In[1]:


#%%time ##dont run

import os
import boto3
import sagemaker

from sagemaker import get_execution_role

region = boto3.Session().region_name

role = get_execution_role()


# ### Getting S3 files to SageMaker -JLam

# In[2]:


bucket = 'dogsoundsbucket8080'
subfolder = ''


# In[3]:


from sagemaker import get_execution_role
role = get_execution_role()


# In[4]:


conn = boto3.client('s3')
contents = conn.list_objects(Bucket=bucket, Prefix=subfolder)['Contents']
for f in contents:
    print(f['Key'])


# In[ ]:


s3 = boto3.resource('s3')
for key in bucket.objects.all():
  print key.key


# In[ ]:


import pickle

my_bucket = 'dogsoundsbucket8080'
my_file = 's3://dogsoundsbucket8080/bark.wav'
s3client = boto3.client('s3')
response = s3client.get_object(Bucket=my_bucket, Key=my_file)
body = response['Body']

datalam = pickle.loads(body.read())


# ### Set up audio sampling environment

# In[ ]:


pip install --upgrade pip


# In[ ]:


pip install -r requirements.txt


# In[ ]:


conda install -n tensorflow_p36 -c conda-forge -y librosa


# In[ ]:


import IPython.display as ipd
import librosa
import librosa.display
import matplotlib.pyplot as plt

filename = 'bark.wav'
plt.figure(figsize=(12,4))
data,sample_rate = librosa.load(filename)
_ = librosa.display.waveplot(data,sr=sample_rate)
ipd.Audio(filename)


# In[ ]:


pip install pandas


# In[ ]:


pip install keras


# In[ ]:


pip install tensorflow


# In[ ]:


##    import pickle 


# In[ ]:


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


# In[ ]:


model_name = "local-dog-bark-detection-model"


# In[ ]:


##     import joblib


# In[ ]:


import keras


# In[ ]:


model = keras.models.load_model('model')


# In[ ]:


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
    #print("The predicted class is:", predicted_vector[0], '\n')


# In[ ]:


import pandas as pd #read csv file


# In[ ]:


from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical

metadata = pd.read_csv('UrbanSound8K.csv')
features = []
for index, row in metadata.iterrows():

    class_label = row["class"]
    features.append([class_label])
    
featuresdf = pd.DataFrame(features, columns=['class'])

class_list = featuresdf['class']
y = np.array(class_list.tolist())

le = LabelEncoder()
yy = to_categorical(le.fit_transform(y))


# In[ ]:


filename = 'bark.wav'

print_prediction(filename)

filename = 'drill.wav' #i guess i'm not as good as the model at identifying noices 

print_prediction(filename)

filename = 'gun_shot.wav'

print_prediction(filename)


# In[ ]:


filename = datalam

print_prediction(filename)


# ### Create S3 bucket

# In[ ]:


# This creates a default S3 bucket where we will upload our model.
bucket = sagemaker.Session().default_bucket()


# In[ ]:


bucket_path = "https://s3-{}.amazonaws.com/{}".format(region, bucket)


# In[ ]:


print(role)
print(region)
print(bucket)
print(bucket_path)


# #### Install xgboost as it is needed for loading the model from joblib dump file and test it before deployment.
# #### Please note that the XGBoost version should be same as the version with which the model was trained locally in laptop.

# In[ ]:


get_ipython().system('conda install -y -c conda-forge xgboost==0.90')


# In[ ]:


model_file_name = "DEMO-local-xgboost-model"


# ### Load the pre-trained model and test it before deployment

# In[ ]:


import joblib
import xgboost

mymodel = joblib.load(model_file_name)


# In[ ]:


#import json
import numpy as np


file_name = (
    "test_point.csv"  # customize to your test file, will be 'mnist.single.test' if use data above
)

with open(file_name, "r") as f:
    mypayload = np.loadtxt(f, delimiter=",")
    
print(mypayload)    


# In[ ]:


mymodel.predict(mypayload)


# #### Create a tar.gz model file as this is the format required by Sagemaker for deployment.

# In[ ]:


#### This step Booster.save_model was needed before creating a tar.gz . Otherwise I faced issues with prediction on deployment.

mymodel._Booster.save_model(model_file_name)


# In[ ]:


get_ipython().system('tar czvf model.tar.gz $model_file_name')


# ### Upload the pre-trained model to S3

# In[ ]:


#### prefix in S3
prefix = "sagemaker/DEMO-xgboost-byo"

fObj = open("model.tar.gz", "rb")
key = os.path.join(prefix, model_file_name, "model.tar.gz")
print(key)
boto3.Session().resource("s3").Bucket(bucket).Object(key).upload_fileobj(fObj)


# In[ ]:





# ### Set up hosting for the model¶
# #### Import model into hosting
# This involves creating a SageMaker model from the model file previously uploaded to S3.

# #### Create a Sagemaker model 

# In[ ]:


from sagemaker.amazon.amazon_estimator import get_image_uri

#### Get the built-in xgboost container image in Sagemaker to host our model
container = get_image_uri(boto3.Session().region_name, "xgboost", "0.90-1")


# In[ ]:


get_ipython().run_cell_magic('time', '', 'from time import gmtime, strftime\n\nmodel_name = model_file_name + strftime("%Y-%m-%d-%H-%M-%S", gmtime())\n\nmodel_url = "https://s3-{}.amazonaws.com/{}/{}".format(region, bucket, key)\n\nsm_client = boto3.client("sagemaker")\n\nprint(model_url)\n\nprimary_container = {\n    "Image": container,\n    "ModelDataUrl": model_url,\n}\n\ncreate_model_response2 = sm_client.create_model(\n    ModelName=model_name, ExecutionRoleArn=role, PrimaryContainer=primary_container\n)\n\nprint(create_model_response2["ModelArn"])')


# ### Create endpoint configuration
# 
# Create an endpoint configuration, that describes the distribution of traffic across the models, whether split, shadowed, or sampled in some way. In addition, the endpoint configuration describes the instance type required for model deployment.

# In[ ]:


from time import gmtime, strftime

endpoint_config_name = "DEMO-XGBoostEndpointConfig-" + strftime("%Y-%m-%d-%H-%M-%S", gmtime())

print(endpoint_config_name)

create_endpoint_config_response = sm_client.create_endpoint_config(
    EndpointConfigName=endpoint_config_name,
    ProductionVariants=[
        {
            "InstanceType": "ml.m4.xlarge",
            "InitialInstanceCount": 1,
            "InitialVariantWeight": 1,
            "ModelName": model_name,
            "VariantName": "AllTraffic",
        }
    ],
)

print("Endpoint Config Arn: " + create_endpoint_config_response["EndpointConfigArn"])


# ### Create endpoint
# Lastly, you create the endpoint that serves up the model, through specifying the name and configuration defined above. The end result is an endpoint that can be validated and incorporated into production applications. This takes 9-11 minutes to complete.

# In[ ]:


get_ipython().run_cell_magic('time', '', 'import time\n\nendpoint_name = "DEMO-XGBoostEndpoint-" + strftime("%Y-%m-%d-%H-%M-%S", gmtime())\nprint(endpoint_name)\ncreate_endpoint_response = sm_client.create_endpoint(\n    EndpointName=endpoint_name, EndpointConfigName=endpoint_config_name\n)\nprint(create_endpoint_response["EndpointArn"])\n\nresp = sm_client.describe_endpoint(EndpointName=endpoint_name)\nstatus = resp["EndpointStatus"]\nprint("Status: " + status)\n\nwhile status == "Creating":\n    time.sleep(60)\n    resp = sm_client.describe_endpoint(EndpointName=endpoint_name)\n    status = resp["EndpointStatus"]\n    print("Status: " + status)\n\nprint("Arn: " + resp["EndpointArn"])\nprint("Status: " + status)')


# ### Validate the model for use
# Now you can obtain the endpoint from the client library using the result from previous operations and generate classifications from the model using that endpoint.

# In[ ]:


runtime_client = boto3.client("runtime.sagemaker")


# Lets generate the prediction. We'll pick csv data from the test data file

# In[ ]:


get_ipython().run_cell_magic('time', '', 'import json\n\n\nfile_name = (\n    "test_point.csv"  # customize to your test file, will be \'mnist.single.test\' if use data above\n)\n\nwith open(file_name, "r") as f:\n    payload = f.read().strip()\n    \n    \nprint("Payload :\\n")\n\nprint(payload)\nprint()\n\nresponse = runtime_client.invoke_endpoint(\n    EndpointName=endpoint_name, ContentType="text/csv", Body=payload\n)\n\n##print(response)\n\nprint("Results :\\n")\nprint()\n\nresult = response["Body"].read().decode("ascii")\n\n# Unpack response\nprint("\\nPredicted Class Probabilities: {}.".format(result))')


# In[ ]:





# ### (Optional) Delete the Endpoint
# 
# If you're ready to be done with this notebook, please run the delete_endpoint line in the cell below.  This will remove the hosted endpoint you created and avoid any charges from a stray instance being left on.

# In[ ]:


sm_client.delete_endpoint(EndpointName=endpoint_name)


# In[ ]:




