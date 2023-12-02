const Loading = () => {
	return (
		<div className='-mt-[5rem] md:-mt-[1rem] mb-2rem md:mb-0 flex flex-col justify-center align-center w-full h-screen animate-fade-in'>
			<h1 className='text-[6cqw] md:text-[4cqw] lg:text-[3cqw] text-burntOrange text-center'>
				Did we hook them?
			</h1>
			<div className='w-[5rem] md:w-[7rem] h-[6rem] md:h-[8rem] mx-auto mt-[1.5rem] animate-spin'>
				<span className='animate-spin text-[5rem] md:text-[7rem]'>🤘</span>
			</div>
		</div>
	);
};

export default Loading;
