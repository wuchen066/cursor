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

// 添加解析功能
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

function showStatus(text, color) {
    const status = document.getElementById('parseStatus');
    status.textContent = text;
    status.style.color = color;
    status.style.opacity = 1;
    
    setTimeout(() => {
        status.style.opacity = 0;
    }, 3000);
}

// 新增通用验证函数
const validators = {
    host: (value) => {
        const isValid = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(value);
        return { 
            isValid,
            message: isValid ? '' : 'IP地址格式应为x.x.x.x'
        };
    },
    port: (value) => {
        const port = parseInt(value);
        const isValid = !isNaN(port) && port > 0 && port <= 65535;
        return {
            isValid,
            message: isValid ? '' : '端口范围1-65535'
        };
    },
    username: (value) => {
        const isValid = value.length >= 1 && value.length <= 32;
        return {
            isValid,
            message: isValid ? '' : '用户名长度1-32位'
        };
    },
    password: (value) => {
        const isValid = value.length >= 6;
        return {
            isValid,
            message: isValid ? '' : '密码至少6位'
        };
    }
};

// 为每个输入框添加实时验证
['host', 'port', 'username', 'password'].forEach(id => {
    const input = document.getElementById(id);
    const formGroup = input.closest('.form-group');
    
    // 创建错误提示元素
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    formGroup.appendChild(errorEl);

    input.addEventListener('input', function() {
        const { isValid, message } = validators[id](this.value);
        
        if (!isValid) {
            formGroup.classList.add('invalid');
            errorEl.textContent = message;
            input.style.borderColor = '#ff4757';
        } else {
            formGroup.classList.remove('invalid');
            errorEl.textContent = '';
            input.style.borderColor = '';
        }
    });
}); 