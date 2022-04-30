# Draft of Engineering.md
****

Authors: Nafis Abeer, Justin Lam, Chase Maivald, Daniel Shimon, Rajiv Ramroop

## Executive Summary

Woof is an ideal cross-platform social media application for dog owners. Rather than relying on individual owners to actively maintain dog friends, we propose a React Native maps interface to display locations of “friends” added by the user. To cater the application for dogs’ preferences, we require owners to purchase a dog-tag (dog-fleece due to size constraints) fitted with a GPS tracker, accelerometer, and a microphone. We are implementing a recommender system based on the owner’s dog’s interactions with other dogs wearing the tag. This recommender system will leverage the dog-tag’s proximity to other tags to start collecting audio. The collected data would be processed in the cloud before being sent back to the user as a friend suggestion, if the interaction is classified as friendly. Woof is expected to deliver accurate suggestions for “friends” whenever the dog has a positive interaction with another dog. Users will be provided a profile page, instant messaging, “friends” page, interaction-history page along with a Dogmaps screen.

## Current State of Project

Our project met the requirements that we set out to achieve. The User Interface code runs smoothly, with the CSS styling and other creative touches such as button animation and downloaded custom text completed. The User Interface utilizes a fully completed authentication system using AWS Amplify. It verifies emails using verification codes and registers new users into AWS Amplify as well as our SQL database. Our Hardware Sensors can run consistently, and the data is successfully sent to our Machine Learning Model, which classifies between howls, growls, bark, and whines with 82%+ accuracy. This classification is crucial for our recommended friend’s feature. After the recommendations go through our SQL database, the mobile User Interface will recommend other dogs that had a positive interaction with your dog. Below, we highlighted some of the challenges and obstacles we faced in this project so you don’t have to.

## Technical Challenges we Faced

---------------------------------------------------------------------------------------------------------------------------------------------------
## Hardware

### Audio Recording / Passing Values

There were many challenges that we faced in regards to each of the necessary modules. Primarily, with recording audio, it took months to find an optimal solution, which was using the I2S protocol with the IMNP441 microphone. Prior to this, I spent many hours trying to configure several analog microphones. This was a serious setback, because converting analog to digital signals and then finding a way to put this into a .wav file proved rather difficult. With the ESP32, we were limited in our ability to process analog signals. The best we could come up with was getting a graph of different voltage signals that were supposedly indicative of sound waves. However, this told us nothing about the interaction between two dogs, as voltage spikes on a graph aren’t exactly the best measuring tool. 

One of the main challenges in regards to processing our audio data was sending it out from the ESP32. This proved difficult at first due to our approach of uploading the sound file to the SPIFFS ESP32 file system, and then creating another server hosted by the ESP32 to download the contents of the file, and play it back. Our initial approach was to send the file directly from the generated server to a Flask API that contained the Machine Learning model, however, this failed. This is because the generated server could not send its data to another server. Thus, we eventually found a solution, which was to utilize the ESP’s FreeRTOS feature to simultaneously connect the ESP32 to the internet and send the .wav file after recording. This solution not only took quite a while to implement, but it also took a while to gravitate away from sending the data from the ESP’s generated server. Due to the fact that we had a working solution in downloading the file, this was the approach we worked with for some time.  

---------------------------------------------------------------------------------------------------------------------------------------------------

## Software

### API ML Model
The biggest challange for the ML model was deciding what kind of data we want for our recommender system. We had considered using proximity and duration of close proximity as a metric, but training such a model would require us to have actual dogs present with accelerometers. We ended up choosing an audio based model which came with its own issues. We had to find a way to filter the dog_sounds and our initial method of doing so involved a seperate model to classify urban sounds. Unfortunately that model misclassified much of our required dog_sounds as other noises, and was unusable. Our mitigation for this issue was to only record audio when we can ensure that BLE signals came from other dogs nearby, as we could ensure that any recorded noise likely stemmed from dogs. Our last issue was improving the accuracy of such model as we spent a significant amount of time collecting more and more audio in order to meet the 80% requirement. We also had to heavily the tweak the layers of the model in order to meet our desired accuracy. 

### Integration
Integration of all of the different components we were working on was an issue we kept facing throughout the duration of our project. Our new projects seemed to reject these new modules and didn't work well with different dependencies throughout the building process. We figured out the reason why this occurred midway through the year and were able to seamlessly integrate our changing components from this point on.

### Passing Username Variables from Authentication to UI

A big challenge we faced was passing data through the Authentication / Sign in component of the application to the rest of the Social Media Application. This is because using an outside authenticator means that the flow of information through through JS files is different. Instead of passing parameters through the navigation for example, we had to access the Amplify Authentication user info to access user information. 

### Working with Asynchronous Functions for Maps
Maps was originally configured to work as a node seperate node file to the React Native Application. Once all of the functions used for the Prototype Map component were brought in to the Main Application, there were multiple issues when trying to fetch data from the database and run functions based on the result of these functions. This is because fetch works asynchronously and the functions being used in between fetch calls were synchronous. We ended up finding a workaround by calling these synchronous functions within the asynchronous functions. 

### Scaledrone Limitations
Due to only having limited space and usage of Scaledrone, this limited the amount we were able to work and develop using Scaledrone, without having to create new instances, new channels, and reconfiguring the servers as well as the front-end to work with these new instances. This only starting occurring once we ramped up testing of the Maps component with many friends.

### GPS Location
One of the main issues we faced and struggled to solve for the duration of the project was how to retrieve the Dog's location in real time. This meant we would need cellular connection in order to send our GPS Data out of the ESP-32 Microncontroller. We were not able to come up with a solution using cellular, however a very solid solution we came up with was to use a Tile Tracker. This Tile Tracker is based on BLE where it can pinpoint users' locations based on detection of other BLE devices in the area. Because our server will always be up to receive location changes, we were able to utilize Python Libraries to retreive the coordinates of the Tracker.

### Connecting to MySQL 
MySQL via a command line or through a cloud server both allowed for querying the previously generated MySQL tables. It was difficult to make sure that SQL could read in variables send from the front end, but learning the '"+req.body["variable"]+"' allowed for passing in the inputs from the front end in the form fields. Hosting MySQL on EC2 allowed for an indirect connection in which the credentials are masked and not exposed directly, so the variables may be passed with the aformentioned req.body format.


