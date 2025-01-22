export function fateSpellcastingProgression(){
    CONFIG.DND5E.spellcastingTypes.FateSpellcasting = {
        label: 'Fate Spellcasting',
        img: 'icons/consumables/potions/bottle-round-corked-orante-red.webp',
        shortRest: true,
      };
      CONFIG.DND5E.spellProgression.FateSpellcasting = 'Fate Spellcasting';
      CONFIG.DND5E.spellPreparationModes.FateSpellcasting = {
        label: 'Fate Spellcasting',
        upcast: true,
        order: 0.74,
        cantrips: true,
        prepares: true,
      };
      Hooks.on('dnd5e.computeFateSpellcastingProgression', computeProgression);
      Hooks.on('dnd5e.prepareFateSpellcastingSlots', prepareSlots);
}
function computeProgression(progression, actor, cls, spellcasting, count) {
    progression.FateSpellcasting ??= 0;
    progression.FateSpellcasting += spellcasting.levels;
  }
function prepareSlots(spells, actor, progression) {
	const table = {
	  1: { slots: 1, level: 1 },
	  2: { slots: 2, level: 1 },
	  3: { slots: 3, level: 1 },
	  4: { slots: 4, level: 1 },
	  5: { slots: 5, level: 1 },
	  6: { slots: 6, level: 1 },
	  7: { slots: 7, level: 1 },
	  8: { slots: 8, level: 1 },
      9: { slots: 9, level: 1 },
      10: { slots: 10, level: 1 },
      11: { slots: 11, level: 1 },
      12: { slots: 12, level: 1 },
      13: { slots: 13, level: 1 },
      14: { slots: 14, level: 1 },
      15: { slots: 15, level: 1 },
      16: { slots: 16, level: 1 },
      17: { slots: 17, level: 1 },
      18: { slots: 18, level: 1 },
      19: { slots: 19, level: 1 },
      20: { slots: 20, level: 1 },
	};
  
	CONFIG.Actor.documentClass.prepareAltSlots(spells, actor, progression, 'FateSpellcasting', table);
}