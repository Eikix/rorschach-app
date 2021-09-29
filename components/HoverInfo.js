const HoverInfo = ({ content }) => {
    return (
        <div
            className={`max-w-xs md:max-w-xs lg:max-w-md xl:max-w-lg self-center font-light shadow-sm bg-blue-50 p-3 md:p-3 lg:p-4 rounded-lg text-lg lg:text-xl mb-12 animate-fadeIn`}
        >
            <p>{content}</p>
        </div>
    );
};

export default HoverInfo;
