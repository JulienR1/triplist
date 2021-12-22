export abstract class RouterHandler {
	constructor(private route: string) {}

	protected getRoute(): string {
		if (!this.route) {
			throw new Error("No endpoint has been specified for the specified route handler.");
		}
		return this.route;
	}
}
