from flask import jsonify, request, Flask
import tensorflow as tf
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity

MODEL_URL_1 = "./models/tourism_recommendation_model.h5"
MODEL_URL_2 = "./models/cb_recommendation_model.h5"

model_1 = tf.keras.models.load_model(MODEL_URL_1)

file_path = "./datasets/destinations_db.csv"
data = pd.read_csv(file_path)

data["combined_features"] = data["category"] + " " + data["description"]

tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(data["combined_features"])

app = Flask(__name__)


def recommend_place(input_place, data, model_1, tfidf):
    idx = data[data["place_name"] == input_place].index[0]
    input_features = tfidf.transform([data.loc[idx, "combined_features"]]).toarray()
    predictions = model_1.predict(input_features)
    recommended_idx = np.argsort(predictions[0])[-6:-1]
    print(data.iloc[recommended_idx]["id"])
    print(data.iloc[recommended_idx])
    recommended_places = data.iloc[recommended_idx][
        ["id", "place_name", "rating", "reviews_count"]
    ]
    return recommended_places


@app.route("/api/destination/recommendation", methods=["POST"])
def recommendByPlaceName():
    user_input = request.get_json()
    place_name = user_input.get("place_name", "")

    if not place_name:
        return jsonify({"error": "Input place_name is required"}), 400

    recommendations = recommend_place(place_name, data, model_1, tfidf)
    recommendation_result = recommendations.to_dict(orient="records")

    response = {
        "status": "success",
        "data": recommendation_result,
    }

    return jsonify(response)


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
        if data["city_tag"][i] == data["city_tag"][0]:
            arr.append(data["place_name"][i])

    return arr


@app.route("/api/destination/recommendation-cb/<int:id>", methods=["GET"])
def recommendByContent(id):
    top_n = 100
    result = get_similar_places(id, top_n)
    for i in result:
        print(i)
    return jsonify(id)


if __name__ == "__main__":
    app.run(port=8080)
