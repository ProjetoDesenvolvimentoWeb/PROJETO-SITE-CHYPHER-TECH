
const ul = document.querySelector("ul");
const random = (min, max) => Math.random() * (max - min) + min;
const randomColors = ["#8400ff", "#2bff00", "#eaff00"];

for (let i = 0; i < 50; i++) {
    const li = document.createElement("li");
    const size = Math.floor(random(50, 120));
    const position = random(1, 94);
    const delay = random(1, 5);
    const duration = random(10, 40);

    li.style.width = `${size}px`;
    li.style.height = `${size}px`;
    li.style.background = randomColors[Math.floor(random(0, 3))];
    li.style.left = `${position}%`;
    li.style.animationDelay = `${delay}s`;
    li.style.animationDuration = `${duration}s`;
    li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;

    ul.appendChild(li);
}


function mostrarPopup() {
    var popup = document.getElementById("popupp");
    popup.style.display = "block";
    setTimeout(function(){
      popup.style.display = "none";
    }, 3000); // 3 segundos
  }
  
  function mostrarPopupSucesso() {
    var popup = document.getElementById("popupSucesso");
    popup.style.display = "block";
    setTimeout(function(){
      popup.style.display = "none";
    }, 3000); // 3 segundos
  }
          
  document.getElementById('formAlterarDados').addEventListener('submit', function(event) {
              event.preventDefault();
  
              const usuario = document.getElementById('usuario').value;
              const email = document.getElementById('email').value;
              const novaSenha = document.getElementById('novaSenha').value;
              const confirmarNovaSenha = document.getElementById('confirmarNovaSenha').value;
  
              if (novaSenha !== confirmarNovaSenha) {
                  mostrarPopup('popupp');
              } else {
                  fetch('http://localhost/Cypher_Tech/src/php/apiUser.php', {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ usuario: usuario, email: email, senha: novaSenha })
                  })
                  .then(response => {
                      if (!response.ok) {
                          throw new Error('Erro ao atualizar Senha');
                      }
                      return response.json();
                  })
                  .then(data => {
                      if (data.status === 1) {
                          mostrarPopupSucesso('popupSucesso');
  
                          // Redirecionar para index.html após 3 segundos
                          setTimeout(function(){
                              window.location.href = 'login.html';
                          }, 3000);
                      }
                  })
                  .catch(error => console.error('Erro:', error));
              }
          });