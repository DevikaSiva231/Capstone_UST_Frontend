import HappyUsersSection from "../components/BusinessSection/happyUsersSection";

const HappyUsersContainer = () => {
    return (
        <div className="m-20 container h-96 overflow-hidden">
            <div>
                <p className="text-center text-2xl font-semibold mb-4"></p>
                <HappyUsersSection />
            </div>
        </div>
    );
};

export default HappyUsersContainer;