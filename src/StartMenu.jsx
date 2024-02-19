function StartMenu({setRoomCode, setShowForm}) {
    const onSubmitForm = (e) => {
        e.preventDefault();
        setRoomCode(e.target[0].value.toLowerCase());
        const params = new URLSearchParams();
        params.set('c', e.target[0].value.toLowerCase());
        window.history.pushState(null, '', `?${params.toString()}`);
    }

    return (
        <div className="h-screen m-auto flex flex-col items-center justify-center gap-8">
            <h1 className="text-5xl font-bold">Shot Clock</h1>
            <button onClick={() => setShowForm(true)} className={"h-12 rounded-lg shadow-sm border border-transparent px-4 py-2.5 font-medium bg-gray-900 text-white cursor-pointer transition-colors duration-200 hover:border-indigo-500 focus:outline-none select-none"}>
                Create Clock
            </button>
            <div className="font-bold text-xl">Or</div>
            <form onSubmit={onSubmitForm} className="flex items-center justify-center gap-4"> 
                <input className="p-2 w-[128px] text-base rounded-md bg-neutral-700" type="text" required placeholder="Connect code" />
                <button type="submit" className={"h-12 rounded-lg shadow-sm border border-transparent px-4 py-2.5 font-medium bg-gray-900 text-white cursor-pointer transition-colors duration-200 hover:border-indigo-500 focus:outline-none select-none"}>
                    Join
                </button>
            </form>
        </div>
    );
}

export default StartMenu;