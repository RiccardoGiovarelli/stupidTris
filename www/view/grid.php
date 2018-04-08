<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="en" ><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" ><!--<![endif]-->
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="../lib/font-awesome-4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<title>Indice</title>
</head>
<body>

	<div id='main_container' class='container'>

		<!-- JS Import -->
		<script src="./js-dist/bundle.js"></script>

		<!-- Title -->
		<div class='jumbotron'>
			<div class='container'>
				<h1 class='center-text'>Stupid Tris</h1>
			</div>
		</div>

		<!-- Top Bar -->
		<div id='top_bar' class='row top_bar'>
			<h1>
				<div class='col-sm-4 center-text'>
					<span id='player_score_text' class='label label-default' >Player: <span id='player_score_value'>0</span></span>
				</div>
				<div class='col-sm-4 center-text'>
					<span id='player_ia_text' class='label label-default'>Stupid AI: <span id='player_ia_value'>0</span></span>
				</div>
				<div class='col-sm-4 center-text'>
					<span id='match_text' class='label label-default'>Match #<span id='match_value'>0</span></span>
				</div>
			</h1>				
		</div>

		<!-- Center -->
		<div id='center' class='row center'>
			<h1>
				<table id='tris_grid' class='table'>
					<tr>
						<td id='td-1-1'><span id='1-1'>0</span></td>
						<td id='td-1-2'><span id='1-2'>0</span></td>
						<td id='td-1-3'><span id='1-3'>0</span></td>
					</tr>
					<tr>
						<td id='td-2-1'><span id='2-1'>0</span></td>
						<td id='td-2-2'><span id='2-2'>0</span></td>
						<td id='td-2-3'><span id='2-3'>0</span></td>
					</tr>
					<tr>
						<td id='td-3-1'><span id='3-1'>0</span></td>
						<td id='td-3-2'><span id='3-2'>0</span></td>
						<td id='td-3-3'><span id='3-3'>0</span></td>
					</tr>
				</table>
			</h1>
		</div>

		<!-- Footer -->
		<div id='footer' class='row footer'>
			<h2>
				<div id='left_tools' class='center-text col-sm-3'>
					<span id='restart_button' class='restart_button btn btn-lg btn-warning' onclick="myTris.restartMatch()">RESTART</span>
				</div>
				<div id='center_tools' class='center-text col-sm-3'>
					<span id='msg_box' class='label label-default msg_box'></span>
				</div>
				<div id='right_tools' class='center-text col-sm-6'>
					<span id='reset_button' class='btn btn-lg btn-danger' onclick="myTris.resetAI()">RESET AI</span>
				</div>
			</h2>
		</div>

	</div>

</body>

</html>
