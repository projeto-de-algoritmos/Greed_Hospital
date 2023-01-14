function it(desc, fn) {
    try {
      fn();
      console.log(desc);
    } catch (error) {
      console.log(desc);
      console.error(error);
    }
}

function assert(isTrue) {
    if (!isTrue) {
      throw new Error();
    }
}

const cirurgiaMock = [{
    paciente: 'paciente1-ortopedista',
    especialidade: 'ortopedista',
    prioridade: 1},{
    paciente: 'paciente2-ortopedista',
    especialidade: 'ortopedista',
    prioridade: 0},{
    paciente: 'paciente3-ortopedista',
    especialidade: 'ortopedista',
    prioridade: -1},{
    paciente: 'paciente4-ortopedista',
    especialidade: 'ortopedista',
    prioridade: 1},{
    paciente: 'paciente1-neuro',
    especialidade: 'neuro',
    prioridade: -1},{
    paciente: 'paciente2-neuro',
    especialidade: 'neuro',
    prioridade: 1},{
    paciente: 'paciente3-neuro',
    especialidade: 'neuro',
    prioridade: 0},{
    paciente: 'paciente4-neuro',
    especialidade: 'neuro',
    prioridade: 0}];

const medicosResultado = [{
    nome: 'Mariana',
    horario: ['paciente1-ortopedista', 'paciente2-ortopedista', 1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    especialidade: 'ortopedista'
},{
    nome: 'Taina',
    horario: ['paciente4-ortopedista', 'paciente3-ortopedista', 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    especialidade: 'ortopedista'
},{
    nome: 'Gabriela',
    horario: [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1],
    especialidade: 'ortopedista'
},{
    nome: 'João',
    horario: ['paciente2-neuro', 'paciente3-neuro', 0, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    especialidade: 'neuro'
},{
    nome: 'Mateus',
    horario: [0, 0, 'paciente4-neuro', 'paciente1-neuro', 0, 1, 0, 0, 1, 1, 0, 1],
    especialidade: 'neuro'
},{
    nome: 'Gustavo',
    horario: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    especialidade: 'neuro'
}];

it('testCriaAgenda', function() {
    cirurgia = cirurgiaMock;
    teste = true;
    criaAgenda();
    assert(JSON.stringify(agenda) === JSON.stringify(medicosResultado));
    console.log("expected");
    console.log(medicosResultado)
    console.log("result" );
    console.log(agenda);
    teste = false;
    cirurgia = [];
});
