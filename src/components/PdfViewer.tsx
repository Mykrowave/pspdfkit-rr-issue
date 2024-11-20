import PSPDFKit, { ViewState } from "pspdfkit";
import React, { useCallback, useEffect, useRef, useState } from "react";

export enum PdfViewMode {
    FormEditor,
    FormUser,
    FormViewer,
}

type PdfViewProps = {
    documentUrl: string;
    viewMode: PdfViewMode;
    instantJson?: string;
    xfdf?: string;
    onChanges: (instantJson: string, xfdf: string) => void;
};
const PdfViewer: React.FC<PdfViewProps> = ({
                                               documentUrl,
                                               viewMode,
                                               instantJson,
                                               xfdf,
                                               onChanges,
                                           }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleChanges = useCallback(
        (instantJson: string, xfdf: string) => {
            onChanges(instantJson, xfdf);
        },
        [onChanges]
    );

    // Stable document url that ignores query param changes like the signature
    const [document, setDocument] = useState(documentUrl);
    // only update document url if the actual document changes (not the query params)
    useEffect(() => {
        if (documentUrl.split("?")[0] !== document.split("?")[0]) {
            setDocument(documentUrl);
        }
    }, [document, documentUrl]);

    // Store props in a ref to avoid re-running the effect when props change
    const initialProps = useRef({ instantJson, xfdf, handleChanges });

    useEffect(() => {
        console.log("Use Effect is Triggered");
        const container = containerRef.current;
        const { handleChanges, instantJson, xfdf } = initialProps.current;

        if (!container || !document) return;
        const loaded = true;

        console.log("loading");
        PSPDFKit.unload(container);
        PSPDFKit.load({
            container,
            document,
            instantJSON: instantJson ? JSON.parse(instantJson) : undefined,
            XFDF: !instantJson ? xfdf : undefined,
            initialViewState:
                viewMode === PdfViewMode.FormViewer
                    ? new ViewState({ readOnly: true })
                    : undefined,
            baseUrl: `${window.location.protocol}//${window.location.host}/${import.meta.env.BASE_URL}`
            //licenseKey: Config.psPdfKitLicense,  Trial License Key is expired
        })
            .then(instance => {
                switch (viewMode) {
                    case PdfViewMode.FormEditor:
                        instance.setToolbarItems(items => [
                            ...items,
                            { type: "form-creator" },
                        ]);
                        break;
                    case PdfViewMode.FormUser:
                        break;
                    case PdfViewMode.FormViewer:
                        break;
                }
                instance.addEventListener("document.saveStateChange", async event => {
                    if (!event.hasUnsavedChanges) {
                        const exportedInstantJson = await instance.exportInstantJSON();
                        const exportedXfdf = await instance.exportXFDF();
                        handleChanges(JSON.stringify(exportedInstantJson), exportedXfdf);
                    }
                });
            })
            .catch(err => {});

        return () => {
            if (loaded && container) {
                console.log("about to unload");
                PSPDFKit.unload(container);
                console.log("unloaded");
            }
        };
    }, [document, viewMode]);

    return <div ref={containerRef} style={{ width: "100%", height: "75vh" }} />;
};

const PdfViewerMemo = React.memo(PdfViewer);
export { PdfViewerMemo as PdfViewer };
