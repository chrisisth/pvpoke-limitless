<?php

$META_TITLE = 'Team Builder';

$META_DESCRIPTION = 'Build and optimize your Pokemon GO PvP team with intelligent composition analysis. Get alternative suggestions ranked by threat coverage, bulk, type synergy, and meta relevance—not just matchup performance. Advanced algorithms prevent glass cannon recommendations and ensure competitive team building.';

$CANONICAL = '/team-builder/';

require_once 'header.php';

?>

<h1>Team Builder</h1>

<div class="section league-select-container team-content white">
	<p>Build and optimize your team for Pokemon GO Trainer Battles. The Team Builder analyzes your Pokemon's matchups against the top 30 meta threats and provides intelligent alternative suggestions based on comprehensive team composition analysis. Enable <strong>Advanced Team Synergy</strong> to get recommendations that balance threat coverage, bulk, type synergy, and meta relevance—ensuring you get competitive alternatives instead of just high-scoring glass cannons.</p>
	<?php require 'modules/formatselect.php'; ?>

	<a class="toggle" href="#">Advanced <span class="arrow-down">&#9660;</span><span class="arrow-up">&#9650;</span></a>
	<div class="toggle-content team-advanced">
		<h3 class="section-title">Options</h3>
		<div class="flex poke">
			<div class="team-option">
				<h3>Max Team Size</h3>
				<select class="team-size-select">
					<option value="3" selected>3</option>
					<option value="6">6</option>
					<option value="8">8</option>
				</select>
			</div>
			<div class="team-option">
				<h3 class="help" title="Number of threats displayed in the table header. Alternative calculations always use top 30 threats for consistency.">Counter Team Size</h3>
				<select class="counter-team-size-select">
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6" selected>6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
					<option value="12">12</option>
					<option value="15">15</option>
					<option value="20">20</option>
					<option value="25">25</option>
					<option value="30">30</option>
				</select>
			</div>
			<div class="team-option">
				<h3>Scorecard Length</h3>
				<select class="scorecard-length-select">
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
					<option value="40">40</option>
					<option value="60">60</option>
					<option value="80">80</option>
					<option value="100">100</option>
					<option value="200">200</option>
					<option value="300">300</option>
					<option value="400">400</option>
					<option value="500">500</option>
					<option value="500">600</option>
					<option value="500">700</option>
					<option value="500">800</option>
					<option value="500">900</option>
					<option value="500" selected>1000</option>
				</select>
			</div>
			<div>
				<h3>Alternatives Length</h3>
				<select class="alternatives-length-select">
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
					<option value="40">40</option>
					<option value="60">60</option>
					<option value="80">80</option>
					<option value="100" selected>100</option>
					<option value="200">200</option>
					<option value="300">300</option>
					<option value="400">400</option>
					<option value="500">500</option>
					<option value="500">600</option>
					<option value="500">700</option>
					<option value="500">800</option>
					<option value="500">900</option>
					<option value="500">1000</option>
				</select>
			</div>
			<div class="team-option">
				<h3>Shadow Pokemon</h3>
				<div class="check on allow-shadows"><span></span>Show Shadow Pokemon in results</div>
			</div>
			<div class="team-option">
				<h3>Prioritize Meta</h3>
				<div class="check on prioritize-meta"><span></span>Prioritize meta threats and alternatives</div>
			</div>
			<div class="team-option">
				<h3>Recommend XL Pokemon</h3>
				<div class="check allow-xl <?php if($_SETTINGS->xls): echo "on"; endif; ?>"><span></span>Show Pokemon above level 40 in threats and alternatives</div>
			</div>
			<div class="team-option">
				<h3>Allow Same Species</h3>
				<div class="check same-species"><span></span>Allow team to use multiple of the same species</div>
			</div>
			<div class="flex-break"></div>
			<div class="team-option">
				<h3>Shields</h3>
				<select class="shield-select">
					<option value="average" selected>Average (0 & 1)</option>
					<option value="0">No shields</option>
					<option value="1">1 shield</option>
					<option value="2">2 shields</option>
					<option value="all">all</option>
				</select>
			</div>
			<div class="team-option">
				<h3>Shield Baiting</h3>
				<div class="check shield-baiting on"><span></span>Bait shields with low-energy moves</div>
			</div>
		</div>
		
		<!-- Enhanced Ranking Algorithm Settings -->
		<div class="enhanced-ranking-section">
			<h3 class="section-title">Team Composition Analysis Weights <span class="info-tooltip" title="Controls how alternatives are scored when Advanced Team Synergy is enabled. All alternatives are evaluated against the same top 30 meta threats for consistency.">ⓘ</span></h3>
			<p>When <strong>Advanced Team Synergy</strong> is enabled, alternatives are ranked by overall team composition quality. The algorithm evaluates each Pokemon against the <strong>top 30 meta threats</strong> (regardless of Counter Team Size display setting) and scores them on threat coverage, bulk contribution, type synergy, and meta relevance. This prevents recommending glass cannons or Pokemon with poor threat coverage.</p>
			
			<div class="flex poke">
				<div class="weight-option">
				<label title="Win rate in simulated 1v1 battles against top 30 meta threats. 60%+ = excellent coverage, 55-59% = good, 52-54% = marginal, <52% = poor (heavily penalized). This is the primary factor—set to 50% weight.">Threat Coverage <span class="info-tooltip">ⓘ</span></label>
				<input type="range" class="ranking-weight" data-factor="threatCoverage" min="0" max="100" value="50" />
				<span class="weight-value">50%</span>
				<span class="weight-description">Most important: Win rate vs top 30 meta threats</span>
				</div>
				<div class="weight-option">
				<label title="Change in team's Defense × HP stat product. Prevents recommending glass cannons that ruin your team's survivability. Great League target: 22,000 | Ultra League: 35,000. Positive bulk = better shield pressure and endurance.">Bulk Improvement <span class="info-tooltip">ⓘ</span></label>
				<input type="range" class="ranking-weight" data-factor="bulkImprovement" min="0" max="100" value="25" />
				<span class="weight-value">25%</span>
				<span class="weight-description">Defense × HP improvement (prevents fragile teams)</span>
				</div>
				<div class="weight-option">
				<label title="Fast move effectiveness: EPT (Energy Per Turn) ≥3.5 ideal, DPT (Damage Per Turn) ≥3.0 ideal. Good fast moves generate energy efficiently while dealing respectable damage. Low values force excessive charge move reliance.">EPT/DPT Balance <span class="info-tooltip">ⓘ</span></label>
				<input type="range" class="ranking-weight" data-factor="eptDptBalance" min="0" max="100" value="5" />
				<span class="weight-value">5%</span>
				<span class="weight-description">Fast move quality check (energy & damage)</span>
				</div>
			</div>
			
			<div class="flex poke">
				<div class="weight-option">
				<label title="Bonus for Pokemon that fill missing team roles (Lead/Safe Swap/Closer). KEEP THIS LOW (5%)! High role weight can recommend poor performers just because they fill a role. Performance should matter more than role completion.">Role Completion <span class="info-tooltip">ⓘ</span></label>
				<input type="range" class="ranking-weight" data-factor="roleCompletion" min="0" max="100" value="5" />
				<span class="weight-value">5%</span>
				<span class="weight-description">Keep low! Avoids recommending bad Pokemon just for role</span>
				</div>
				<div class="weight-option">
				<label title="Type synergy and defensive weakness analysis. Penalizes fragile types (Ice: -30pts, Grass: -25pts, Bug/Rock: -20pts, Psychic: -15pts) and shared weaknesses to Fighting/Fire/Rock/Steel. Rewards balanced type coverage.">Type Coverage <span class="info-tooltip">ⓘ</span></label>
				<input type="range" class="ranking-weight" data-factor="typeCoverage" min="0" max="100" value="10" />
				<span class="weight-value">10%</span>
				<span class="weight-description">Penalizes fragile types & stacked weaknesses</span>
				</div>
				<div class="weight-option">
				<label title="Rankings-based multiplier. Top 10: ×1.5 bonus, Top 25: ×1.3, Top 50: ×1.15, Top 100: ×1.05. Also +0.3 for meta group Pokemon and +0.1 for Shadow variants. Helps distinguish proven meta picks from theory picks.">Meta Relevance <span class="info-tooltip">ⓘ</span></label>
				<input type="range" class="ranking-weight" data-factor="metaRelevance" min="0" max="100" value="5" />
				<span class="weight-value">5%</span>
				<span class="weight-description">Bonus for highly-ranked Pokemon (proven performers)</span>
				</div>
			</div>
			
			<div class="flex poke">
				<div class="enhanced-option">
				<h3 title="Analyzes stats to identify optimal role: Lead (high consistency/bulk), Safe Swap (counters common threats), or Closer (high attack/closing power). Displayed as colored badge on each Pokemon.">Role Detection <span class="info-tooltip">ⓘ</span></h3>
				<div class="check role-detection on"><span></span>Auto-detect Pokemon roles (Lead/Safe Swap/Closer)</div>
				</div>
				<div class="enhanced-option">
				<h3 title="Shows (Attack × Defense × HP) stat product with efficiency grade. A = 110%+, B = 95-110%, C = 80-95%, D = 65-80%, F = <65%. Higher stat product = better bulk and survivability at this CP cap.">Stat Product Display <span class="info-tooltip">ⓘ</span></h3>
				<div class="check stat-product-display on"><span></span>Show stat product efficiency grades (A/B/C/D/F)</div>
				</div>
				<div class="enhanced-option">
				<h3 title="RECOMMENDED: Enables composition-based ranking that evaluates threat coverage, bulk, type synergy, and meta relevance. Prevents glass cannon recommendations. DISABLE for old algorithm (matchup-only ranking).">Advanced Team Synergy <span class="info-tooltip">ⓘ</span></h3>
				<div class="check advanced-synergy on"><span></span>Composition-based ranking (RECOMMENDED)</div>
				</div>
			</div>
			
			<div class="flex poke">
				<div class="enhanced-option">
					<button class="button reset-enhanced" title="Reset all weights and options to recommended defaults">Reset Enhanced Settings</button>
				</div>
			</div>
		</div>
		
		<!-- Shield Weight Configuration -->
		<div class="shield-weights-section" style="display:none;">
			<h3 class="section-title">Shield Scenario Weights <span class="info-tooltip" title="These weights determine how much each shield scenario influences the overall rating in 'all' mode. Higher weights = more important.">ⓘ</span></h3>
			<p>Configure the importance of each shield scenario when using "all shields" mode. Higher values = more weight in the final rating.</p>
			
			<h4>Equal Shield Scenarios</h4>
			<div class="flex poke">
				<div class="weight-option">
					<label>1v1 Shields</label>
					<input type="number" class="shield-weight" data-scenario="1-1" value="6" min="0" max="10" />
					<span class="weight-description">Most common scenario</span>
				</div>
				<div class="weight-option">
					<label>0v0 Shields</label>
					<input type="number" class="shield-weight" data-scenario="0-0" value="4" min="0" max="10" />
					<span class="weight-description">Common early/farm situations</span>
				</div>
				<div class="weight-option">
					<label>2v2 Shields</label>
					<input type="number" class="shield-weight" data-scenario="2-2" value="2" min="0" max="10" />
					<span class="weight-description">Less common, both shielding</span>
				</div>
			</div>
			
			<h4>Shield Advantage Scenarios (You have more shields)</h4>
			<div class="flex poke">
				<div class="weight-option">
					<label>1v0 Shields</label>
					<input type="number" class="shield-weight" data-scenario="1-0" value="3" min="0" max="10" />
					<span class="weight-description">You have 1, opponent has 0</span>
				</div>
				<div class="weight-option">
					<label>2v1 Shields</label>
					<input type="number" class="shield-weight" data-scenario="2-1" value="3" min="0" max="10" />
					<span class="weight-description">You have 2, opponent has 1</span>
				</div>
				<div class="weight-option">
					<label>2v0 Shields</label>
					<input type="number" class="shield-weight" data-scenario="2-0" value="1" min="0" max="10" />
					<span class="weight-description">You have 2, opponent has 0 (rare)</span>
				</div>
			</div>
			
			<h4>Shield Disadvantage Scenarios (You have fewer shields)</h4>
			<div class="flex poke">
				<div class="weight-option">
					<label>0v1 Shields</label>
					<input type="number" class="shield-weight" data-scenario="0-1" value="3" min="0" max="10" />
					<span class="weight-description">You have 0, opponent has 1</span>
				</div>
				<div class="weight-option">
					<label>1v2 Shields</label>
					<input type="number" class="shield-weight" data-scenario="1-2" value="3" min="0" max="10" />
					<span class="weight-description">You have 1, opponent has 2</span>
				</div>
				<div class="weight-option">
					<label>0v2 Shields</label>
					<input type="number" class="shield-weight" data-scenario="0-2" value="1" min="0" max="10" />
					<span class="weight-description">You have 0, opponent has 2 (rare)</span>
				</div>
			</div>
			
			<div class="flex poke">
				<div class="weight-option">
					<button class="button reset-weights">Reset to Defaults</button>
				</div>
			</div>
		</div>
		
		<p>Note that links will not currently preserve these advanced settings.</p>
		<div class="flex">
			<div class="flex-section">
				<h3 class="section-title">Custom Threats</h3>
				<p>Enter a custom group of Pokemon to evaluate threats. These Pokemon will also make up the meta scorecard.</p>
				<div class="team-build custom-threats">
					<?php require 'modules/pokemultiselect.php'; ?>
				</div>
			</div>
			<div class="flex-section">
				<h3 class="section-title">Custom Alternatives</h3>
				<p>Enter a custom group of Pokemon to evaluate alternatives. These will appear as suggestions for your team.</p>
				<div class="team-build custom-alternatives">
					<?php require 'modules/pokemultiselect.php'; ?>
				</div>
			</div>
			<div class="flex-section">
				<h3 class="section-title">Exclude Threats</h3>
				<p>Exclude these Pokemon from the list of threats.</p>
				<div class="team-build exclude-threats">
					<?php require 'modules/pokemultiselect.php'; ?>
				</div>
			</div>
			<div class="flex-section">
				<h3 class="section-title">Exclude Alternatives</h3>
				<p>Exclude these Pokemon from your suggested alternatives.</p>
				<div class="team-build exclude-alternatives">
					<?php require 'modules/pokemultiselect.php'; ?>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="section team-build team poke-select-container">
	<?php require 'modules/pokemultiselect.php'; ?>
</div>

<button class="rate-btn button">
	<span class="btn-content-wrap">
		<span class="btn-icon btn-icon-team"></span>
		<span class="btn-label">Rate Team</span>
	</span>
</button>

<div class="section white error">Please select one or more Pokemon.</div>


<div class="section typings white">
	<a href="#" class="toggle active">Overview <span class="arrow-down">&#9660;</span><span class="arrow-up">&#9650;</span></a>
	<div class="toggle-content article">
		<p>Below is a high-level evaluation of your team based on matchups against top meta threats, stat products, type synergy, and overall consistency. Use this as a guideline for adjustments—some specialized strategies may score lower but still be effective.</p>
		<div class="overview-section coverage">
			<div class="flex">
				<h3>Coverage</h3>
				<div class="grade"></div>
			</div>
			<div class="notes">
				<div grade="A">This team has excellent coverage against top meta threats. Strong matchup spread with few vulnerabilities.</div>
				<div grade="B">This team covers most top meta threats well. May have 1-2 notable weaknesses to monitor.</div>
				<div grade="C">This team has coverage gaps and may struggle against certain meta Pokemon. Consider alternatives that counter your weak matchups.</div>
				<div grade="D">This team is vulnerable to several meta threats. Review the Potential Threats section and consider Pokemon with better coverage.</div>
				<div grade="F">This team has critical coverage problems against multiple top threats. Strongly consider meta alternatives with proven threat coverage (55%+ recommended).</div>
			</div>
		</div>
		<div class="overview-section bulk">
			<div class="flex">
				<h3>Bulk</h3>
				<div class="grade"></div>
			</div>
			<div class="notes">
				<div grade="A">This team has excellent bulk (Defense × HP stat products). Strong survivability and shield economy.</div>
				<div grade="B">This team has good bulk overall. Most Pokemon can absorb damage well—manage shields carefully for frailer teammates.</div>
				<div grade="C">This team has moderate bulk. Shield wisely to protect frailer Pokemon. Consider a bulkier alternative if shield pressure becomes problematic.</div>
				<div grade="D">This team has low bulk. You'll need to shield frequently to survive. Consider bulkier Pokemon (higher stat products) to reduce shield dependency.</div>
				<div grade="F">This team is extremely fragile. Glass cannons may win matchups but struggle with shield pressure and inconsistent performance. Use Pokemon with stat product grades B or higher.</div>
			</div>
		</div>
		<div class="overview-section safety">
			<div class="flex">
				<h3>Safety</h3>
				<div class="grade"></div>
			</div>
			<div class="notes">
				<div grade="A">This team has extremely safe matchups. It's flexible and can easily pivot to regain advantage.</div>
				<div grade="B">This team has mostly safe matchups. It can work back from lost leads and has options to escape disadvantageous scenarios.</div>
				<div grade="C">This team has only somewhat safe matchups. It may have limited safe switch options or struggle without switch advantage. Consider alternatives with good bulk or coverage to provide more flexibility. Otherwise, be prepared to spend shields to line up your Pokemon in the right matchups.</div>
				<div grade="D">This team has generally unsafe matchups. It may rely on winning the lead and maintaining switch advantage. Consider safer alternatives with broader coverage.</div>
				<div grade="F">This team has very unsafe matchups. It relies heavily on winning the lead and lining up perfect counters. Consider more flexible alternatives to make your matchups safer.</div>
			</div>
		</div>
		<div class="overview-section consistency">
			<div class="flex">
				<h3>Consistency</h3>
				<div class="grade"></div>
			</div>
			<div class="notes">
				<div grade="A">This team has extremely consistent movesets. It will have dependable damage output.</div>
				<div grade="B">This team has mostly consistent movesets. It won't depend on baits often.</div>
				<div grade="C">This team has movesets with mixed consistency. You might depend on baits every now and then.</div>
				<div grade="D">This team has movesets with low consistency. You'll depend on baits or stat boosts often. Consider alternatives with more consistent Fast or Charged Move damage.</div>
				<div grade="F">This team has many movesets with poor consistency. You'll be highly dependent on landing baits or triggering stat boosts. Consider alternatives that have more dependable movesets.</div>
			</div>
		</div>
	</div>
	<a href="#" class="toggle active">Meta Scorecard <span class="arrow-down">&#9660;</span><span class="arrow-up">&#9650;</span></a>
	<div class="toggle-content article">
		<p>Explore how the top ranked Pokemon match up against your team below. Print this scorecard or save a screenshot for reference as you practice. Remember to prepare beforehand and follow timely play in tournaments!</p>
		<div class="table-container">
			<table class="meta-table rating-table" cellspacing="0">
			</table>
		</div>
		<div class="results-buttons">
			<a href="#" class="button print-scorecard">Print</a>
			<a href="#" class="button download-csv">Export All Matchups to CSV</a>
		</div>

		<table class="rating-table legend" cellspacing="0">
			<tbody>
				<tr>
					<td><a href="#" class="rating win" target="_blank"><span></span></a></td>
					<td><b>Win:</b> This Pokemon wins decisively in most scenarios. It would take a big HP or energy difference to flip this matchup. This Pokemon can usually safely switch and win.</td>
				</tr>
				<tr>
					<td><a href="#" class="rating close-win" target="_blank"><span></span></a></td>
					<td><b>Close Win:</b> This Pokemon is favored, but the matchup can flip depending on HP, energy, baits, or IV's. This Pokemon may not be able to safely switch and win.</td>
				</tr>
				<tr>
					<td><a href="#" class="rating tie" target="_blank"><span></span></a></td>
					<td><b>Tie:</b> Neither Pokemon is favored. This matchup can flip depending on HP, energy, baits, IV's or, Charged Move priority.</td>
				</tr>
				<tr>
					<td><a href="#" class="rating close-loss" target="_blank"><span></span></a></td>
					<td><b>Close Loss:</b> This Pokemon is usually at a disadvantage, but the matchup can flip depending on HP, energy, baits, or IV's.</td>
				</tr>
				<tr>
					<td><a href="#" class="rating loss" target="_blank"><span></span></a></td>
					<td><b>Loss:</b> This Pokemon loses decisively in most scenarios. It would take a big HP or energy difference to flip this matchup.</td>
				</tr>
			</tbody>
		</table>
	</div>

	<a href="#" class="toggle active">Potential Threats <span class="arrow-down">&#9660;</span><span class="arrow-up">&#9650;</span></a>
	<div class="toggle-content article">
		<p>The Pokemon below have the strongest matchups against your team. Threat calculations use 0 and 1 shield scenarios and factor in each Pokemon's meta relevance, overall strength, and consistency against your team.</p>
		<div class="table-container">
			<table class="threats-table rating-table" cellspacing="0">
			</table>
		</div>
		<p class="center">This team has a threat score of <b class="threat-score"></b></p>
		<p class="small"><strong>Threat score</strong> measures overall team vulnerability. Lower = better. Factors: number of Pokemon threatened, severity of threats, threat rankings (encounter likelihood), and performance consistency. Use this to identify which meta Pokemon pose the biggest problems.</p>
	</div>

	<a href="#" class="toggle active">Potential Alternatives <span class="arrow-down">&#9660;</span><span class="arrow-up">&#9650;</span></a>
	<div class="toggle-content article">
		<p><strong>With Advanced Team Synergy enabled:</strong> Alternatives are evaluated against the <strong>top 30 meta threats</strong> and scored on threat coverage (50%), bulk contribution (25%), type synergy (10%), role coverage (5%), EPT/DPT balance (5%), and meta relevance (5%). Each shows which Pokemon it replaces and composition changes. This prevents glass cannon recommendations and ensures competitive alternatives.</p>
		<p><strong>With Advanced Team Synergy disabled:</strong> Alternatives are ranked purely by matchup performance against your identified threats using 0 and 1 shield simulations. This is the legacy algorithm.</p>

		<div class="poke-search-container">
			<input class="poke-search" context="alternative-search" type="text" placeholder="Search Pokemon" />
			<a href="#" class="search-info">i</a>
			<a href="#" class="search-traits" title="Search Traits">+</a>
		</div>

		<div class="table-container">
			<table class="alternatives-table rating-table" cellspacing="0">
			</table>
		</div>
	</div>

	<a href="#" class="toggle active">Battle Histograms <span class="arrow-down">&#9660;</span><span class="arrow-up">&#9650;</span></a>
	<div class="toggle-content">
		<p>The charts below show how many good or bad matchups each Pokemon has among all matchups possible. A Battle Rating below 500 is a loss, and a Battle Rating above 500 is a win. You can compare previous results to examine different Pokemon, movesets, or stats.</p>
		<div class="histograms">
			<div class="histogram"></div>
			<div class="histogram"></div>
			<div class="histogram"></div>
			<div class="histogram"></div>
			<div class="histogram"></div>
			<div class="histogram"></div>
		</div>
	</div>

	<a href="#" class="toggle active">Defensive Typing <span class="arrow-down">&#9660;</span><span class="arrow-up">&#9650;</span></a>
	<div class="toggle-content">
		<div class="summary defense-summary"></div>
		<div class="defense"></div>
	</div>

	<a href="#" class="toggle active">Offensive Typing <span class="arrow-down">&#9660;</span><span class="arrow-up">&#9650;</span></a>
	<div class="toggle-content">
		<div class="summary offense-summary"></div>
		<div class="offense"></div>
	</div>

	<div class="share-link-container">
		<p>Share this team:</p>
		<div class="share-link">
			<input type="text" value="" readonly>
			<div class="copy">Copy</div>
		</div>
	</div>
</div>

<?php require_once 'modules/search-string-help.php'; ?>
<?php require_once 'modules/search-traits.php'; ?>

<?php require_once 'modules/scripts/battle-scripts.php'; ?>

<link rel="stylesheet" type="text/css" href="<?php echo $WEB_ROOT; ?>css/enhanced-ranking.css?v=<?php echo $SITE_VERSION; ?>">

<script src="<?php echo $WEB_ROOT; ?>js/GameMaster.js?v=<?php echo $SITE_VERSION; ?>"></script>
<script src="<?php echo $WEB_ROOT; ?>js/pokemon/Pokemon.js?v=<?php echo $SITE_VERSION; ?>"></script>
<script src="<?php echo $WEB_ROOT; ?>js/battle/TeamCompositionAnalyzer.js?v=<?php echo $SITE_VERSION; ?>"></script>
<script src="<?php echo $WEB_ROOT; ?>js/interface/TeamInterface.js?v=<?php echo $SITE_VERSION; ?>"></script>
<script src="<?php echo $WEB_ROOT; ?>js/interface/PokeMultiSelect.js?v=<?php echo $SITE_VERSION; ?>"></script>
<script src="<?php echo $WEB_ROOT; ?>js/interface/Pokebox.js?=<?php echo $SITE_VERSION; ?>"></script>
<script src="<?php echo $WEB_ROOT; ?>js/interface/PokeSelect.js?v=<?php echo $SITE_VERSION; ?>"></script>
<script src="<?php echo $WEB_ROOT; ?>js/interface/BattleHistogram.js?v=<?php echo $SITE_VERSION; ?>"></script>
<script src="<?php echo $WEB_ROOT; ?>js/interface/ModalWindow.js?v=<?php echo $SITE_VERSION; ?>"></script>
<script src="<?php echo $WEB_ROOT; ?>js/interface/PokeSearch.js?v=<?php echo $SITE_VERSION; ?>"></script>
<script src="<?php echo $WEB_ROOT; ?>js/battle/rankers/TeamRanker.js?v=<?php echo $SITE_VERSION; ?>"></script>
<script src="<?php echo $WEB_ROOT; ?>js/Main.js?v=3"></script>

<?php require_once 'footer.php'; ?>
