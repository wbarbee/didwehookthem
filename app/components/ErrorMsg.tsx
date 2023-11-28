const ErrorMsg = () => {
	return (
		<div className='flex flex-col justify-center align-center w-full h-full min-h-screen animate-fade-in'>
			<h1 className='text-[6cqw] md:text-[4cqw] lg:text-[3cqw] text-burntOrange text-center'>
				An error occurred while trying to fetch the data. Please try again
				later.
			</h1>
		</div>
	);
};

export default ErrorMsg;
