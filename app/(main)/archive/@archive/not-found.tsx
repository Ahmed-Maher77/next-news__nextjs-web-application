// Archive not found
const ArchiveNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6 py-6 px-8 text-center">
            <h1 className="text-3xl font-bold">
                There are no News available for the selected year...
            </h1>
            <p className="text-[#bcbcb7] text-lg mt-2">
                Please select a different year to view news.
            </p>
        </div>
    );
};

export default ArchiveNotFound;
