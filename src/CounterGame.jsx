import { useState, useReducer, useCallback, useRef, useEffect } from "react";
import './styles/CounterGame.css'
const CounterGame = () => {
    const [number, setNumber] = useState('');
    const numberAsNumber = Number(number);
    const initialState = { count: 0, history: [] };
    const numberToAdd = numberAsNumber || 1;

    const reducer = (state, action) => {
        switch (action.type) {
            case 'increment':
                return {
                    count: state.count + numberToAdd,
                    history: [...state.history, `+${numberToAdd} (New value: ${state.count + numberToAdd})`]
                }
            case 'decrement':
                return {
                    count: state.count - 1,
                    history: [...state.history, `-${numberToAdd} (New value: ${state.count - numberToAdd})`]
                }
            case 'undo':
                state.history.pop();
                return {
                    count: 0,
                    history: state.history
                }
            case 'reset':
                return initialState;
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('memo')) || initialState);

    const incrementBtnRef = useRef(null);

    useEffect(() => {
        incrementBtnRef.current.focus();
    }, []);

    const handleIncrement = useCallback(() => {
        dispatch({ type: 'increment' });
    }, []);

    const handleDecrement = useCallback(() => {
        dispatch({ type: 'decrement' });
    }, []);

    const handleUndo = useCallback(() => {
        dispatch({ type: 'undo' });
    }, []);

    useEffect(() => {
        localStorage.setItem('memo', JSON.stringify(state));
    }, [state])

    return (
        <>
            <section className="counter_game container-fluid rounded-5">
                <div>
                    <h1 className="text-center py-3">Counter game</h1>
                    <h2 className="text-center m-3" >Counter: {state.count}</h2>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-center row col-12 g-3">
                        <div className="d-flex justify-content-evenly">
                            <button onClick={handleDecrement} >
                                <i className="bi bi-dash-circle"> Decrement</i>
                            </button>
                            <button ref={incrementBtnRef} onClick={handleIncrement} >
                                <i className="bi bi-plus-circle"> Increment</i>
                            </button>
                        </div>
                        <input className='rounded w-75' type="number" onChange={e => setNumber(e.target.value)} value={number} placeholder="Just numbers" maxLength={2} />
                        <div className="d-flex justify-content-evenly">
                            <button onClick={() => dispatch({ type: 'reset' })}>
                                <i className="bi bi-life-preserver"> Reset</i>
                            </button>
                            <button onClick={handleUndo}>
                                <i className="bi bi-arrow-clockwise"> Undo</i>.
                            </button>
                        </div>
                    </div>
                    <aside className="m-2 p-2">
                        <h2 className="text-center m-3">Log</h2>
                        <ul className="p-6 rounded-4 d-flex row g-2 justify-content-center">
                            {
                                state.history.map((entry, index) => (
                                    <li className="w-75 col-12 rounded m-2 text-center" key={index} >{entry}</li>
                                ))
                            }
                        </ul>
                    </aside>
                </div>
            </section>
        </>
    );
};
export default CounterGame;