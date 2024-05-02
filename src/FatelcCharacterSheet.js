// @ts-ignore
export class FateLC_Sheet extends dnd5e.applications.actor.ActorSheet5eCharacter2 {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["fate-lc-sheet", "dnd5e", "sheet", "actor", "character"],
		});
	}
	async getData() {
		const context = await super.getData();
		this.canvas = canvas;
		this.tokenMovement = beaversSystemInterface.tokenMovementCreate(this.actor.uuid);
		return context;
	}

}
