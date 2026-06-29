import MainLoader from "./components/Loader/main-loader";

const MainLoading = () => {
    return (
        <div className="fixed inset-0 backdrop:blur-sm flex items-center justify-center z-50 flex-col-reverse gap-12">
            <h1 className="text-3xl font-bold text-white">
                Next <span className="text-orange-500">News</span>
            </h1>
            <MainLoader />
        </div>
    );
};

export default MainLoading;
