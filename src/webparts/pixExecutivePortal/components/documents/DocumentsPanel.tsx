import * as React from "react";

import {
  useEffect,
  useState,
} from "react";

import {
  FolderOpen,
} from "lucide-react";

/* =========================================================
   SERVICES
========================================================= */

import DocumentsService
from "../../services/DocumentsService";

/* =========================================================
   MODELS
========================================================= */

import {
  IDocumentItem,
} from "../../models/IDocumentItem";

/* =========================================================
   MODAL
========================================================= */

import DocumentsModal
from "./DocumentsModal";

/* =========================================================
   COMPONENT
========================================================= */

const DocumentsPanel = (): JSX.Element => {

  /* ======================================================
     STATE
  ====================================================== */

  const [
    documents,
    setDocuments
  ] = useState<IDocumentItem[]>([]);

  const [
    showLibrary,
    setShowLibrary
  ] = useState(false);

  /* ======================================================
     LOAD DOCUMENTS
  ====================================================== */

  useEffect(() => {

    const loadDocuments =
      async (): Promise<void> => {

        try {

          const response =
            await DocumentsService
              .getDocuments();

          console.log(
            "[DocumentsPanel] Documents",
            response
          );

          setDocuments(
            response || []
          );

        } catch (error) {

          console.error(
            "[DocumentsPanel] Error",
            error
          );

          setDocuments([]);
        }
      };

    loadDocuments();

  }, []);

  /* ======================================================
     FILE TYPE
  ====================================================== */

  const getFileType = (
    fileName?: string
  ): string => {

    if (!fileName) {

      return "file";
    }

    const extension =
      fileName
        .toLowerCase()
        .split(".")
        .pop();

    switch (extension) {

      case "pdf":
        return "pdf";

      case "doc":
      case "docx":
        return "word";

      case "xls":
      case "xlsx":
        return "excel";

      case "ppt":
      case "pptx":
        return "powerpoint";

      case "png":
      case "jpg":
      case "jpeg":
        return "image";

      default:
        return "file";
    }
  };

  /* ======================================================
     RELATIVE TIME
  ====================================================== */

  const getRelativeTime = (
    date?: string
  ): string => {

    if (!date) {

      return "JUST NOW";
    }

    const now =
      new Date().getTime();

    const modified =
      new Date(date).getTime();

    const diff =
      now - modified;

    const hours =
      Math.floor(
        diff / (1000 * 60 * 60)
      );

    const days =
      Math.floor(hours / 24);

    if (hours <= 0) {

      return "JUST NOW";
    }

    if (hours < 24) {

      return `${hours}H AGO`;
    }

    if (days === 1) {

      return "YESTERDAY";
    }

    if (days < 7) {

      return `${days}D AGO`;
    }

    return `${Math.floor(days / 7)}W AGO`;
  };

  /* ======================================================
     OPEN DOCUMENT
  ====================================================== */

  const openDocument = (
    url?: string
  ): void => {

    if (!url) {

      return;
    }

    window.open(
      url,
      "_blank"
    );
  };

  /* ======================================================
     RENDER
  ====================================================== */

  return (

    <>

      <section className="pix-documents-panel">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="pix-ops-panel__header">

          <div className="pix-ops-panel__title-group">

            <FolderOpen
              size={16}
              color="#06b6d4"
            />

            <h2 className="pix-ops-panel__title">

              Documents Library

            </h2>

            <div className="pix-open-badge">

              SharePoint

            </div>

          </div>

          <button
            className="pix-panel-cta"
            onClick={() =>
              setShowLibrary(true)
            }
          >

            Open library →

          </button>

        </div>

        {/* ======================================================
            EMPTY STATE
        ====================================================== */}

        {documents.length === 0 && (

          <div
            style={{
              padding: "32px",
              color: "#777",
            }}
          >

            No documents available

          </div>

        )}

        {/* ======================================================
            LIST
        ====================================================== */}

        <div className="pix-documents-list">

          {(documents || []).map((doc) => {

            const fileType =
              getFileType(
                doc.fileName ||
                doc.title ||
                ""
              );

            return (

              <div
                key={doc.id}
                className="pix-document-row"
                onClick={() =>
                  openDocument(
                    doc.fileUrl
                  )
                }
              >

                {/* ==================================================
                    LEFT
                =================================================== */}

                <div className="pix-document-left">

                  <div
                    className={`
                      pix-document-badge
                      pix-document-badge--${fileType}
                    `}
                  >

                    {(
                      doc.fileType ||
                      "FILE"
                    ).toUpperCase()}

                  </div>

                  <div className="pix-document-content">

                    <div className="pix-document-title">

                      {doc.title ||
                        "Untitled Document"}

                    </div>

                    <div className="pix-document-meta">

                      {doc.modifiedBy ||
                        "Unknown User"}

                    </div>

                  </div>

                </div>

                {/* ==================================================
                    RIGHT
                =================================================== */}

                <div className="pix-document-right">

                  <div className="pix-document-modified">

                    {getRelativeTime(
                      doc.modified
                    )}

                  </div>

                  <div
                    className={`
                      pix-document-status
                      pix-document-status--${(
                        doc.approvalStatus ||
                        "active"
                      ).toLowerCase()}
                    `}
                  >

                    {doc.approvalStatus ||
                      "Active"}

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      </section>

      {/* ======================================================
          MODAL
      ====================================================== */}

      {showLibrary && (

        <DocumentsModal
          documents={documents || []}
          onClose={() =>
            setShowLibrary(false)
          }
        />

      )}

    </>

  );
};

export default DocumentsPanel;