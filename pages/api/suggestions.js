export default async function handler(req, res) {
	let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.input}&types=(cities)&components=country:ca&key=AIzaSyCtzvZGwDwnalo9B1Ah4U67v-PORnoI7aQ`;
	let results = await fetch(url);
	let data = await results.json();
	res.status(200).json(data);
}
