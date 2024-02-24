import { useEffect, useState } from "react";

function StartMenu({ socket, setRoomCode, setShowForm }) {
    const [codeInput, setCodeInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmitForm = (e) => {
        e.preventDefault();
        setRoomCode(codeInput);
        const params = new URLSearchParams();
        params.set('c', e.target[0].value.toLowerCase());
        window.history.pushState(null, '', `?${params.toString()}`);
    }

    useEffect(() => {
        socket?.on('fail-join', () => {
            setRoomCode(null);
            setCodeInput('');
            setErrorMessage("Clock doesn't exist");
            socket.disconnect();

            return () => socket.off('fail-join');
        });
    }, [socket]);

    const handleInputChange = (e) => {
        setCodeInput(e.target.value);
        setErrorMessage('');
    }

    return (
        <div className="h-full flex flex-col items-center justify-center gap-6">
            <h1 className="text-5xl font-bold">Shot Clock</h1>
            <button onClick={() => setShowForm(true)} className={"h-12 rounded-lg shadow-lg border border-transparent px-4 py-2.5 font-medium bg-zinc-800 text-white cursor-pointer transition-colors duration-200 hover:border-indigo-500 focus:outline-none select-none"}>
                Create Clock
            </button>
            <div className="text-2xl">or</div>
            <form onSubmit={onSubmitForm} className="flex items-center justify-center gap-4"> 
                    <input className="p-3 w-[150px] text-base rounded-md bg-zinc-700" type="text"
                        value={codeInput} onChange={handleInputChange} required placeholder="Connect code" />
                <button type="submit" className={"h-12 rounded-lg shadow-lg border border-transparent px-4 py-2.5 font-medium bg-zinc-800 text-white cursor-pointer transition-colors duration-200 hover:border-indigo-500 focus:outline-none select-none"}>
                    Join
                </button>
            </form>
            <div className="text-red-500">{errorMessage} </div>
        </div>
    );
}

export default StartMenu;