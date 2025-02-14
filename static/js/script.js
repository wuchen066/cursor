document.getElementById('sshForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    addLog('开始建立SSH连接...', 'info');
    
    const formData = {
        host: document.getElementById('host').value,
        port: document.getElementById('port').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    const connectBtn = document.querySelector('.connect-btn');
    connectBtn.classList.add('loading');
    connectBtn.querySelector('.btn-text').style.visibility = 'hidden';
    connectBtn.querySelector('.loading-dots').style.display = 'block';

    try {
        const response = await fetch('/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.success) {
            addLog('连接成功! 正在初始化终端...', 'success');
            // 这里可以添加终端初始化代码
        } else {
            addLog(`连接失败: ${result.error}`, 'error');
        }
    } catch (error) {
        addLog(`网络错误: ${error.message}`, 'error');
    } finally {
        connectBtn.classList.remove('loading');
        connectBtn.querySelector('.btn-text').style.visibility = 'visible';
        connectBtn.querySelector('.loading-dots').style.display = 'none';
    }
}); 

// 删除批量输入解析的验证逻辑（保留原有事件监听）
document.getElementById('batchInput').addEventListener('input', function(e) {
    const text = e.target.value.trim();
    const status = document.getElementById('parseStatus');
    status.textContent = '';
    
    if (text) {
        try {
            // 删除所有验证逻辑
            const [ipPart, portPart, userPart, passPart] = text.split(/[:|\s]+/);
            
            // 直接填充数据
            document.getElementById('host').value = ipPart || '';
            document.getElementById('port').value = portPart || '22';
            document.getElementById('username').value = userPart || '';
            document.getElementById('password').value = passPart || '';
            
            // 触发输入事件（保留自动验证）
            ['host', 'port', 'username', 'password'].forEach(id => {
                document.getElementById(id).dispatchEvent(new Event('input'));
            });
            
            showStatus('✅ 解析成功，已自动填充！', '#00c6ad');
        } catch {
            showStatus('❌ 格式解析失败', '#ff4757');
        }
    }
});

// 添加日志功能
const logContent = document.getElementById('logContent');
let logBuffer = [];

function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.innerHTML = `[${timestamp}] ${message}`;
    logContent.appendChild(logEntry);
    logContent.scrollTop = logContent.scrollHeight;
}

// 清空日志功能
document.querySelector('.clear-log').addEventListener('click', () => {
    logContent.innerHTML = '';
    logBuffer = [];
});