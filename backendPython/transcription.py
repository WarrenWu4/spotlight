from openai import OpenAI
from flask import Flask, request, jsonify

app = Flask(__name__)
client = OpenAI(api_key="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")
#andrew - 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
token = 'secret_qa0G5Z9IxRK2seXB7CYcHBIeoC9TPxyMepAdEea3oYl'
database_id = '571763f436dd4caa98e3f9bf650983b2'



@app.route('/summarize', methods=['POST'])
def get_summary():  # Removed the text parameter
    data = request.json
    text = data.get('text', "")  # Default to empty string if 'text' not in request
    if not text:
        return jsonify({'error': 'Please provide text to summarize'}), 400

    try:
        stream = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an educator for students."},
                {"role": "user", "content": f"summarize this text {text}"}],
            stream=True,
            temperature=0.2,  # Controls randomness. Lower is more deterministic.
            max_tokens=150,  # Maximum length of the generated text
            top_p=1.0,  # Nucleus sampling parameter
            frequency_penalty=0,  # How much to penalize new tokens based on frequency
            presence_penalty=0,  # How much to penalize new tokens based on their presence
            stop=None,  # Sequence where the API will stop generating further tokens.
            n=1,  # Number of completions to generate
            #logprobs=None,  # Include the log probabilities on the logprobs most likely tokens, as well the chosen tokens. For example, if logprobs is 5, the API will return a list of the 5 most likely tokens. The API will always return the logprob of the sampled token, so there may be up to logprobs+1 elements in the response.
            #echo=False,  # Echo back the completion, allowing you to see the prompt in the completion response
            user="user-id"  # Identifier for the user, useful for personalizing responses based on user history
        )
        
        # summary = ""
        # for message in stream:
        #     summary += message['choices'][0]['message']['content']
        summary = stream.choices[0].message['content'] if stream.choices else 'Summary not generated.'

        return jsonify({'summary': summary})
       
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)