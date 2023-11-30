from dotenv import load_dotenv
from docx import Document
import os
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variable
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

if OPENAI_API_KEY is None:
    raise ValueError("No OPENAI_API_KEY found in environment variables")

client = OpenAI(api_key=OPENAI_API_KEY)

completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
        {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
    ]
)

# Function to save content to a Word document
def save_chat_to_word(content, subdir="output", filename="chat_output.docx"):
    # Ensure the subdirectory exists
    if not os.path.exists(subdir):
        os.makedirs(subdir)
    
    # Create a new Document
    doc = Document()
    doc.add_paragraph(content)
    
    # Save the document in the specified subdirectory with the given filename
    file_path = os.path.join(subdir, filename)
    doc.save(file_path)
    print(f"Chat saved to Word document at: {file_path}")

# Extracting the message content from the response
message_content = completion.choices[0].message.content

if isinstance(message_content, str):
    save_chat_to_word(message_content)
else:
    print("Error: message content is not a string")

# Save the message to a Word document
save_chat_to_word(message_content)
