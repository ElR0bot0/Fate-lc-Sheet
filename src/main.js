import { fateSpellcastingProgression } from './patches/fateSpellcastingProgression.js';
import { restChanges } from './patches/restChanges.js';
export const NAMESPACE = "fate-lc-sheet";
CONFIG.debug.hooks = !CONFIG.debug.hooks;
if (CONFIG.debug.hooks)
	console.log("NOW LISTENING TO ALL HOOK CALLS!");
else
	console.log("HOOK LISTENING DISABLED.");
;

Hooks.once("init", () => {
	fateSpellcastingProgression();
});

Hooks.on("renderActorSheet5e", (app, html, data) => {
	restChanges(html);
});
  