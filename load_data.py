import pymongo
import json
import os

# Load data from the JSON file
def load_data_from_json(filepath):
    """Loads data from a JSON file."""
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
        return data
    except FileNotFoundError:
        print(f"Error: File not found at {filepath}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in {filepath}")
        return None

# MongoDB connection and insertion
def insert_data_to_mongodb(data, connection_string, database_name, collection_name):
    """Inserts data into a MongoDB collection."""
    try:
        client = pymongo.MongoClient(connection_string)
        db = client[database_name]
        collection = db[collection_name]
        collection.insert_many(data)
        print("Data inserted successfully!")
    except pymongo.errors.ConnectionFailure as e:
        print(f"Error: Could not connect to MongoDB: {e}")
    except pymongo.errors.PyMongoError as e:
        print(f"Error during insertion: {e}")

# Main execution
if __name__ == "__main__":
    filepath = os.path.join(os.getcwd(), "data.json")  # Replace with your JSON file path
    connection_string = "mongodb://admin:password@localhost:27017/"  # Replace with your MongoDB connection string
    database_name = "resume_database"
    collection_name = "resume_data"

    data = load_data_from_json(filepath)

    if data:
        insert_data_to_mongodb(data, connection_string, database_name, collection_name)