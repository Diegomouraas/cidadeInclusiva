# cidadeInclusiva
Projeto Angra Cidade Inclusiva


## Instruções para criar o DB MySQL
1 - Criar um banco de dados com o nome de angraInclusiva
    No CMD ja logado no MySQL, digitar os seguintes comandos:
        
        CREATE DATABASE angrainclusiva;

        USE angrainclusiva;

2 - Criar as tabelas da aplicação dentro do DB (Data Base)
    Dentro do banco de dados, execute os seguintes comandos (tecle enter ao final de cada linha a seguir):

        CREATE TABLE reg(
        id VARCHAR(255),
        stat INT,
        nomeloc VARCHAR(50),
        cnpj VARCHAR(20),
        descricao VARCHAR(255),
        tipo INT,
        selo INT,
        cep VARCHAR(8),
        rua VARCHAR(50),
        num VARCHAR(7),
        bairro VARCHAR(50),
        nomeresp VARCHAR(50),
        numfix VARCHAR(50),
        numcel VARCHAR(50),
        lat VARCHAR(20),
        longt VARCHAR(20)
        );

INSERT INTO REG(id, stat, nomeloc, cnpj, descricao, tipo, selo, cep, rua, num, bairro, nomeresp, numfix, numcel, lat, longt) values(
    "0",
    0,
    "venda da tia la",
    "32.245.489/0001-61",
    "vendinha de uma tiazinha aleatoria que vende bala de coco em frente a uma lata de lixo azul",
    1,
    1,
    "23900000",
    "Rua Havaianas",
    "7",
    "Cachimbo doce",
    "Dona Nugget",
    "2445869875",
    "24946851345",
    "-234895476",
    "-244865874"
);

        
    