export default {
  "required": [
    "film_id",
    "title",
    "description",
    "release_year",
    "language_id",
    "original_language_id",
    "rental_duration",
    "rental_rate",
    "length",
    "replacement_cost",
    "rating",
    "special_features",
    "last_update"
  ],
  "additionalProperties": false,
  "properties": {
    "title": {
      "type": "string"
    },
    "language_id": {
      "type": "integer"
    },
    "release_year": {
      "type": "integer"
    }
  }
};