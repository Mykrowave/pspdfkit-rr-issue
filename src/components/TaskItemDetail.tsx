import {TaskDetail} from "../types/types";
import {PdfViewer, PdfViewMode} from "./PdfViewer";


type TaskItemDetailProps = {
    taskItemDetail: TaskDetail
}

const TaskItemDetail: React.FC<TaskItemDetailProps> = ({taskItemDetail}) => {


    return (
        <div>
            <div style={{padding: "20px", border: "2px solid black"}}>{taskItemDetail.taskName}</div>
            {taskItemDetail.document && <div style={{width: "100%"}}>
                <PdfViewer documentUrl={taskItemDetail.document} viewMode={PdfViewMode.FormViewer}
                           onChanges={() => null} instantJson={taskItemDetail.instantJson ?? ""}/>
            </div>}
        </div>
    )
}

export default TaskItemDetail;