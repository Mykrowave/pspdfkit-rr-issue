import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskItemList from "./components/TaskItemList.tsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <TaskItemList/>
    )
}

export default App
