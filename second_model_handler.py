import tensorflow as tf
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity

file_path = "./datasets/destinations_db.csv"
data = pd.read_csv(file_path)

MODEL_URL_2 = "./models/cb_recommendation_model.h5"

model_2 = tf.keras.models.load_model(
    MODEL_URL_2, custom_objects={"mse": tf.keras.losses.MeanSquaredError()}
)


def get_similar_places(id, top_n=5):
    category = data["category"].tolist()
    states = data["state"].tolist()
    cities = data["city"].tolist()
    city_tag = data["city_tag"].tolist()
    rating = data["rating"].tolist()
    reviews_count = data["reviews_count"].tolist()

    category_encoder = LabelEncoder()
    state_encoder = LabelEncoder()
    city_encoder = LabelEncoder()
    city_tag_encoder = LabelEncoder()
    rating_encoder = LabelEncoder()
    reviewscount_encoder = LabelEncoder()

    category_ids = category_encoder.fit_transform(category)
    state_ids = state_encoder.fit_transform(states)
    city_ids = city_encoder.fit_transform(cities)
    city_tag_ids = city_tag_encoder.fit_transform(city_tag)
    rating_ids = rating_encoder.fit_transform(rating)
    reviews_count_ids = reviewscount_encoder.fit_transform(reviews_count)

    X_train = [
        np.array(category_ids),
        np.array(state_ids),
        np.array(city_ids),
        np.array(city_tag_ids),
        np.array(rating_ids),
        np.array(reviews_count_ids),
    ]

    embeddings = model_2.predict(X_train)
    similarities = cosine_similarity(embeddings)
    similar_items = np.argsort(similarities[id])[-top_n:][::-1]
    arr = []

    for i in similar_items:
        if data["city_tag"][i] == data["city_tag"][id]:
            arr.append(data["place_name"][i])

    return arr
