# Draft of Engineering.md
****

Authors: Nafis Abeer, Justin Lam, Chase Maivald, Daniel Shimon, Rajiv Ramroop

## Executive Summary

Woof is an ideal cross-platform social media application for dog owners. Rather than relying on individual owners to actively maintain dog friends, we propose a React Native maps interface to display locations of “friends” added by the user. To cater the application for dogs’ preferences, we require owners to purchase a dog-tag (dog-fleece due to size constraints) fitted with a GPS tracker, accelerometer, and a microphone. We are implementing a recommender system based on the owner’s dog’s interactions with other dogs wearing the tag. This recommender system will leverage the dog-tag’s proximity to other tags to start collecting audio. The collected data would be processed in the cloud before being sent back to the user as a friend suggestion, if the interaction is classified as friendly. Woof is expected to deliver accurate suggestions for “friends” whenever the dog has a positive interaction with another dog. Users will be provided a profile page, instant messaging, “friends” page, interaction-history page along with a Dogmaps screen.

## Current State of Project

............................................................................................................................................................................................................................................................................................................................................................
## Technical Challenges we Faced
### Hardware
#### Battery

............................................................................................................................................................................................................................................................................................................................................................

#### Audio Recording / Passing Values

There were many challenges that we faced in regards to each of the necessary modules. Primarily, with recording audio, it took months to find an optimal solution, which was using the I2S protocol with the IMNP441 microphone. Prior to this, I spent many hours trying to configure several analog microphones. This was a serious setback, because converting analog to digital signals and then finding a way to put this into a .wav file proved rather difficult. With the ESP32, we were limited in our ability to process analog signals. The best we could come up with was getting a graph of different voltage signals that were supposedly indicative of sound waves. However, this told us nothing about the interaction between two dogs, as voltage spikes on a graph aren’t exactly the best measuring tool. 
### Software

#### API ML Model

............................................................................................................................................................................................................................................................................................................................................................
#### Passing Username Variables from Authentication to UI

............................................................................................................................................................................................................................................................................................................................................................
#### Passing Values Between Servers

............................................................................................................................................................................................................................................................................................................................................................

