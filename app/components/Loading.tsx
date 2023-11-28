const Loading = () => {
	return (
		<div className='-mt-[3rem] md:-mt-[1rem] mb-2rem md:mb-0 flex flex-col justify-center align-center w-full h-screen animate-fade-in'>
			<h1 className='text-[6cqw] md:text-[4cqw] lg:text-[3cqw] text-burntOrange text-center'>
				Did we hook them?
			</h1>
			<span className='loader border-white dark:border-gray-700 border-[10px]'></span>
		</div>
	);
};

export default Loading;
