const HoverInfo = ({content, visible}) => {
    return (
        <div className={`z-20 max-w-sm md:max-w-md lg:max-w-xl xl:max-w-4xl absolute self-center font-light shadow-sm bg-blue-50 p-2 md:p-3 lg:p-4 rounded-lg text-lg lg:text-xl ${visible ? '' : 'hidden'}`}>
            <p>{content}</p>
        </div>
    )
}

export default HoverInfo
