$(document).ready(function() {
    // Mostrar página de login por padrão
    showLoginPage();
  
    // Função para mostrar a página de login
    function showLoginPage() {
      $('#loginPage').show();
      $('#registerPage').hide();
    }
  
    // Função para mostrar a página de cadastro
    function showRegisterPage() {
      $('#loginPage').hide();
      $('#registerPage').show();
    }
  
    // Switch para página de cadastro
    $('#linkCadastro').click(function(event) {
      event.preventDefault();
      showRegisterPage();
    });
  
    // Switch para página de login
    $('#linkLogin').click(function(event) {
      event.preventDefault();
      showLoginPage();
    });
  
    // Lógica de login
    $('#loginForm').submit(function(event) {
      event.preventDefault();
      var username = $('#loginUsername').val();
      var password = $('#loginPassword').val();
  
      // Verificar se o usuário existe no localStorage
      var users = JSON.parse(localStorage.getItem('users')) || [];
      var user = users.find(function(u) {
        return u.username === username && u.password === password;
      });
  
      if (user) {
        // Salvar usuário atual na localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirecionar para a página home.html
        window.location.href = 'pages/home.html';
      } else {
        alert('Usuário ou senha incorretos.');
      }
    });
  
    // Lógica de cadastro
    $('#registerForm').submit(function(event) {
      event.preventDefault();
      var username = $('#registerUsername').val();
      var password = $('#registerPassword').val();
  
      // Verificar se o usuário já existe
      var users = JSON.parse(localStorage.getItem('users')) || [];
      var existingUser = users.find(function(u) {
        return u.username === username;
      });
  
      if (existingUser) {
        alert('Este usuário já está cadastrado. Por favor, escolha outro nome de usuário.');
      } else {
        // Cadastrar novo usuário
        users.push({ username: username, password: password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Cadastro realizado com sucesso! Faça login para continuar.');
        showLoginPage(); // Mostrar página de login após o cadastro
      }
    });
  });
  