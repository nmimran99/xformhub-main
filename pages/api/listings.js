import dbConnect from "../../utils/dbConnect";
import Trainer from "../../models/trainer";

export default async function handler(req, res) {
	await dbConnect();

	console.log(buildFiltersQuery(req.query));
	let data = await Trainer.aggregate([
		{
			$match: buildFiltersQuery(req.query),
		},
		{
			$lookup: {
				from: "reviews",
				localField: "_id",
				foreignField: "trainer",
				as: "reviews",
			},
		},
		{
			$addFields: {
				avgRating: {
					$avg: {
						$map: {
							input: "$reviews",
							as: "reviews",
							in: "$$reviews.rating",
						},
					},
				},
			},
		},
	]);

	res.status(200).json(data);
}

const buildFiltersQuery = (filters) => {
	delete filters.page;
	let res = {};
	Object.entries(filters).forEach((f) => {
		let [name, value] = f;
		if (!value || value === "Any" || value == 0) return;
		if (name === "expertise") {
			res[name] = { $all: Array.isArray(value) ? value : [value] };
			return;
		}
		if (name === "budget") return;
		if (name === "location") {
			let [city, province] = value.split(",");
			res["city"] = city.trim();
			res["province"] = province.trim();
			return;
		}
		res[name] = value;
	});

	return res;
};
