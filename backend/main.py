import keras as kr
import numpy as np
from sklearn.preprocessing import LabelEncoder
from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*']
)

@app.get("/")
def test():
    return {"msg": "Hello World"}


@app.get("/api/suggest/{age}")
async def suggest(age: int):
    model = kr.models.load_model('food_model.keras')
    le = LabelEncoder()
    data = pd.read_csv("food_dataset.csv")
    le.fit_transform(data['food'])

    print(age)

    age_np = np.array([[age]])

    pred = model.predict(age_np)

    pred_class = np.argmax(pred, axis=1)

    convert_back = le.inverse_transform(pred_class)

    print(convert_back)

    return {"menu": convert_back[0]}

    # print("Your age is ", age, "predict menu you should to eat", convert_back)