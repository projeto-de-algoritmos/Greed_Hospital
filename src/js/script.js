const medicos = [{
    nome: 'Mariana',
    horario: [1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    especialidade: 'ortopedista'
},{
    nome: 'Taina',
    horario: [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    especialidade: 'ortopedista'
},{
    nome: 'Gabriela',
    horario: [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1],
    especialidade: 'ortopedista'
},{
    nome: 'João',
    horario: [1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    especialidade: 'neuro'
},{
    nome: 'Mateus',
    horario: [0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1],
    especialidade: 'neuro'
},{
    nome: 'Gustavo',
    horario: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    especialidade: 'neuro'
}]

var lookup = {};
var especialidade = [];

medicos.forEach((element) => {
    if (!(element.especialidade in lookup)) {
        lookup[element.especialidade] = 1;
        especialidade.push(element.especialidade);
    }
});

var cirurgia = [];

function onLoad(){
    medicos.forEach((element, index) => {
        var table  = document.getElementById("medico-table");

        var tbody  = document.createElement('tbody'); 
        table.appendChild(tbody);

        var tr  = document.createElement('tr'); 
        tbody.appendChild(tr)

        var th = document.createElement("th");
        tr.appendChild(th)
        th.innerHTML = element.nome;

        th = document.createElement("th");
        tr.appendChild(th)
        th.innerHTML = element.especialidade;

        element.horario.forEach((item, index) => {
            th = document.createElement("th");
            tr.appendChild(th)
            if (item == 1){
                th.innerHTML = 'Livre';
            } else {
                th.innerHTML = ' - ';
            }
        });
        
    });

    especialidade.forEach((element, index) => {
        var select = document.getElementById("fespecialidade");
        var option = document.createElement("option");
        option.textContent = element;
        option.value = element;
        select.appendChild(option);});

}

function addCirurgia(){
    paciente = document.getElementById("fpaciente").value;
    especialidade = document.getElementById("fespecialidade").value;
    prioridade = document.getElementById("fprioridade").value;

    if (paciente != '' && especialidade != null && prioridade != null){
        cirurgia.push({
            paciente: paciente,
            especialidade: especialidade,
            prioridade: prioridade
        });
        var table  = document.getElementById("cirurgia-table");

        var tbody  = document.createElement('tbody'); 
        table.appendChild(tbody);

        var tr  = document.createElement('tr'); 
        tbody.appendChild(tr)

        var th = document.createElement("th");
        tr.appendChild(th)
        th.innerHTML = paciente;

        th = document.createElement("th");
        tr.appendChild(th)
        th.innerHTML = especialidade;

        th = document.createElement("th");
        tr.appendChild(th)
        th.innerHTML = prioridade;

        }
}

function criaAgenda(){
    document.getElementById("horarios-div").removeAttribute("hidden");
    document.getElementById("medicos-div").setAttribute("hidden", "hidden");
    document.getElementById("cirurgia-div").setAttribute("hidden", "hidden");
}

