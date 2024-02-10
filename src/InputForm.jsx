function InputForm({setPlayerNames}) {
    const onSubmitForm = (e) => {
        e.preventDefault();
        setPlayerNames([e.target[0].value, e.target[1].value]);
    }

    return (
        <div className="h-screen m-auto flex flex-col items-center justify-center gap-8">
            <h1 className="text-5xl font-bold">Shot Clock</h1>
            <form onSubmit={onSubmitForm} className="flex flex-col items-center justify-center gap-4"> 
                <input className="p-2 text-base rounded-md bg-neutral-700" type="text" required placeholder="Player 1 Name" />
                <div className="font-bold">VS.</div>
                <input className="p-2 text-base rounded-md bg-neutral-700" type="text" required placeholder="Player 2 Name" />
                <button type="submit" className={"h-12 rounded-lg shadow-sm border border-transparent px-4 py-2.5 font-medium bg-gray-900 text-white cursor-pointer transition-colors duration-200 hover:border-indigo-500 focus:outline-none select-none"}>
                    Create
                </button>
            </form>
        </div>
    );
}

export default InputForm;