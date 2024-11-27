import {TaskDetail} from "../types/types";
import {PdfViewer, PdfViewMode} from "./PdfViewer";
import PdfViewComponent from "./PdfViewComponent";


type TaskItemDetailProps = {
    taskItemDetail: TaskDetail
}

const TaskItemDetail: React.FC<TaskItemDetailProps> = ({taskItemDetail}) => {


    return (
        <div>
            <div style={{padding: "20px", border: "2px solid black"}}>{taskItemDetail.taskName}</div>
            {/*{taskItemDetail.document && <div style={{width: "100%"}}>*/}
            {/*    <PdfViewer documentUrl={taskItemDetail.document} viewMode={PdfViewMode.FormViewer}*/}
            {/*               onChanges={() => null} instantJson={taskItemDetail.instantJson ?? ""}/>*/}
            {/*</div>}*/}
            {taskItemDetail.document && <PdfViewComponent document={taskItemDetail.document}/>}
        </div>
    )
}

export default TaskItemDetail;