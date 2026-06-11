import * as React from "react";

import {
  X,
  Upload,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  FileCode,
  Presentation,
  File
} from "lucide-react";

import {
  IDocumentItem
} from "../../models/IDocumentItem";

import DocumentsService
  from "../../services/DocumentsService";

/* =========================================================
   PROPS
========================================================= */

interface IDocumentsModalProps {

  documents:
    IDocumentItem[];

  onClose:
    () => void;
}

/* =========================================================
   COMPONENT
========================================================= */

const DocumentsModal:
React.FC<IDocumentsModalProps> = ({
  documents,
  onClose
}) => {

  /* =======================================================
     STATE
  ======================================================= */


  const [uploading, setUploading] =
    React.useState(false);

  const [
    localDocuments,
    setLocalDocuments
  ] = React.useState<IDocumentItem[]>(
    documents
  );

  /* =======================================================
     SYNC DOCUMENTS
  ======================================================= */

  React.useEffect(() => {

    setLocalDocuments(documents);

  }, [documents]);

  /* =======================================================
     FILE ICON
  ======================================================= */

  const renderFileIcon = (
    fileName: string
  ): React.ReactElement => {

    const extension =
      fileName
        .split(".")
        .pop()
        ?.toLowerCase();

    switch (extension) {

      case "pdf":

        return (
          <FileText
            size={26}
            color="#dc2626"
          />
        );

      case "doc":

      case "docx":

        return (
          <FileText
            size={26}
            color="#2563eb"
          />
        );

      case "xls":

      case "xlsx":

        return (
          <FileSpreadsheet
            size={26}
            color="#16a34a"
          />
        );

      case "ppt":

      case "pptx":

        return (
          <Presentation
            size={26}
            color="#ea580c"
          />
        );

      case "png":

      case "jpg":

      case "jpeg":

        return (
          <FileImage
            size={26}
            color="#9333ea"
          />
        );

      case "zip":

        return (
          <FileArchive
            size={26}
            color="#475569"
          />
        );

      case "json":

      case "xml":

      case "js":

      case "ts":

        return (
          <FileCode
            size={26}
            color="#0f172a"
          />
        );

      default:

        return (
          <File
            size={26}
            color="#64748b"
          />
        );
    }
  };

  /* =======================================================
     OPEN DOCUMENT
  ======================================================= */

  const openDocument = (
    url: string
  ): void => {

    if (!url) {

      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =======================================================
     UPLOAD DOCUMENT
  ======================================================= */

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {

    try {

      const file =
        event.target.files?.[0];

      if (!file) {

        return;
      }

      setUploading(true);

      const uploaded =
        await DocumentsService
          .uploadDocument(file);

      if (!uploaded) {

        alert(
          "Document upload failed"
        );

        return;
      }

      const refreshedDocs =
        await DocumentsService
          .getDocuments();

      setLocalDocuments(
        refreshedDocs
      );

    } catch (error) {

      console.error(
        "[DocumentsModal] Upload failed",
        error
      );

    } finally {

      setUploading(false);
    }
  };

  /* =======================================================
     FILTER DOCUMENTS
  ======================================================= */

  const filteredDocuments =
  React.useMemo(() => {

    return localDocuments;

  }, [localDocuments]);

  /* =======================================================
     RELATIVE TIME
  ======================================================= */

  const getRelativeTime = (
    dateValue: string
  ): string => {

    const date =
      new Date(dateValue);

    const now =
      new Date();

    const difference =
      now.getTime() -
      date.getTime();

    const hours =
      Math.floor(
        difference /
        (1000 * 60 * 60)
      );

    const days =
      Math.floor(hours / 24);

    if (hours <= 0) {

      return "JUST NOW";
    }

    if (hours < 24) {

      return `${hours}H AGO`;
    }

    if (days < 7) {

      return `${days}D AGO`;
    }

    return date.toLocaleDateString();
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <div className="pix-modal-overlay">

      <div className="pix-modal">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="pix-modal__header">

          <div>

            <div className="pix-modal__title">

              Executive Document Library

            </div>

            <div className="pix-modal__subtitle">

              Centralized workspace
              for executive collaboration
              and live SharePoint
              document management.

            </div>

          </div>

          <button
            className="pix-modal__close"
            onClick={onClose}
          >

            <X size={20} />

          </button>

        </div>

        {/* =================================================
            TOOLBAR
        ================================================== */}

        <div className="pix-modal__toolbar">

          <div className="pix-library-workspace">

  {/* =========================================
      LEFT
  ========================================== */}

  <div className="pix-library-workspace__left">

    <div className="pix-library-stat">

      <div className="pix-library-stat__label">

        TOTAL DOCUMENTS

      </div>

      <div className="pix-library-stat__value">

        {localDocuments.length}

      </div>

    </div>

    <div className="pix-library-stat">

      <div className="pix-library-stat__label">

        WORKSPACE

      </div>

      <div className="pix-library-stat__value">

        LIVE SHAREPOINT

      </div>

    </div>

    <div className="pix-library-stat">

      <div className="pix-library-stat__label">

        COLLABORATION

      </div>

      <div className="pix-library-stat__value">

        ACTIVE

      </div>

    </div>

  </div>

  {/* =========================================
      RIGHT
  ========================================== */}

  <div className="pix-library-workspace__right">

    {/* =======================================
        OPEN SHAREPOINT
    ======================================== */}

    <button
      className="pix-library-button pix-library-button--secondary"
      onClick={() => {

        window.open(
          `${window.location.origin}/Shared Documents`,
          "_blank"
        );
      }}
    >

      Open Library

    </button>

    {/* =======================================
        UPLOAD
    ======================================== */}

    <label
      className="pix-library-button pix-library-button--primary"
    >

      <Upload size={18} />

      <span>

        {
          uploading
            ? "Uploading..."
            : "Upload Document"
        }

      </span>

      <input
        type="file"
        hidden
        onChange={handleUpload}
      />

    </label>

  </div>

</div>

          

        </div>

        {/* =================================================
            TABLE
        ================================================== */}

        <div className="pix-modal__table-wrapper">

          <table
            className="pix-actions-table"
          >

            <thead>

              <tr>

                <th>Document</th>

                <th>Modified By</th>

                <th>Status</th>

                <th>Updated</th>

              </tr>

            </thead>

            <tbody>

              {
                filteredDocuments.map(
                  (doc) => {

                    return (

                      <tr
                        key={doc.id}
                        className="pix-document-row"
                        onClick={() =>
                          openDocument(
                            doc.fileUrl
                          )
                        }
                      >

                        {/* =====================
                            DOCUMENT
                        ====================== */}

                        <td>

                          <div className="pix-document-left">

                            <div className="pix-document-icon">

                              {
                                renderFileIcon(
                                  doc.fileName
                                )
                              }

                            </div>

                            <div className="pix-document-content">

                              <div className="pix-document-title">

                                {doc.title}

                              </div>

                              <div className="pix-document-meta">

                                {doc.fileName}

                              </div>

                            </div>

                          </div>

                        </td>

                        {/* =====================
                            MODIFIED
                        ====================== */}

                        <td>

                          <div className="pix-owner__name">

                            {doc.modifiedBy}

                          </div>

                        </td>

                        {/* =====================
                            STATUS
                        ====================== */}

                        <td>

                          <div
                            className={`
                              pix-document-status
                              pix-document-status--${doc.approvalStatus?.toLowerCase()}
                            `}
                          >

                            {doc.approvalStatus}

                          </div>

                        </td>

                        {/* =====================
                            UPDATED
                        ====================== */}

                        <td>

                          <div className="pix-document-modified">

                            {
                              getRelativeTime(
                                doc.modified
                              )
                            }

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default DocumentsModal;