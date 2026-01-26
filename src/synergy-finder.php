<?php

$cp = '1500';
$cup = 'all';
$pokemon = '';

if(isset($_GET['cp'])){
	$cp = htmlspecialchars($_GET['cp']);
}

if(isset($_GET['cup'])){
	$cup = htmlspecialchars($_GET['cup']);
}

if(isset($_GET['p'])){
	$pokemon = htmlspecialchars($_GET['p']);
}

$CANONICAL = '/synergy-finder/' . $cup . '/' . $cp . '/' . $pokemon . '/';

switch($cp){
	case "500":
		$league = 'Little Cup';
		break;

	case "1500":
		$league = 'Great League';
		break;

	case "2500":
		$league = 'Ultra League';
		break;

	case "10000":
		$league = 'Master League';
		break;

	case "10000-40":
		$league = 'Master League Classic';
		break;

	default:
		$league = '';
		break;
}

$META_TITLE = 'Synergy Finder - ' . $league . ' PvP';
$META_DESCRIPTION = 'Find the best synergy partners for any Pokemon in ' . $league . '. Analyze type coverage, resistances, and moveset compatibility to build the perfect PvP team.';

if($pokemon != ''){
	$name = ucwords(str_replace('_',' ', explode('-', $pokemon)[0]));
	$META_TITLE = 'Synergy Partners for ' . $name . ' - ' . $league;
	$META_DESCRIPTION = 'Discover the best team partners for ' . $name . ' in ' . $league . ' with detailed synergy analysis and moveset testing.';
}

require_once 'header.php';

?>

<h1>Synergy Finder</h1>

<div class="section league-select-container white">
	<div class="ranking-filters flex">
		<div class="ranking-filter">
			<h4>Format</h4>
			<?php require 'modules/formatselect.php'; ?>
		</div>
	</div>
</div>

<div class="section white synergy-finder-container">
	<h2>Find Synergy Partners</h2>
	<p>Select a Pokémon to find the best team partners with detailed synergy analysis and moveset compatibility testing.</p>
	
	<div class="synergy-input-container">
		<div class="poke-search-container">
			<input class="poke-search" context="synergy-search" type="text" placeholder="Search Pokemon..." autocomplete="off" />
			<a href="#" class="search-info" title="Search Help">?</a>
		</div>
	</div>
</div>

<div class="section white synergy-results-container hide">
	<div class="synergy-pokemon-info">
		<h2 class="synergy-pokemon-name"></h2>
		<p class="synergy-pokemon-description"></p>
	</div>

	<div class="synergy-analysis-info">
		<p>Analyzing synergies with different movesets... This may take a moment.</p>
		<div class="progress-bar">
			<div class="progress"></div>
		</div>
	</div>

	<div class="synergy-results-table hide">
		<div class="synergy-results-header">
			<div class="header-item rank">Rank</div>
			<div class="header-item pokemon-name">Partner Pokemon</div>
			<div class="header-item score">Synergy Score</div>
			<div class="header-item details-btn">Details</div>
		</div>
		<div class="synergy-results-list"></div>
	</div>
</div>

<div class="synergy-detail-modal hide">
	<div class="modal-content">
		<div class="modal-header">
			<h3 class="detail-pokemon-name"></h3>
			<a href="#" class="close-btn">×</a>
		</div>
		<div class="modal-body">
			<div class="synergy-breakdown">
				<div class="breakdown-section">
					<h4>Type Analysis</h4>
					<div class="type-analysis"></div>
				</div>

				<div class="breakdown-section">
					<h4>Synergy Scores</h4>
					<table class="scores-table">
						<tr>
							<td class="label">Weakness Coverage</td>
							<td class="value weakness-score">0%</td>
						</tr>
						<tr>
							<td class="label">Mutual Resistances</td>
							<td class="value resistance-score">0%</td>
						</tr>
						<tr>
							<td class="label">Coverage (Offensive)</td>
							<td class="value coverage-score">0%</td>
						</tr>
						<tr>
							<td class="label">Role Complement</td>
							<td class="value role-score">0%</td>
						</tr>
						<tr>
							<td class="label">Meta Robustness</td>
							<td class="value meta-score">0%</td>
						</tr>
						<tr class="total-row">
							<td class="label">Overall Synergy</td>
							<td class="value total-score">0%</td>
						</tr>
					</table>
				</div>

				<div class="breakdown-section">
					<h4>Tested Movesets</h4>
					<div class="movesets-tested"></div>
				</div>

				<div class="breakdown-section">
					<h4>Key Matchups</h4>
					<div class="key-matchups"></div>
				</div>

				<div class="breakdown-section">
					<h4>Team Suggestion</h4>
					<div class="team-suggestion"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<?php require_once 'modules/scripts/battle-scripts.php'; ?>

<script src="<?php echo $WEB_ROOT; ?>js/battle/SynergyAnalyzer.js?v=<?php echo $SITE_VERSION; ?>"></script>
<script src="<?php echo $WEB_ROOT; ?>js/interface/PokeSearch.js?v=<?php echo $SITE_VERSION; ?>"></script>
<script src="<?php echo $WEB_ROOT; ?>js/interface/SynergyFinderInterface.js?v=<?php echo $SITE_VERSION; ?>"></script>

<?php require_once 'footer.php'; ?>
