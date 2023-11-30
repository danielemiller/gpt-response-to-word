# GPT Response to Word

## Project Overview
`gpt-response-to-word` is an application that integrates OpenAI's GPT models with a Python Flask backend and Angular frontend to capture AI-powered chat responses and save them into Microsoft Word documents. It allows for dynamic interaction with the GPT model and streamlined document generation.

## Features
- **Interactive Query Interface**: An Angular-based frontend for inputting queries to the GPT model.
- **Automated Saving**: Backend functionality to automatically save GPT responses to a Word document.
- **Customizable Output**: Users can specify the output directory and filename for the Word document.
- **Error Handling**: Includes robust checks to ensure correct processing and saving of responses.
- **Response Caching**: Efficient response management through caching mechanisms in the backend.

## Installation
Before using `gpt-response-to-word`, ensure Python and Node.js are installed on your machine. Clone the repository and install the required dependencies for both backend and frontend.

    git clone https://github.com/danielemiller/gpt-response-to-word.git
    cd gpt-response-to-word

    # Backend setup
    cd backend
    pip install -r requirements.txt

    # Frontend setup
    cd ../frontend
    npm install


## Usage
To use this tool, run the main Python script (`gpt_to_word.py`) and follow the on-screen instructions.

    # Start the Flask backend
    cd backend
    flask run
    
    # In a new terminal, start the Angular frontend
    cd frontend
    ng serve


## Configuration
Ensure you have a `.env` file in the root directory with your OpenAI API key:


    OPENAI_API_KEY=your_api_key_here


## Contributing
Contributions to `gpt-response-to-word` are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
