<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="en" ><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" ><!--<![endif]-->
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="./../lib/bootstrap-3.3.7/bootstrap-theme.min.css">
<link rel="stylesheet" type="text/css" href="./../lib/bootstrap-3.3.7/bootstrap.min.css">
<script src="../lib/jquery/jquery-3.3.1/jquery-3.3.1.js"></script>
<script src="../lib/font-awesome-5.0.10/fontawesome-all.js"></script>
<script src="./js-dist/bundle.js"></script>
<title>Stupid Tris</title>
</head>
<body>
	<div id='main_container' class='container'>

		<!-- Title -->
		<div class='jumbotron'>
			<div class='container'>
				<h1 class='center-text'>Stupid Tris</h1>
			</div>
		</div>

		<!-- Top Bar -->
		<div id='top_bar' class='row top_bar'>
			<div class='col-sm-4 center-text'>
				<h1><span id='player_score_text' class='label label-default' >Player: <span id='player_score_value'>0</span></span></h1>
			</div>
			<div class='col-sm-4 center-text'>
				<h1><span id='player_ia_text' class='label label-default'>Stupid AI: <span id='player_ia_value'>0</span></span></h1>
			</div>
			<div class='col-sm-4 center-text'>
				<h1><span id='match_text' class='label label-default'>Match #<span id='match_value'>0</span></span></h1>
			</div>			
		</div>

		<!-- Center -->
		<div id='center' class='center-container'>
			<div id='tris_grid_container' class='grid_container'>
				<div id='tris_grid' class='tris_grid'>
					<div id='tr-1' class='tris_row'>
						<div id='td-1-1' class='grid-box'><span id='1-1'></span></div>
						<div id='td-1-2' class='grid-box'><span id='1-2'></span></div>
						<div id='td-1-3' class='grid-box'><span id='1-3'></span></div>
					</div>
					<div id='tr-2' class='tris_row'>
						<div id='td-2-1' class='grid-box'><span id='2-1'></span></div>
						<div id='td-2-2' class='grid-box'><span id='2-2'></span></div>
						<div id='td-2-3' class='grid-box'><span id='2-3'></span></div>
					</div>
					<div id='tr-3' class='tris_row'>
						<div id='td-3-1' class='grid-box'><span id='3-1'></span></div>
						<div id='td-3-2' class='grid-box'><span id='3-2'></span></div>
						<div id='td-3-3' class='grid-box'><span id='3-3'></span></div>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<div id='footer' class='row footer'>
			<div id='left_tools' class='center-text col-sm-4'>
				<h2><button id='restart_button' type="button" class="restart_button btn btn-warning btn-lg">RESTART</button></h2>
			</div>
			<div id='center_tools' class='center-text col-sm-4'>
				<h2><span id='msg_box' class='label label-default msg_box'>Play!</span></h2>
			</div>
			<div id='right_tools' class='center-text col-sm-4'>
				<h2><button id='reset_button' type="button" class="btn btn-danger btn-lg">RESET AI</button></h2>
			</div>
		</div>

	</div>
</body>

</html>
