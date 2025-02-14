from flask import Flask, render_template, request, jsonify
import paramiko
import io

app = Flask(__name__)

@app.route('/connect', methods=['POST'])
def ssh_connect():
    data = request.json
    try:
        # 创建SSH客户端
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        
        # 建立连接
        client.connect(
            hostname=data['host'],
            port=int(data['port']),
            username=data['username'],
            password=data['password'],
            timeout=10
        )
        
        # 简单验证连接（执行whoami命令）
        stdin, stdout, stderr = client.exec_command('whoami')
        user = stdout.read().decode().strip()
        
        return jsonify({
            'success': True,
            'message': f'已成功连接为：{user}'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
    finally:
        if 'client' in locals():
            client.close()

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
