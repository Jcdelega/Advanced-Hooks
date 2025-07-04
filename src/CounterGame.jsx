import { useState, useReducer, useCallback, useRef, useEffect } from "react";

const CounterGame=()=>{
    const initialState = {count: 0, history: []};

    const reducer= (state, action)=>{
        switch (action.type){
            case 'increment':
                return{
                    count: state.count +1,
                    history: [...state.history, `+1 (New value: ${state.count +1})`]
                }
            case 'decrement':
                return{
                    count: state.count -1,
                    history: [...state.history, `-1 (New value: ${state.count -1})`]
                }
            case 'undo':
                return{
                    count: history[0],
                    history: [...state.history, state.history[length-2]]
                }
            case 'reset':
                return initialState;
            default:
                return state;
        }
    }

    const [state, dispatch]=useReducer(reducer, initialState);
    const [number, setNumber]=useState(0);

    const incrementBtnRef= useRef(null);

    useEffect(()=>{
        incrementBtnRef.current.focus();
    },[]);

    const handleIncrement=useCallback(()=>{
        dispatch({type: 'increment'});
    },[]);
    
    const handleDecrement=useCallback(()=>{
        dispatch({type: 'decrement'});
    },[]);

    const handleUndo=()=>{
        dispatch({type: 'undo'});
    };

    return(
        <>
            <section>
                <h1>This is the counter game</h1>
                <h2>Counter: {state.count}</h2>
                <button onClick={handleDecrement} >
                    <i className="bi bi-dash-circle"> Decrement</i>
                </button>
                <button ref={incrementBtnRef} onClick={handleIncrement} >
                    <i className="bi bi-plus-circle"> Increment</i>
                </button>
                <button onClick={()=>dispatch({type:'reset'})}>
                    <i className="bi bi-life-preserver"> Reset</i>
                </button>
                <button onClick={handleUndo}>
                    <i className="bi bi-arrow-clockwise"> Undo</i>.
                </button>
                <aside>
                    <h2>Log</h2>
                    <ul>
                        {
                            state.history.map((entry, index)=>{
                                <li key={index} >{entry}</li>
                            })
                        }
                    </ul>
                </aside>
            </section>
        </>
    );
};
export default CounterGame;