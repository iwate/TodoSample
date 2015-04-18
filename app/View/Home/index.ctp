<?php
	$this->start('css');
	echo $this->Html->css( 'style.css');
	$this->end();
	$this->start('script');
	echo $this->Html->script( 'http://code.jquery.com/jquery-1.11.2.min.js');
	echo $this->Html->script( 'app.js');
	$this->end();
?>

<div id='wrapper'>
	<article>
	    <header>
	        <h2>Microsoft Azure Handson</h2>
	        <h1>CakePHP on Azure Websites</h1>
	        <form id='add-item'>
				<input type='text' id='new-item-text' placeholder='Enter new task' />
				<button type='submit'>Add</button>
	        </form>
	    </header>
		<p id='summary'>Loading...</p>
	    <ul id='todo-items'></ul>
	</article>
</div>  

