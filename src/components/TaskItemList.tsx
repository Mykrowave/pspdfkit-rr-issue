import {useEffect, useMemo, useState} from "react";
import {GetTaskItemDetail, GetTaskItems} from "../services/services";
import {TaskDetail, TaskItem} from "../types/types";
import TaskItemDetail from "./TaskItemDetail";


function TaskItemList() {

    const [taskItems, setTaskItems] = useState<TaskItem[]>([]);
    const [focusedTaskItem, setFocusedTaskItem] = useState<TaskItem | null>(null);
    const [taskItemDetail, setTaskItemDetail] = useState<TaskDetail | null>(null);

    useEffect(() => {
        if (taskItems.length > 0) return;
        GetTaskItems().then(ti => {
            setTaskItems(ti);
        })
    }, [taskItems]);

    useEffect(() => {
        const getTaskItemDetail = async () => {
            const taskItemDetail = await GetTaskItemDetail(focusedTaskItem.id);
            setTaskItemDetail(taskItemDetail);
        }

        focusedTaskItem ? getTaskItemDetail() : setTaskItemDetail(null);
    }, [focusedTaskItem]);

    return (
        <div style={{padding: "20px", width: 900}}>
            <ul>
                {taskItems.map((ti, i) => {
                    return <li key={i} style={{
                        listStyleType: "none"
                    }}>
                        <button onClick={() => setFocusedTaskItem(ti)}>{ti.taskName}</button>
                    </li>
                })}

            </ul>
            {taskItemDetail && <TaskItemDetail taskItemDetail={taskItemDetail}/>}
        </div>
    );
}

export default TaskItemList;