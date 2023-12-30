from flask import Flask, request, abort, jsonify
import hmac
import hashlib

app = Flask(__name__)

# Replace this with your secret
SECRET = "T4d79AG2lK8bcTfk"

@app.route('/webhook', methods=['POST'])
def webhook_handler():
    # Verify the request is from GitHub
    signature = request.headers.get('X-Hub-Signature')
    if signature is None:
        abort(403)

    sha_name, signature = signature.split('=')
    if sha_name != 'sha1':
        abort(501)

    mac = hmac.new(SECRET.encode('utf-8'), msg=request.data, digestmod=hashlib.sha1)

    if not hmac.compare_digest('sha1=' + mac.hexdigest(), signature):
        abort(403)

    # Process the payload
    payload = request.get_json()
    # Add your custom logic here to handle the payload

    return jsonify({'message': 'Webhook received successfully'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8082)
