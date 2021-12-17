import Trainer from "../../../models/trainer";
import User from "../../../models/user";
import Review from "../../../models/review";
import Plan from "../../../models/plan";
import dbConnect from "../../../utils/dbConnect";
import GeneralDetails from "../../../components/explore/listings/GeneralDetails";
import Contact from "../../../components/explore/listings/Contact";
import MediaSection from "../../../components/explore/listings/MediaSection";
import Reviews from "../../../components/explore/listings/Reviews";
import Plans from "../../../components/explore/listings/Plans";
import LeadModal from "../../../components/explore/listings/LeadModal";
import { useEffect, useState } from "react";
import useSnackbar from "../../../components/hooks/useSnackbar";
import AddReviewModal from "../../../components/explore/listings/AddReviewModal";

const images = [
	"https://www.ihrsa.org/uploads/SEO-Images/_1200x630_crop_center-center_82_none/4-Reasons-to-Keep-Going-to-the-Gym-During-an-Outbreak-happy-people-equipment-SEO-image.jpg?mtime=1583958779",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSojThhAD78q7NY-HTW5PtKz3PQ9gIdmv9elKaSy3ZDKhfTyJTGpwW-g_ksSFJooWS3hsA&usqp=CAU",
	"https://img.etimg.com/thumb/msid-87956794,width-650,imgsize-64662,,resizemode-4,quality-100/health.jpg",
	"https://img2.thejournal.ie/article/3201022/river?version=3201352&width=1340",
	"https://static01.nyt.com/images/2017/01/03/well/move/03responder-exercise/03responder-exercise-superJumbo.jpg",
];

export default function Listing({ data }) {
	let { trainerData, reviews, plans } = data;
	const [leadModal, setLeadModal] = useState(false);
	const [reviewModal, setReviewModal] = useState(false);
	const [offer, setOffer] = useState(null);
	const { snackbar } = useSnackbar();

	useEffect(() => {
		if (!offer) return;
		setLeadModal(true);
	}, [offer]);

	useEffect(() => {
		document.querySelector("body").style.overflow =
			leadModal || reviewModal ? "hidden" : "auto";
	}, [leadModal, reviewModal]);

	const handleConnect = () => {
		setLeadModal(true);
	};

	const openAddReview = () => {
		setReviewModal(true);
	};

	const handleChooseOffer = (data) => (event) => {
		setOffer(data);
	};

	const handleClose = () => {
		setOffer(null);
		setLeadModal(false);
		setReviewModal(false);
	};

	return (
		<div
			className="text-white mt-16 w-full
			sm:w-11/12 sm:mx-auto
			md:w-full md:flex md:items-center md:flex-wrap
			xl:w-3/4
		"
		>
			<GeneralDetails data={trainerData} reviews={reviews} />
			<div
				className="w-screen h-16 fixed bottom-0 z-10
			sm:transform sm:translate-x-1/2 sm:right-1/2 
			md:hidden"
			>
				<Contact handleClick={handleConnect} />
			</div>
			<MediaSection
				data={images}
				introduction={trainerData.introduction}
				handleConnect={handleConnect}
			/>
			<Reviews
				data={reviews}
				firstName={trainerData.firstName}
				openAddReview={openAddReview}
			/>
			<Plans data={plans} handleChooseOffer={handleChooseOffer} />
			{leadModal && (
				<LeadModal
					handleClose={handleClose}
					trainer={trainerData}
					offer={offer}
				/>
			)}
			{reviewModal && (
				<AddReviewModal trainer={trainerData} handleClose={handleClose} />
			)}
			{snackbar.result && (
				<div className="h-16 w-full z-30 fixed bottom-0 left-0 bg-green-600 rounded-md border border-gray-300 text-center flex items-center justify-center text-sm">
					<img
						src="/icons/Done.svg"
						className="w-8 h-8 rounded-full bg-white bg-opacity-10 p-2 mr-3"
					/>
					<div className="">{snackbar.text}</div>
				</div>
			)}
		</div>
	);
}

export const getServerSideProps = async ({ params }) => {
	let listing = params.listing;

	await dbConnect();
	const trainerData = await Trainer.findOne({ _id: listing }).lean();
	const reviews = await Review.find({ trainer: listing })
		.populate({
			path: "user",
			select: "firstName lastName avatar",
		})
		.lean();
	const plans = await Plan.find({ trainer: listing }).sort("price").lean();

	const data = {
		trainerData: { ...trainerData, _id: trainerData._id.toString() },
		reviews: reviews.map((r) => ({
			_id: r._id.toString(),
			user: {
				...r.user,
				_id: r.user._id.toString(),
			},
			trainer: r.trainer.toString(),
			rating: r.rating,
			description: r.description,
			tags: r.tags,
		})),
		plans: plans.map((p) => ({
			...p,
			trainer: p.trainer.toString(),
			_id: p._id.toString(),
		})),
	};

	return {
		props: {
			data,
		},
	};
};
