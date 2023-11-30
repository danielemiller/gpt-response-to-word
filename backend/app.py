from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.exceptions import BadRequest
from openai import OpenAI
import os
from docx import Document
from datetime import timedelta
from cache import SimpleCache
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variable
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

if OPENAI_API_KEY is None:
    raise ValueError("No OPENAI_API_KEY found in environment variables")

# Configure OpenAI
client = OpenAI(api_key=OPENAI_API_KEY)

# Initialize cache with a 5-minute timeout
cache = SimpleCache(duration=timedelta(minutes=5))

@app.route('/api/ask', methods=['POST'])
def ask_gpt():
    data = request.json
    prompt = data['query']
    
    # Check if we have a cached response
    cached_response = cache.get(prompt)
    if cached_response:
        return jsonify(cached_response)

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an assistant capable of providing detailed explanations and information."},
            {"role": "user", "content": prompt}
        ]
    )
    
    # Cache the new response
    response_content = response.choices[0].message.content
    cache.set(prompt, response_content)
    print(cache)
    
    return jsonify(response_content)

@app.route('/api/generate-document', methods=['POST'])
def generate_document():
    data = request.json
    prompt = data['query']
    
    # Retrieve the cached response
    cached_response = cache.get(prompt)
    if not cached_response:
        raise BadRequest("No cached response available.")
    
    # Define the subdirectory and file path
    subdir = "output"
    filename = "response.docx"
    doc_path = os.path.join(subdir, filename)

    # Ensure the subdirectory exists
    if not os.path.exists(subdir):
        os.makedirs(subdir)
    
    # Create a Word document from the cached response
    doc = Document()
    doc.add_paragraph(cached_response)
    doc.save(doc_path)
    
    return send_file(doc_path, as_attachment=True)

if __name__ == '__main__':
    app.run(port=5050)