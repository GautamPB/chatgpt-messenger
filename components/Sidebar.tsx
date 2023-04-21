import NewChat from './NewChat';

function Sidebar() {
    return (
        <div className="p-2 flex flex-col h-screen">
            <div className="flex-1">
                {/* New chat button */}
                <NewChat />

                <div>{/* model selection */}</div>

                {/* chat rows */}
            </div>
        </div>
    );
}

export default Sidebar;
