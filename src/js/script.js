const dataMedicos = [{
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
}];

var medicos = JSON.parse(JSON.stringify(dataMedicos)); 

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
    var table  = document.getElementById("medico-table");
    var tbody  = document.createElement('tbody'); 
    table.appendChild(tbody);
    
    medicos.forEach((element, index) => {

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
    fespecialidade = document.getElementById("fespecialidade").value;
    prioridade = document.getElementById("fprioridade").value;

    if (paciente != '' && fespecialidade != null && prioridade != null){
        cirurgia.push({
            paciente: paciente,
            especialidade: fespecialidade,
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
        th.innerHTML = fespecialidade;

        th = document.createElement("th");
        tr.appendChild(th)
        th.innerHTML = prioridade;

        }
}
function sortPorPrioridade(){
    cirurgia.sort(function(a,b){
        var x = a["prioridade"];
        var y = b["prioridade"];
        return((x<y)? 1 : ((x>y)? -1 : 0));
    });
}
function sortPorEspecialidade(){
    cirurgia.sort(function(a,b){
        var x = a["especialidade"];
        var y = b["especialidade"];
        for(i =0; i<cirurgia.length; i++){
            return((x[i]>y[i])? -1 : (x[i]<y[i])? 1 : 0 );
        }
    })
}

function generateAgenda(especialista, paciente){
    var hora = 0;
    while(paciente.length > 0){
        for(i = 0; i < especialista.length; i++){
            if(especialista[i].horario[hora] == 1){
                especialista[i].horario[hora] = paciente[0].paciente;
                paciente.shift();
            } if (paciente.length == 0){
                break
            }
        }
        hora++;
    }
    return especialista;
}

var teste = false;
var pacientes = {};
var especialistas = {};
var agenda = [];
function criaAgenda(){
    sortPorPrioridade();
    sortPorEspecialidade();

    delete pacientes;
    pacientes = {};

    for (const e of especialidade){
        pacientes[e] = cirurgia.filter(function(val) {
          return val['especialidade'].toLowerCase().indexOf(e.toLowerCase()) != -1;
        });
    }

    especialistas = {};
    for (i in especialidade) {
        especialistas[especialidade[i]] = medicos.filter(function(val) {
            return val['especialidade'].toLowerCase().indexOf(especialidade[i].toLowerCase()) != -1;
        });
    }
    medicos = JSON.parse(JSON.stringify(dataMedicos)); 
    agenda = [];
    for (i in especialidade) {
        agenda = agenda.concat(generateAgenda(especialistas[especialidade[i]], pacientes[especialidade[i]]));
    }

    if(teste == false){
        document.getElementById("horarios-div").removeAttribute("hidden");
        document.getElementById("medicos-div").setAttribute("hidden", "hidden");
        document.getElementById("cirurgia-div").setAttribute("hidden", "hidden");
        
        var table  = document.getElementById("horario-table");
        var tbody  = document.createElement('tbody'); 
        table.appendChild(tbody);
    
        agenda.forEach((element, index) => {

            var tr  = document.createElement('tr'); 
            tbody.appendChild(tr)

            var th = document.createElement("th");
            tr.appendChild(th)
            th.innerHTML = element.nome;

            element.horario.forEach((item, index) => {
                th = document.createElement("th");
                tr.appendChild(th)
                if (item == 1){
                    th.innerHTML = 'Livre';
                }else if (item == 0) {
                    th.innerHTML = ' - ';
                } else{
                    th.innerHTML = item;
                }
            });
            
        });
    }
}
