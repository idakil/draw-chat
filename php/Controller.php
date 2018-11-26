<?php
class Controller {
    private $model;
    public function __construct() {
        $this->model = new Model();
    }

    public function list_it() {
        $this->messages = $this->model->messages();
        include("View.php");
    }

    public function changeusername() {
        $_SESSION['username'] = $_POST["username"];
        header("Location: Chat.php?action=list_it");

    }
    public function send() {
        $this->model->add_message($this->name . " " . $_POST["message"]);
        header("Location: Chat.php?action=list_it");
    }
}
?>