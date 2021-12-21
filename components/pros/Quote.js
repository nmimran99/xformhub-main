export default function Quote({}) {
	return (
		<div className="my-8 p-4 shadow-xl rounded-xl flex border border-gray-200 w-11/12 mx-auto">
			<img
				src="https://xfhstaticstorage.blob.core.windows.net/images/NivMimran.png"
				className="rounded-full w-20 h-20 object-cover border-2 border-white ring-2 ring-blue-600 shadow-xl"
			/>
			<div className="px-4">
				<div className="italic text-gray-500 text-xs">
					&quot;A suitable fitness professional can turn a life around. We are
					here to ease the process of finding the one that will for our
					clients.&quot;
				</div>
				<div className="text-xs border-t border-gray-300 py-2 mt-2 text-gray-600">
					Niv Mimran, Founder
				</div>
			</div>
		</div>
	);
}
