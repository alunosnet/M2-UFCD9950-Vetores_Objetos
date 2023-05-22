//vetor para guardar os dados dos alunos
let lista_alunos=[];

//verificar se o cookie do aviso já existe
Verificar_Cookies();
//ler a lista dos alunos guardada no localstorage
LerListaAlunos();

//objeto aluno
function Aluno(nome,numero,turma,faltas,media)
{
    //propriedades do objeto
    this.nome=nome;
    this.numero=numero;
    this.turma=turma;
    this.faltas=faltas;
    this.media=media;
    //métodos ou funções do objeto
    this.Avaliar=function(){
        if (this.media>=10 && this.faltas<5)
        {
            return "Aprovado";
        }
        else
        {
            return "Reprovado";
        }
    }
}

function GuardarAluno()
{
    //recolher os dados da página
    let input_nome=document.getElementById("input_nome");
    let input_numero=document.getElementById("input_numero");
    let input_turma=document.getElementById("input_turma");
    let input_media=document.getElementById("input_media");
    let input_faltas=document.getElementById("input_faltas");
    let nome=input_nome.value;
    let numero=input_numero.value;
    let turma=input_turma.value;
    let media=input_media.value;
    let faltas=input_faltas.value;
    //criar um objeto do tipo aluno
   /*
    let novo={
        nome: nome,
        numero: numero,
        turma: turma,
        media: media,
        faltas: faltas,
        Avaliar: function(){
            if (media>=10 && faltas<5)
            {
                return "Aprovado";
            }
            else
            {
                return "Reprovado";
            }
        }
    };
    */
    let novo=new Aluno(nome,numero,turma,faltas,media);
    //guardar o objeto no vetor
    lista_alunos.push(novo);
    //adicionar o nome do aluno à select
    let opcao=document.createElement("option");
    opcao.text=nome;
    document.getElementById("select_alunos").options.add(opcao);
    //limpar as inputs
    input_nome.value="";
    input_turma.value="";
    input_numero.value="0";
    input_faltas.value="0";
    input_media.value="0";
    //guardar no localstorage
    GuardarListaAlunos();
}

function AlunoSelecionado()
{
    let select_alunos=document.getElementById("select_alunos");
    let posicao=select_alunos.selectedIndex;
    alert(lista_alunos[posicao].Avaliar());
}

//////////////////////////////////////////////////////////
//Cookies
////////////////////////////////////////////////////////
function Aceitar_Cookies()
{
    document.cookie="aceito=true";
    document.getElementById("aviso").style.display="none";
}

function Verificar_Cookies()
{
    if(LerCookie("aceito")!=null)
        document.getElementById("aviso").style.display="none";
}

function LerCookie(nome)
{
    let todos_cookies=document.cookie;
    //separar os cookies no ;
    let vetor=todos_cookies.split(";");
    //percorrer o vetor e procurar o cookie nome
    for(let i=0;i<vetor.length;i++)
    {
        let este_cookie=vetor[i].split("=");
        if(nome=este_cookie[0].trim())
            return este_cookie[1];
    }
    return null;
}

//////////////////////////////////////////////
//LocalStorage
////////////////////////////////////////////////
function GuardarListaAlunos()
{
    localStorage.setItem("lista_alunos",JSON.stringify(lista_alunos));
}

function LerListaAlunos()
{
    //verificar se existe a lista de alunos
    if(localStorage.getItem("lista_alunos")==null)
    {
        LerFicheiro();
    }
    else
    {
        lista_alunos=JSON.parse(localStorage.getItem("lista_alunos"));
        //percorrer o vetor e substituir cada posicao do vetor
        //por um objeto do tipo aluno (que tem a função avaliar)
        for(let posicao=0;posicao<lista_alunos.length;posicao++)
        {
            lista_alunos[posicao]=new Aluno(
                lista_alunos[posicao].nome,
                lista_alunos[posicao].numero,
                lista_alunos[posicao].turma,
                lista_alunos[posicao].faltas,
                lista_alunos[posicao].media
            );
        }
    }
    //atualizar a select dos alunos
    AtualizaSelectAlunos();
}

function AtualizaSelectAlunos()
{
    let select_alunos=document.getElementById("select_alunos");
    select_alunos.options.length=0;
    //percorrer o vetor dos alunos
    for(let posicao=0;posicao<lista_alunos.length;posicao++)
    {
        let opcao=document.createElement("option");
        opcao.text=lista_alunos[posicao].nome;
        opcao.value=posicao;
        select_alunos.options.add(opcao);
    }
}

async function LerFicheiro()
{
    const ficheiro = await fetch("dados.json");
    const dados = await ficheiro.json();

    lista_alunos=dados;

    for(let posicao=0;posicao<lista_alunos.length;posicao++)
        {
            lista_alunos[posicao]=new Aluno(
                lista_alunos[posicao].nome,
                lista_alunos[posicao].numero,
                lista_alunos[posicao].turma,
                lista_alunos[posicao].faltas,
                lista_alunos[posicao].media
            );
        }

    AtualizaSelectAlunos();
}

function PesquisarAluno()
{
    let input_nome=document.getElementById("input_nome");
    let nome_a_pesquisar=input_nome.value;

    let select_alunos=document.getElementById("select_alunos");
    select_alunos.options.length=0;
    //percorrer o vetor dos alunos
    for(let posicao=0;posicao<lista_alunos.length;posicao++)
    {
        if (lista_alunos[posicao].nome.toLowerCase().includes(nome_a_pesquisar.toLowerCase()))
        {

            let opcao=document.createElement("option");
            opcao.text=lista_alunos[posicao].nome;
            opcao.value=posicao;
            select_alunos.options.add(opcao);
        }
    }

}

function GuardarAlunoEditado()
{
   //recolher os dados da página
   let input_nome=document.getElementById("input_nome");
   let input_numero=document.getElementById("input_numero");
   let input_turma=document.getElementById("input_turma");
   let input_media=document.getElementById("input_media");
   let input_faltas=document.getElementById("input_faltas");
   let nome=input_nome.value;
   let numero=input_numero.value;
   let turma=input_turma.value;
   let media=input_media.value;
   let faltas=input_faltas.value;
   //posição do aluno selecionado
   let select_alunos=document.getElementById("select_alunos");
   let posicao=select_alunos.selectedIndex;
   //aluno selecionado
    let aluno_selecionado=lista_alunos[posicao];
    aluno_selecionado.nome=nome;
    aluno_selecionado.numero=numero;
    aluno_selecionado.turma=turma;
    aluno_selecionado.media=media;
    aluno_selecionado.faltas=faltas;
    //atualiza a select
    select_alunos.options[posicao].text=nome;

   //limpar as inputs
   input_nome.value="";
   input_turma.value="";
   input_numero.value="0";
   input_faltas.value="0";
   input_media.value="0";
   //guardar no localstorage
   GuardarListaAlunos();
}
//Função que mostra os dados do aluno selecionado
function  EditarAlunoSelecionado()
{
    let input_nome=document.getElementById("input_nome");
    let input_numero=document.getElementById("input_numero");
    let input_turma=document.getElementById("input_turma");
    let input_media=document.getElementById("input_media");
    let input_faltas=document.getElementById("input_faltas");
    //aluno selecionado na select
    let select_lista=document.getElementById("select_alunos");
    let posicao=select_lista.selectedIndex;
    //mostrar os dados do aluno
    input_nome.value=lista_alunos[posicao].nome;
    input_numero.value=lista_alunos[posicao].numero;
    input_turma.value=lista_alunos[posicao].turma;
    input_media.value=lista_alunos[posicao].media;
    input_faltas.value=lista_alunos[posicao].faltas;
    
}

function RemoverAluno()
{
    let select_lista=document.getElementById("select_alunos");
    let posicao=select_lista.selectedIndex;
    let nome=lista_alunos[posicao].nome;
    if(confirm("Tem a certeza que pretende remover o aluno "+nome)==false)
    {
        return;
    }
    //apagar da lista dos alunos
    lista_alunos.splice(posicao,1);

    //atualizar a select
    AtualizaSelectAlunos();

    //atualizar o local storage
    GuardarListaAlunos();

}