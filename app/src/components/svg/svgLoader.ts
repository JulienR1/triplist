import type { SvgSource } from "./SvgSource";

type SvgListener = () => void;
type SvgData = { loading: boolean; data: string; listeners: SvgListener[] };
type SvgDictionnary = { [key in SvgSource]: SvgData };

const svgs: Partial<SvgDictionnary> = {};

/**
 * Loads once the svg and keeps in memory for future use.
 * @param src The url to the svg to be loaded. Stored in enums. @see SvgSource.ts
 * @returns The raw svg data loaded from the requested file.
 */
export const getSvg = (src: SvgSource): Promise<string> => {
	return new Promise(async (resolve, reject) => {
		const sendSvg = () => {
			if (!isLoading(src) && hasData(src)) {
				return resolve(svgs[src].data);
			}
			return reject("No data to send.");
		};

		if (hasData(src)) {
			return sendSvg();
		}

		if (isLoading(src)) {
			svgs[src].listeners.push(() => sendSvg());
			return;
		} else {
			try {
				svgs[src] = { loading: true, data: undefined, listeners: [] };

				const svgData = await loadNewSvg(src);
				svgs[src] = { ...svgs[src], loading: false, data: svgData };

				svgs[src].listeners.forEach((callback) => callback());
				return sendSvg();
			} catch (ex) {
				return reject(ex);
			}
		}
	});
};

const loadNewSvg = async (src: SvgSource) => {
	const svgDataResponse = await fetch(src);
	if (svgDataResponse.ok) {
		return svgDataResponse.text();
	}
	throw new Error(`Could not load the requested svg: '${src}'`);
};

const hasData = (src: SvgSource) => {
	return Boolean(svgs[src]?.data);
};

const isLoading = (src: SvgSource) => {
	return svgs[src]?.loading;
};
