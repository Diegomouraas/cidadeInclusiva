# cidadeInclusiva
Projeto Angra Cidade Inclusiva


## Instruções para criar o DB MySQL
1 - Criar um banco de dados com o nome de angraInclusiva
    No CMD ja logado no MySQL, digitar os seguintes comandos:
        
        CREATE DATABASE angrainclusiva;

2 - Criar as tabelas da aplicação dentro do DB (Data Base):

    1 - Abra o arquivo RegMSQL que esta localizado na pasta models e descomente a linha "Reg.sync({force:true})" que esta no final do arquivo.
    
    2 - Execute o arquivo RegMSQL no terminal utilizando o node.

    3 - Aguarde a aplicação criar a tabela, e logo após pare a aplicação.

    4 - IMPORTANTE: Recomente a linha "Reg.sync({force:true})" no arquivo RegMSQL após os passos anteriores.

3 - Antes de rodar a aplicação será nescessario incluir o usuario e senha do servidor MySQL:

    1 - No arquivo MySqlDB.js localizado na pasta models, modifique os campos de usuario e senha que originalmente estarão preenxidos com 'root' e '###' respectivamente, inserindo a o usuario e senha do servidor MySQL que a aplicação utilizará.

4 - Para rodar a aplicação, deverá utilizar o node para executar o arquivo appmsql.js localizado na raiz do pojeto.