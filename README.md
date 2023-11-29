# GPT Response to Word

## Project Overview
`gpt-response-to-word` is a Python-based tool designed to capture responses from OpenAI's GPT models and save them into Microsoft Word documents. This utility is particularly useful for preserving the outputs of AI-powered chat interactions, making them easy to share and reference.

## Features
- **Automated Saving**: Automatically saves GPT responses to a Word document.
- **Customizable Output**: Allows users to specify the output directory and filename.
- **Error Handling**: Includes checks to ensure correct processing and saving of responses.

## Installation
Before you start using `gpt-response-to-word`, make sure you have Python installed on your machine. Then, clone this repository and install the required dependencies.

\```bash
git clone https://github.com/danielemiller/gpt-response-to-word.git
cd gpt-response-to-word
pip install -r requirements.txt
\```

## Usage
To use this tool, run the main Python script (`gpt_to_word.py`) and follow the on-screen instructions.

\```bash
python gpt_to_word.py
\```

## Configuration
Ensure you have a `.env` file in the root directory with your OpenAI API key:

\```
OPENAI_API_KEY=your_api_key_here
\```

## Contributing
Contributions to `gpt-response-to-word` are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
