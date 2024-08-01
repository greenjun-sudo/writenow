document.getElementById('showLogin').addEventListener('click', () => {
    document.getElementById('loginPopup').style.display = 'flex';
});

document.getElementById('showSignup').addEventListener('click', () => {
    document.getElementById('signupPopup').style.display = 'flex';
});

document.querySelectorAll('.closePopup').forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.parentElement.style.display = 'none';
    });
});

// 서버 요청 관련 코드는 실제 서버 URL로 변경하여 사용
document.getElementById('login').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('https://your-backend-url.herokuapp.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Login success') {
            alert('로그인 성공');
            document.getElementById('postForm').style.display = 'block';
            document.getElementById('posts').style.display = 'block';
            loadPosts();
            document.getElementById('loginPopup').style.display = 'none';
        } else {
            alert('로그인 실패');
        }
    });
});

document.getElementById('signup').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    fetch('https://your-backend-url.herokuapp.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Signup success') {
            alert('회원가입 성공');
            document.getElementById('signupPopup').style.display = 'none';
        } else {
            alert('회원가입 실패');
        }
    });
});

document.querySelector('#postForm form').addEventListener('submit', function (event) {
    event.preventDefault();
    const content = document.getElementById('content').value;

    fetch('https://your-backend-url.herokuapp.com/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Post success') {
            alert('게시글 작성 성공');
            loadPosts();
        } else {
            alert('게시글 작성 실패');
        }
    });
});

function loadPosts() {
    fetch('https://your-backend-url.herokuapp.com/posts')
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('posts');
            postsContainer.innerHTML = '<h2>게시글</h2>';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.textContent = post.content;
                postsContainer.appendChild(postElement);
            });
        });
}