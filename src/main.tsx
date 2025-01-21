export let MODULE_ID = "fatelc";
export let log = (...msg: any[]) => console.warn(`${MODULE_ID} | `, ...msg);
export let warn = (...msg: any[]) => console.warn(`${MODULE_ID} | `, ...msg);
export let error = (...msg: any[]) => console.error(`${MODULE_ID} | `, ...msg);


Hooks.once("init", () => {
    CONFIG.DND5E.spellcastingTypes.eternalCrusader = {
      label: 'Eternal Crusader Magic :(',
      img: 'icons/consumables/potions/bottle-round-corked-orante-red.webp',
      shortRest: true,
    };
    CONFIG.DND5E.spellProgression.eternalCrusader = 'Eternal Crusader Magic';
    CONFIG.DND5E.spellPreparationModes.eternalCrusader = {
      label: 'Eternal Crusader Magic',
      upcast: true,
      order: 0.74,
      cantrips: true,
      prepares: true,
    };
    Hooks.on('dnd5e.computeEternalCrusaderProgression', computeProgression);
    Hooks.on('dnd5e.prepareEternalCrusaderSlots', prepareSlots);
  });
  
  function computeProgression(progression, actor, cls, spellcasting, count) {
    progression.eternalCrusader ??= 0;
    progression.eternalCrusader += spellcasting.levels;
  }
  
  function prepareSlots(spells, actor, progression) {
    const table = {
      1: { slots: 1, level: 1 },
      2: { slots: 2, level: 1 },
      3: { slots: 2, level: 2 },
      5: { slots: 3, level: 3 },
      7: { slots: 3, level: 4 },
      9: { slots: 4, level: 5 },
      13: { slots: 5, level: 5 },
      17: { slots: 6, level: 5 },
    };
  
    CONFIG.Actor.documentClass.prepareAltSlots(spells, actor, progression, 'eternalCrusader', table);
  }