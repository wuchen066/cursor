document.getElementById('sshForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
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

    // 这里可以添加实际的SSH连接逻辑
    setTimeout(() => {
        connectBtn.classList.remove('loading');
        connectBtn.querySelector('.btn-text').style.visibility = 'visible';
        connectBtn.querySelector('.loading-dots').style.display = 'none';
        alert('连接功能需对接后端实现');
    }, 2000);
}); 