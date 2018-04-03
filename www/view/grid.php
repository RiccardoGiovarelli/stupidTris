<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Indice</title>
<link rel="stylesheet" href="style/main.css">
<link rel="stylesheet" href="../lib/font-awesome-4.7.0/css/font-awesome.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>

	<!-- JS Import -->
	<script src="./js-dist/bundle.js"></script>

	<!-- Header -->
	<div id='header' class='header'>
		<div id='title_container' class='title_container'>
		<span class='title'>Stupid Tris</span>
		</div>
		<div id='info_bar' class='info_bar'>
			<span id='player_score_text'>Player: <span id='player_score_value'>0</span></span><span id='player_ia_text'>Stupid AI: <span id='player_ia_value'>0</span></span><span id='match_text'>Match #<span id='match_value'>0</span></span>
		</div>
	</div>

	<!-- Center -->
	<div id='center' class='center'>

		<div id='grid_container' class='grid_container'>

			<table id='tris_grid' class='tris_grid'>
				<tr>
					<td id='td-1-1'><span id='1-1'></span></td>
					<td id='td-1-2'><span id='1-2'></span></td>
					<td id='td-1-3'><span id='1-3'></span></td>
				</tr>
				<tr>
					<td id='td-2-1'><span id='2-1'></span></td>
					<td id='td-2-2'><span id='2-2'></span></td>
					<td id='td-2-3'><span id='2-3'></span></td>
				</tr>
				<tr>
					<td id='td-3-1'><span id='3-1'></span></td>
					<td id='td-3-2'><span id='3-2'></span></td>
					<td id='td-3-3'><span id='3-3'></span></td>
				</tr>
			</table>

		</div>

	</div>

	<!-- Footer -->
	<div id='footer' class='footer'>
		<div id='tools_container' class='tools_container'>
			<div id='left_tools' class='left_tools'>
				<span id='restart_button' class='restart_button' onclick="myTris.restartMatch()">RESTART</span>
				<span id='msg_box' class='msg_box'></span>
			</div>
			<div id='right_tools' class='right_tools'>
				<span id='reset_button' class='reset_button' onclick="myTris.resetAI()">RESET AI</span>
			</div>
		</div>
	</div>

</body>

</html>
