const Log = (message: any) => {
	const now = new Date();
	console.log(`[${now.toLocaleString("en")}]: ${message}`);
};

export { Log };
