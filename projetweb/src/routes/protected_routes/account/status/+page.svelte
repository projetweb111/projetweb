<div id="back-button">
	<a id="return" href="/protected_routes/account/update">
		<button id="button1" class="button buttonPerso3 block primary"> &lt Retour</button>
	</a>
</div>

<div class="myTitle" style="background-color: var(--custom-color3)">
	<div class="myTitle-text">
		<h1 class="header">Demander un nouveau statut</h1>
	</div>
</div>
<div class="myBody">
	<div class="myBody-text">
		<h1>Remplir le formulaire pour obtenir un nouveau rôle</h1>
		<p style="font-style: italic">Cette fonctionnalité n'est pas encore disponible</p>
	</div>
</div>

<style>
	/* for return button */
	#back-button {
		z-index: 5;
		position: absolute;
		left: 12%;
		top: 30%;
		margin: 1rem;
		width: fit-content;
	}

	#return {
		text-decoration: none;
	}

	#button1 {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--custom-color1);
		background-color: var(--custom-color1);
		text-transform: none !important;
		transition: all 0.2s ease;
	}

	#button1:hover {
		background-color: #2a2a2a;
		border: 1px solid var(--custom-color1);
	}
</style>
