//Estrutura de um projeto em node js

//nome: projeto{
  // index.js
   //package-lock.json
      
     // pasta = banco_sequelize{
       // banco.js "conexao"
       // Salvar_banco.js "tabela"    
       //}     
    //pasta views{
      // paginas.handlebars "todas"
        //  pasta layouts{
          //  main.handlebars "Pagina principal"
         //}

    //}        
      

//}




// meus conhecimento codigos que desenvolvi apenas pra conhecer 0 node js  
   const express = require("express");
   const app = express();
   const handlebars = require("express-handlebars");
       //informa pra o index.js carregar o handlebars
   app.engine('handlebars',handlebars({defaultLayout:'main'}))
   app.set('view engine','handlebars')
      // pra poder receber dados 
   const bodyParser = require('body-parser');
      //configuração
   app.use(bodyParser.urlencoded({extended:false}))
   app.use(bodyParser.json())

app.listen(8080);
  
  // só a conexao do sequelize
        // pra poder usar o fremeworks
        const Sequelize =require("sequelize")
        //(   'nome_banco'    ,  'usuario'    ,'senha')                        
const sequelize = new Sequelize('pagamentos'     , 'root'       ,  '',{
host:'localhost',// seria a propria maquina
dialect:'mysql' // o banco a ser utilizado
})

// pra poder utilizar em outros arquivos
// no caso colocara  banco.js
module.exports = {
Sequelize: Sequelize,
sequelize: sequelize 
}

//Criando a tabela
    
            //o metodo pra construir a tabela
            // incluir a conexao com banco de dados 
           // seria banco
              const Database = require('./banco')

           //utilizei o sequelize  que foi esportado do banco.js 
           // e define o nome da Tabela              
       const Salvar  = Database.sequelize.define('Despesas',
           {
	        // aqui informo as colunas
	     tipo:{
		   type: Database.Sequelize.STRING
	        },

	    valor:{
		type: Database.Sequelize.DOUBLE
	        }
         })

                       //criando a tabela
                     //executar uma unica vez
                Salvar.sync({force:true})

              //exportar 
              module.exports = Salvar;
   
  // Salvar no banco
   const salvar = require("./banco_sequelize/Salvar_banco");
   
   //criando a rota
   app.post('/pagamento',function(req,res){
     //criando um objeto pra salvar
       salvar.create({
        tipo:req.body.nome,
        valor:req.body.valor
            }).then(function(){
             res.retirect("/pagamento");
           //res.send("Operação efetuada com Sucesso")
            }).catch(function(erro){
        res.send("Erro Operação incorreta"+erro)
          })
       //res.send("Valor de R$:"+req.body.valor+".00 Reais <br> Cartao utilizado:"+req.body.nome);
      //verificação de campo
   if(req.body.nome=="" && req.body.valor==""){
       res.send("Preencha os campos");
     }    

  // incluir o moment pra formata hora e data do banco de dados
const moment = require('moment')
// listando dados do banco
 salvar.findAll().then(function(salvar){
    res.render('pagamento',{salvar:salvar});

   })
   
       app.engine('handlebars',handlebars({
  defaultLayout:'main',
  helpers:{
       // formatando a hora e data 
        formatDate:(date)=>{
        return moment(date).format('DD/MM/YYYY')
             }
         }

      }))
      
      //{{!-- recebendo os dados atraves da variavel salvar --}}

      //{{#each salvar}} {{!-- este é um tipo de loop pra listar --}}
      // {{!-- lendo valores --}}
       <hr>
      
        tipo:{{tipo}}<br> </br>{{!--// nome da coluna entre chave --}}  
        valor:{{valor}}<br>
        cadastrado:
      
        {{#formatDate createdAt}} {{!--// este formatDate é  app.engine pra formata data e hora --}} 
      
        {{/formatDate}}<br>  {{!--//usando moment pra formata a hota e data --}}  
        
        <hr>
      
      {{/each}}     

{{!-- //indica a pagina e o id do banco a ser apagado --}}
      {{!-- //cria se a rota  del-pagamento --}}
    <a href="/del-pagamento/{{id}}"><button>Apagar</button></a>

 app.get('/del-pagamento/:id',function(req,res){
  	salvar.destroy({
  		where:{'id':req.params.id}
  	}).then(function(){
  		res.send("Operação  deletada com sucesso");
  	}).catch(function(erro){
         res.send("Erro na operação de Apagar");
  	})
  });
