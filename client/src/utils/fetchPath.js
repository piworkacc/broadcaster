export const streamPath = '/api/streams'


export const urlForStream = (link) => {
	const URLparts = window.location.host.split(':');
	if (URLparts.length > 1) URLparts.pop();
	const home = URLparts.join(':');
	const urlParts = [];
	urlParts.push('ws://');
	urlParts.push(home);
	urlParts.push(':8000');
	urlParts.push(link)
	return urlParts.join('')
}
