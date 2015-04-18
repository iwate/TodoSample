<?php
class TodosController extends AppController{
	public $components = array('RequestHandler');
	public function index(){
		$todos = $this->Todo->find('all');
        $this->set(array(
            'list' => $todos,
            '_serialize' => 'list'
        ));
	}
	public function add() {
        $this->Todo->create();
        if ($this->Todo->save($this->request->data)) {
            $message = 'Saved';
        } else {
            $message = 'Error';
        }
        $this->set(array(
            'message' => $message,
            '_serialize' => 'message'
        ));
    }

    public function edit($id) {
        $this->Todo->id = $id;
        if ($this->Todo->save($this->request->data)) {
            $message = 'Saved';
        } else {
            $message = 'Error';
        }
        $this->set(array(
            'message' => $message,
            '_serialize' => 'message'
        ));
    }

    public function delete($id) {
        if ($this->Todo->delete($id)) {
            $message = 'Deleted';
        } else {
            $message = 'Error';
        }
        $this->set(array(
            'message' => $message,
            '_serialize' => 'message'
        ));
    }
}