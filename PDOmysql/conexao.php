<?php

$conexao = new PDO("mysql:host=LOCALHOST;dbname=BANCO","root","");


$selecionar = $conexao->prepare("SELECT * FROM Tabela WHERE :valor AND pro_valor < :preco ");

$selecionar->bindValue(':valor','%qualquer_coisa%');
$selecionar->bindValue(':preco',500.00);
$selecionar->bindParam();


$selecionar->execute();

$resultado = $selecionar->fetchAll(PDO::FETCH_ASSOC);

foreach ($resultado as $lista) 
{
  echo"<br>";
  echo $lista['nome_do_campo'];    
}

?>