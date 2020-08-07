<?php

class DB
{

    private  $driver = "mysql",
             $host ="localhost",
             $user = "root",
             $senha = " ",
             $banco ="teste";
   
    private function conectar()
    {         
       try {
            $con = new PDO("{$this->driver}:host={$this->$host};dbname={$this->banco}",
            "{$this->user}",
            "{$this->senha}");
                        return $con;           
        } catch (PDOException $e) 
        {
            echo $e->getMessage();
            
            exit();

        }      
    } 






    
}

?>