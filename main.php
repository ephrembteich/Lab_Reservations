<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="shortcut icon" href="images/icon.jpg">
		<title>Bliss Labs Reservation System</title>
		<link rel="stylesheet" type="text/css" href="styles/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="styles/main.css">
		<script src="scripts/jquery-1.11.3.min.js"></script>
		<script src="scripts/bootstrap.min.js"></script>
		<script type="text/javascript" src="scripts/main.js"></script>
		<script type="text/javascript" src="scripts/cal.js"></script>
	</head>
	<body class="main">
		<div class="menu">
			<div class="title txtaligncenter colorwhite">
				Bliss Labs Reservation System
			</div>
			<div id="leftmenu" class="leftmenu">
				<div class="signout">
					<button class="btn btn-success" type="submit">Sign Out</button>
				</div>
				<div class="welcome">Hello, Ephrem Bteich!</div>
			</div>
		</div>
		
		<div class="schedule">
			<table id="schedtable">
				<thead>
					<tr id="weekdays">
						<th id="btnth">
							<button id="weekltbtn" class="mybtn colorwhite">Weekly view</button>
							<button id="monthlybtn" class="mybtn colorwhite">Monthly view</button>
						</th>
						<th>MON 01-12<span class="hidden"> (TODAY)</span></th>
						<th>TUE 01-13<span class="hidden"> (TODAY)</span></th>
						<th>WED 01-14<span class="hidden"> (TODAY)</span></th>
						<th>THU 01-15<span class="hidden"> (TODAY)</span></th>
						<th>Fri 01-16<span class="hidden"> (TODAY)</span></th>
						<th>Sat 01-17<span class="hidden"> (TODAY)</span></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<div class="tabletitle bold txtaligncenter">Reservations Calendar</div>
							<div id="calendar">
								<table id="caltable" class="width224" cellpadding="0" cellspacing="1">
									<tr class="defaultcursor height50">
										<td class="centerVH width32 height32 txtaligncenter">
											<a href="#" onClick="changedate('prevmo')">
												<img src="images/prev.png" width="32" height="32" alt="Prev Mo" title="Previous Month"/>
											</a>
										</td>
										<td id="inputmonthyear" class="celltitle centerVH width160 height32 bold txtaligncenter" colspan="5"></td>
										<td class="centerVH width32 height32">
											<a href="#" onClick="changedate('nextmo')">
												<img src="images/next.png" width="32" height="32" alt="Next Mo" title="Next Month" />
											</a>
										</td>
									</tr>
									<tr id="weekdayssmall" class="defaultcursor">
										<td class="daycolor2 centerVH width32 height32">Su</td>
										<td class="daycolor2 centerVH width32 height32">Mo</td>
										<td class="daycolor2 centerVH width32 height32">Tu</td>
										<td class="daycolor2 centerVH width32 height32">We</td>
										<td class="daycolor2 centerVH width32 height32">Th</td>
										<td class="daycolor2 centerVH width32 height32">Fr</td>
										<td class="daycolor2 centerVH width32 height32">Sa</td>
									</tr>
									<tr>
										<td id="showCurrentDate" class="height32 centerVH width224 bold pointer txtaligncenter" onClick="changedate('return')" colspan="7" nowrap >Show Current Date</td>
									</tr>
								</table>
							</div>
						</td>
						<td colspan="6">
							<div id="inject"></div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</body>
</html>