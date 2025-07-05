import tensorflow as tf
import keras as kr
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical
from fastapi import FastAPI

# Load Dataset

data = pd.read_csv("food_dataset.csv")

# Make String to Int for train model
le = LabelEncoder()
labels_num = le.fit_transform(data['food'])

# Add to food_encoded Column
data['food_encoded'] = labels_num


# Prepare input output
x = data['age'].values
x = x.reshape(-1, 1)

y = data['food_encoded'].values
y = to_categorical(y)

# print(y.shape[1])

model = kr.Sequential([
    kr.layers.Flatten(input_shape=(1,)),
    kr.layers.Dense(10, activation='relu'),
    kr.layers.Dense(40, activation='relu'),
    kr.layers.Dense(100, activation='relu'),
    kr.layers.Dense(y.shape[1], activation='softmax')
])

model.compile('adam', 'categorical_crossentropy', metrics=['accuracy'])

model.fit(
    x,
    y,
    epochs=150
)

model.save('food_model.keras')

