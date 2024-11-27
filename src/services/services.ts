import {TaskDetail, TaskItem} from "../types/types";

export async function GetTaskItems(): Promise<TaskItem[]> {
    await simulateNetworkCall(150);
    return [
        {
            id: 1,
            taskName: "Load With Pdf"
        },
        {
            id: 2,
            taskName: "Load Item With No Pdf"
        }
    ];
}

export async function GetTaskItemDetail(id: number): Promise<TaskDetail> {
    await simulateNetworkCall(150);
    if (id === 1) {
        return {
            id: 1,
            taskName: "Load Component With Pdf",
            document: "https://rrdevfiles.blob.core.windows.net/1011-franksorg-pdfform/2024/11/cc476a4d-3a77-4be5-a0d5-f7c7645ab9cf/i9tester.pdf?sp=r&st=2024-11-20T17:19:02Z&se=2025-01-01T01:19:02Z&spr=https&sv=2022-11-02&sr=b&sig=hHFPi%2FJkeN1kuiHJIEu4XLyfqPEQJje%2Bv4j%2BmF36wgY%3D",
            instantJson: ""
        }
    } else {
        return {
            id: 2,
            taskName: "Load With No Pdf",
            document: null,
            instantJson: null
        }
    }
}

function simulateNetworkCall(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}