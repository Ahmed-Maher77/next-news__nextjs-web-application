// Mobile menu backdrop
const Overlay = ({ onClick }: { onClick: () => void }) => {
    return (
        <div
            className="overlay w-screen h-screen bg-black/50 fixed left-0 top-0"
            onClick={onClick}
        ></div>
    );
};

export default Overlay;
