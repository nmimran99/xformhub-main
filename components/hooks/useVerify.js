import axios from "axios";
import { useEffect, useState } from "react";

export default (userId) => {
	const [isVerified, setIsVerified] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		handleVerify();
	}, []);

	const handleVerify = async () => {
		const res = await axios.get(`/api/users/verify?userId=${userId}`);
		if (res.status === 200) {
			setIsVerified(true);
			setUser(res.data);
			return;
		}
		setIsVerified(false);
	};

	return { isVerified, user };
};
