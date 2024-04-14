window.onload = function() {

let peixeNome = decodeURIComponent(window.location.search.replace(/^.*?peixe=(.*)$/, '$1'));

fetch("peixes.json")
        .then(response => response.json())
        .then(data => {
            var peixe = data.find(peixe => peixe.nome === peixeNome)
            if (peixe) 
            {
                document.getElementById('peixe-imagem').src = peixe.foto
                document.getElementById('peixe-nome').textContent = "Nome: " + peixe.nome
                document.getElementById('peixe-tamanho').textContent = "Tamanho: " + peixe.tamanho
                document.getElementById('peixe-cor').textContent = "Cor: " + peixe.cor
                document.getElementById('peixe-regioes').textContent = "Regiões: " + peixe.regioes.join(', ')
                document.getElementById('peixe-aguad').textContent = "Tipo de Água: " + peixe.aguad
                let diponib = document.getElementById('peixe-disponibilidade')
                let venda = document.getElementById('vender')
                let disp
                if(peixe.disponibilidade==1){
                    disp = "A comercialização desta espécie é permitida pela MAPA/IBAMA" 
                    diponib.style.color = "green"
                }
                else{
                    disp = "A comercialização desta espécie é restringida ou não permitida pela MAPA/IBAMA"
                    diponib.style.color = "red"
                    venda.classList.add('disabled')
                    venda.disabled = true
                }
                    
                diponib.textContent = "Disponibilidade: " + disp  
                

                if(peixe.texto1){
                    document.getElementById('texto1').textContent = peixe.texto1
                }
                if(peixe.texto2){
                    document.getElementById('texto2').textContent = peixe.texto2
                }
                if(peixe.texto3){
                    document.getElementById('texto3').textContent = peixe.texto3
                }
                if(peixe.texto4){
                    document.getElementById('texto4').textContent = peixe.texto4
                }
                if(peixe.texto5){
                    document.getElementById('texto5').textContent = peixe.texto5
                }
                if(peixe.texto6){
                    document.getElementById('texto6').textContent = peixe.texto6
                }
                if(peixe.texto7){
                    document.getElementById('texto7').textContent = peixe.texto7
                }
                
            } else {
                console.log('Peixe não encontrado.')
            }
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error))



}