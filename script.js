const peixeCaixaTemplate = document.querySelector("[data-peixe-template]")
const peixeCaixaContainer = document.querySelector("[data-peixe-caixa-container]")
const pesqInput = document.querySelector("[data-pesq]")
const form = document.getElementById("form")
let aguaInput = document.querySelector('input[name=agua]:checked')

let radioChecked


radioUpdate()

function radioUpdate()
{
    aguaInput = document.querySelector('input[name=agua]:checked')
    radioChecked = aguaInput.value.toString()
    if(radioChecked.toLowerCase() == "ambas")
    {
        radioChecked = "doce salgada"
    }
}



function addTemplateClickEvents() {
    const templates = document.querySelectorAll('.peixe')

    templates.forEach(template => {
        template.addEventListener('click', () => {
            const peixeNome = template.dataset.peixeNome
            
            window.location.href = 'peixes.php?peixe=' + peixeNome
        })
    })
}




let peixes = []



function update()
{
    const texto = pesqInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    let vfagua
    if(radioChecked=="doce salgada")
        vfagua = true
    else
        vfagua = false
    peixes.forEach(peixe => {
    const isVisible =
        (peixe.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(texto) ||
        JSON.stringify(peixe.regioes).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(texto)) &&
        (peixe.aguad.toLowerCase().includes(radioChecked) || vfagua)
    peixe.element.classList.toggle("hide", !isVisible)
    })
}



fetch("peixes.json")
  .then(res => res.json())
  .then(data => {
        peixes = data.map(peixe => {
            const caixa = peixeCaixaTemplate.content.cloneNode(true).children[0]
            const name = caixa.querySelector("[data-nome]")
            const loc = caixa.querySelector("[data-loc]")
            const agua = caixa.querySelector("[data-agua]")
            const peixeNome = peixe.nome
            caixa.dataset.peixeNome = peixeNome
            name.textContent = peixe.nome
            loc.textContent = peixe.regioes.join(', ')
            agua.textContent = peixe.aguad

            peixeCaixaContainer.appendChild(caixa)
            return { nome: peixeNome, regioes: peixe.regioes, aguad: peixe.aguad, element: caixa }
        });

        addTemplateClickEvents()
  })

