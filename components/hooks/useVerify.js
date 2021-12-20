import axios from "axios";
import { useEffect, useState } from "react";

export default (userId) => {
	const [isVerified, setIsVerified] = useState(false);
	const [user, setUser] = useState(null);
	const [verifying, setVerifying] = useState(true);

	useEffect(() => {
		handleVerify();
	}, []);

	const handleVerify = async () => {
		const res = await axios.get(`/api/users/verify?userId=${userId}`);
		if (res.status === 200) {
			setIsVerified(true);
			setUser(res.data);
			setVerifying(false);
			return;
		}
		setIsVerified(false);
		setVerifying(false);
	};

	return { isVerified, verifying, user };
};
