<?php
session_start();
require("soluMySQLConnect.php");
mysqli_report(MYSQLI_REPORT_ERROR);
$username = $_SESSION["username"];

// Get the type of solution that is being saved so that we know which table should be used.
$submission_type = $_POST['solution_type'];
$accountStatement = mysqli_prepare($dbc, "SELECT ID FROM accounts WHERE Username = ?");
if($accountStatement) {
	mysqli_stmt_bind_param($accountStatement, 's', $username);
	mysqli_stmt_execute($accountStatement);

	// Get the account id
	mysqli_stmt_bind_result($accountStatement, $accountId);
	mysqli_stmt_fetch($accountStatement);
	mysqli_stmt_close($accountStatement);

	$statement = null;
	if ($submission_type == 'single_solid' or $submission_type == 'single_liquid_grav' or $submission_type == 'single_liquid_vol') {
		$solventId = $_POST['solvent_formula'];
		$soluteId = $_POST['solute_formula'];
		$soluteWeight = $_POST['solute_molec_weight'];
		$solutionVol = $_POST['total_volume'];
		$solutionConc = $_POST['solution_concentration'];

		if ($submission_type == 'single_liquid_vol') {
			$soluteDensity = $_POST['density'];
			$volumeAdd = $_POST['volToAdd'];
			$statement = mysqli_prepare($dbc, "INSERT INTO single_solution_liquid_vol VALUES (DEFAULT, ?,?,?,?,?,?,?,?)");
			mysqli_stmt_bind_param($statement, 'issddddd', $accountId, $solventId, $soluteId, $soluteWeight, $soluteDensity, $solutionVol, $solutionConc, $volumeAdd);
		} else {
			$massToAdd = $_POST['massToAdd'];
			if ($submission_type == 'single_solid') {
				$table_name = 'single_solution_solid';
			} else {
				$table_name = 'single_solution_liquid_grav';
			}
			$statement = mysqli_prepare($dbc, "INSERT INTO {$table_name} VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?)");
			mysqli_stmt_bind_param($statement, 'issdddd', $accountId, $solventId, $soluteId, $soluteWeight, $solutionVol, $solutionConc, $massToAdd);
		}
	} elseif ($submission_type == 'serial') {
		$solventId = $_POST['solventChemID'];
		$soluteId = $_POST['soluteChemID'];
		$soluteWeight = $_POST['soluteMW'];
		$dilutionFlaskVolume = $_POST['flasksVolume'];
		$numberFlasks = $_POST['numDilutions'];
		$volumeTransferred = $_POST['volumeTransferred'];

		$statement = mysqli_prepare($dbc, "INSERT INTO serial_dilution VALUES (DEFAULT, ?,?,?,?,?,?,?)");
		mysqli_stmt_bind_param($statement, 'issddid', $accountId, $solventId, $soluteId, $soluteWeight, $dilutionFlaskVolume, $numberFlasks, $volumeTransferred);
	} elseif ($submission_type == 'calibration_internal') {
		// TODO: The internal calibration needs to be done
		$unkownName = $_POST['unknown'];
		$numberOfStandards = $_POST['num_standards'];
		$volumeStandards = $_POST['volume_standards'];
	} elseif ($submission_type == 'calibration_external' or $submission_type == 'calibration_addition') {
		$solventId = $_POST['solvent_formula'];
		$analyteId = $_POST['analyte_formula'];
		$analyteWeight = $_POST['analyte_molec_weight'];
		$unkownName = $_POST['unknown'];
		$numberOfStandards = $_POST['num_standards'];
		$flaskVolumes = $_POST['total_volume_standards'];

		if ($submission_type == 'calibration_external') {
			$table_name = 'calibration_external';
		} else {
			$table_name = 'calibration_addition';
		}

		$statement = mysqli_prepare($dbc, "INSERT INTO " . $table_name . " VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?)");
		mysqli_stmt_bind_param($statement, 'issddid', $accountId, $solventId, $analyteId, $analyteWeight, $unkownName, $numberFlasks, $flaskVolumes);
	} else {
		echo 'Error saving solution.';
		exit;
	}

	mysqli_stmt_execute($statement);

	if (mysqli_stmt_errno($statement)) {
		die('Error: ' . mysqli_stmt_error($statement));
	}

	echo 'Solution has been saved!';
}
else {
	echo 'Must be logged in.';
	exit;
}

mysqli_stmt_close($statement);
mysqli_close($dbc);

?>
