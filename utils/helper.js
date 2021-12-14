export const getAverageRating = (reviews) => {
	return parseFloat(
		reviews.reduce((t, r) => t + r.rating, 0) / reviews.length
	).toFixed(1);
};

export const getFullName = (data) => {
	return `${data.firstName} ${data.lastName}`;
};

export const getCity = (data) => {
	return `${data.city}, ${data.province}`;
};

export const getProvinceAbbr = (prov) => {
	switch (prov) {
		case "Ontario":
			return "ON";
		case "Newfoundland and Labrador":
			return "NL";
		case "Prince Edward Island":
			return "PE";
		case "Nova Scotia":
			return "NS";
		case "New Brunswick":
			return "NB";
		case "Quebec":
			return "QC";
		case "Manitoba":
			return "MB";
		case "Saskatchewan":
			return "SK";
		case "Alberta":
			return "AB";
		case "British Columbia":
			return "BC";
		case "Yukon":
			return "YT";
		case "Northwest Territories":
			return "NT";
		case "Nunavut":
			return "NU";
	}
};
