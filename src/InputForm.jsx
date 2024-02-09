import Button from "./components/Button";

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
                <Button label="Create"></Button>
            </form>
        </div>
    );
}

export default InputForm;