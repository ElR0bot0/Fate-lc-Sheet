export const NAMESPACE = "fate-lc-sheet";
CONFIG.debug.hooks = !CONFIG.debug.hooks;
if (CONFIG.debug.hooks)
	console.log("NOW LISTENING TO ALL HOOK CALLS!");
else
	console.log("HOOK LISTENING DISABLED.");
Hooks.on("ready", async function () {
	if (game.system.id === "dnd5e") {
		import('./FatelcCharacterSheet.js').then(({ FateLC_Sheet }) => {
			Actors.registerSheet("dnd5e", FateLC_Sheet, {
				types: ["character"],
				makeDefault: false,
			});
		});
	}
});

Hooks.once('init', () => {
	if (typeof Babele !== 'undefined') {
		Babele.get().register({
			module: 'fate-lc-sheet',
			lang: 'en',
			dir: 'compendium'
		});
	}
	Hooks.on("ready", () => {
		// Once the system is ready, add your custom conditions to CONFIG.DND5E.conditionTypes
		CONFIG.DND5E.conditionTypes.push(
			{
				key: "bloodied",
				label: "Bloodied",
				icon: "icons/Bloodied.svg"
			},
			{
				key: "slowed",
				label: "Slowed",
				icon: "icons/Slowed.svg"
			}
			// Add more custom conditions as needed
		);
	});
});



//Method to remove unused parts of the character sheet
Hooks.on("renderActorSheet5e", (app, [html], data) => {
	if (game.system.id === "dnd5e") {
		if (app.constructor.name === 'ActorSheet5eCharacter2') {
			const MenuCentral = html.querySelector('.app .window-content .tab-details .sheet-body .main-content .tab-body .details .left');
			if (MenuCentral !== null) {
				MenuCentral.remove();
			}
			const labels = html.querySelectorAll('.inventory .inventory-element .currency label');
			
			// Loop through each label and remove it if its text content is not "Platinum"
			for (const label of labels){
				const labelText = label.ariaLabel;
				console.log(`El label encontrado: ${labelText}`);
				if (labelText !== "Platinum") {
					if (label !== null) {
						label.remove();
					}
				}
			}
		}
	}
});

//Method that changes how ability scores show
Hooks.on("renderActorSheet5e", (app, [html], data) => {
	// Check if the rendered sheet is for a character and the system is D&D 5e
	if (game.system.id === "dnd5e") {
		if (app.constructor.name === 'ActorSheet5eCharacter2') {
			html.querySelector('.window-content .tab-details .ability-scores .rows .bottom .ability-score[data-ability="cha"]').remove();
			html.querySelector('.window-content .tab-details .sheet-body .main-content .tab-body .details .right .top .saves .none[data-ability="cha"]').remove();
			if (data && data.abilities) {
				console.log('found abilities to edit');
				for (const [ability, newData] of Object.entries(data.abilities)) {
					if (ability !== "cha") {
						if (app._mode === 2) {
							// Compare with the last known value of the ability
							let lastValue = -1000000;
							if (lastKnownAbilities[ability] !== null) {
								lastValue = lastKnownAbilities[ability];
							}

							console.log(`The last known ability is: ${lastKnownAbilities[ability]}`);
							console.log(`found ability to edit ${ability}`);
							const modifier = data.abilities[ability].mod; // Get the modifier

							const abilityElement = html.querySelector(`.window-content .tab-details .ability-scores .rows .bottom .ability-score[data-ability="${ability}"] .score .uninput`);
							console.log(`found element to edit ${abilityElement.value}`);
							if (abilityElement.value && abilityElement) {
								if (lastValue !== abilityElement.value) {
									// Update the displayed score  in the HTML
									console.log(`found abilityelement to edit ${abilityElement}`);
									abilityElement.value = modifier; // Update score
								}
							}
						} else {
							html.querySelector(`.window-content .tab-details .ability-scores .rows .bottom .ability-score[data-ability="${ability}"] .score`).remove();
							const element = html.querySelector(`.window-content .tab-details .ability-scores .rows .bottom .ability-score[data-ability="${ability}"] .mod`)
							element.classList.add('Higher');
						}
					}
				}
			}
		} else {
			html.querySelector('.editable .sheet-body .attributes .ability-scores [data-ability="cha"]').remove();
			if (data && data.abilities) {
				console.log('found abilities to edit');
				for (const [ability, newData] of Object.entries(data.abilities)) {
					if (ability !== "cha") {
						// Compare with the last known value of the ability
						let lastValue = -1000000;
						if (lastKnownAbilities[ability] !== null) {
							lastValue = lastKnownAbilities[ability];
						}

						console.log(`The last known ability is: ${lastKnownAbilities[ability]}`);
						console.log(`found ability to edit ${ability}`);
						const modifier = data.abilities[ability].mod; // Get the modifier
						const abilityElement = html.querySelector(`.editable .sheet-body .attributes .ability-scores [data-ability="${ability}"] .ability-score`);
						console.log(`found element to edit ${abilityElement.value}`);
						if (lastValue !== abilityElement.value) {
							// Update the displayed score  in the HTML
							abilityElement.value = modifier; // Update score
						}
					}
					
					
				}
			}
		}
		
	}
});


let lastKnownAbilities = {}; // Variable to store last known abilities
let lastactor = "";
//Method that recalculates the score on input so it makes it so the input is basically inputing the modifier
Hooks.on("updateActor", (actor, data, options, userId) => {
	// Check if the updated data includes changes to ability scores
	if ("system" in data && "abilities" in data.system) {
		let abilitiesData = data.system.abilities;

		// Iterate through each ability in the updated data
		for (let abilityKey in abilitiesData) {
			if (abilitiesData.hasOwnProperty(abilityKey)) {
				// Get the current ability object and its value
				let ability = abilitiesData[abilityKey];
				let newValue = ability.value;

				// Compare with the last known value of the ability
				let lastValue = lastKnownAbilities[abilityKey];
				console.log(`The last known ability is: ${lastKnownAbilities[abilityKey]}`);
				if (lastValue !== newValue || lastactor !== data._id) {//Checks if the value indeed is different than the last time because it also triggers this every time that it updates the ability and i also check for the id so it doesnt take this into account if its an edit on another actor
					// Modify the value of the ability however you want
					let modifiedValue = newValue * 2 + 10; // For example, increment by 1
					console.log(`The last known actor is: ${lastactor} and the new actor is: ${data._id}`);
					lastactor = data._id;
					// Update the ability value
					actor.update({ [`system.abilities.${abilityKey}.value`]: modifiedValue });

					// Update the last known value of the ability
					lastKnownAbilities[abilityKey] = modifiedValue;
				}
			}
		}
	}
});


