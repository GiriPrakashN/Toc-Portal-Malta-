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
  File,
  Trash2
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

  const [
    selectedIds,
    setSelectedIds
  ] = React.useState<Set<number>>(
    new Set()
  );

  const [
    deletingIds,
    setDeletingIds
  ] = React.useState<Set<number>>(
    new Set()
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
     SELECTION
  ======================================================= */

  const allSelected =
    localDocuments.length > 0 &&
    selectedIds.size === localDocuments.length;

  const someSelected =
    selectedIds.size > 0 &&
    selectedIds.size < localDocuments.length;

  const toggleSelectAll = (): void => {

    if (allSelected) {

      setSelectedIds(new Set());

    } else {

      setSelectedIds(
        new Set(localDocuments.map(d => d.id))
      );
    }
  };

  const toggleSelect = (
    id: number
  ): void => {

    setSelectedIds(prev => {

      const next = new Set(prev);

      if (next.has(id)) {

        next.delete(id);

      } else {

        next.add(id);
      }

      return next;
    });
  };

  /* =======================================================
     DELETE SINGLE
  ======================================================= */

  const handleDeleteSingle = async (
  doc: IDocumentItem,
  event: React.MouseEvent
): Promise<void> => {

  event.preventDefault();
  event.stopPropagation();

  if (
    !window.confirm(
      `Delete "${doc.title}"?`
    )
  ) {

    return;
  }

  setDeletingIds(prev => {

    const next = new Set(prev);
    next.add(doc.id);
    return next;
  });

  try {

    const success =
      await DocumentsService.deleteDocument(
        doc.id
      );

    if (!success) {

      throw new Error(
        "Delete failed"
      );
    }

    const refreshedDocs =
      await DocumentsService.getDocuments();

    setLocalDocuments(
      refreshedDocs
    );

    setSelectedIds(prev => {

      const next = new Set(prev);

      next.delete(doc.id);

      return next;
    });

  } catch (error) {

    console.error(
      "[DocumentsModal] Delete failed",
      error
    );

    alert(
      "Failed to delete document."
    );

  } finally {

    setDeletingIds(prev => {

      const next = new Set(prev);

      next.delete(doc.id);

      return next;
    });
  }
};
  /* =======================================================
     DELETE BULK
  ======================================================= */

  const handleDeleteBulk =
  async (): Promise<void> => {

    if (
      selectedIds.size === 0
    ) {

      return;
    }

    if (
      !window.confirm(
        `Delete ${selectedIds.size} selected document${selectedIds.size > 1 ? "s" : ""}?`
      )
    ) {

      return;
    }

    const ids =
      Array.from(selectedIds);

    setDeletingIds(
      new Set(ids)
    );

    try {

      await Promise.all(
        ids.map(id =>
          DocumentsService.deleteDocument(id)
        )
      );

      const refreshedDocs =
        await DocumentsService.getDocuments();

      setLocalDocuments(
        refreshedDocs
      );

      setSelectedIds(
        new Set()
      );

    } catch (error) {

      console.error(
        "[DocumentsModal] Bulk delete failed",
        error
      );

      alert(
        "Some documents could not be deleted."
      );

    } finally {

      setDeletingIds(
        new Set()
      );
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
            BULK DELETE BAR
        ================================================== */}

        {
          selectedIds.size > 0 && (

            <div className="pix-bulk-bar">

              <span className="pix-bulk-bar__count">

                {selectedIds.size} selected

              </span>

              <button
                className="pix-bulk-bar__delete"
                onClick={handleDeleteBulk}
                disabled={deletingIds.size > 0}
              >

                <Trash2 size={15} />

                <span>

                  {
                    deletingIds.size > 0
                      ? "Deleting..."
                      : `Delete ${selectedIds.size}`
                  }

                </span>

              </button>

              <button
                className="pix-bulk-bar__clear"
                onClick={() => setSelectedIds(new Set())}
              >

                Clear selection

              </button>

            </div>
          )
        }

        {/* =================================================
            TABLE
        ================================================== */}

        <div className="pix-modal__table-wrapper">

          <table
  className="pix-documents-table"
>


            <thead>

              <tr>

                {/* Checkbox column */}

                <th className="pix-col-check">

                  <input
                    type="checkbox"
                    className="pix-checkbox"
                    checked={allSelected}
                    ref={el => {
                      if (el) {
                        el.indeterminate = someSelected;
                      }
                    }}
                    onChange={toggleSelectAll}
                    onClick={e => e.stopPropagation()}
                  />

                </th>

                <th className="pix-col-document">
  Document
</th>

<th className="pix-col-modified">
  Modified By
</th>

<th className="pix-col-status">
  Status
</th>

<th className="pix-col-updated">
  Updated
</th>

                {/* Actions column */}

                <th className="pix-col-actions" />

              </tr>

            </thead>

            <tbody>

              {
                filteredDocuments.map(
                  (doc) => {

                    const isSelected =
                      selectedIds.has(doc.id);

                    const isDeleting =
                      deletingIds.has(doc.id);

                    return (

                      <tr
  key={doc.id}
  className={`
    pix-document-row
    ${isSelected ? "pix-document-row--selected" : ""}
    ${isDeleting ? "pix-document-row--deleting" : ""}
  `}
  onClick={() => {

    if (!isDeleting) {

      openDocument(
        doc.fileUrl
      );
    }
  }}
>

                        {/* =====================
                            CHECKBOX
                        ====================== */}

                        <td
                          className="pix-col-check"
                          onClick={e => e.stopPropagation()}
                        >

                          <input
                            type="checkbox"
                            className="pix-checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(doc.id)}
                          />

                        </td>

                        {/* =====================
                            DOCUMENT
                        ====================== */}

                        <td className="pix-col-document">

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

                        <td className="pix-col-modified">

  <div className="pix-document-user">

    {doc.modifiedBy}

  </div>

</td>

                        {/* =====================
                            STATUS
                        ====================== */}

                        <td className="pix-col-status">

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

                        <td className="pix-col-updated">

  <div className="pix-document-modified">

    {
      getRelativeTime(
        doc.modified
      )
    }

  </div>

</td>

                        {/* =====================
                            DELETE ACTION
                        ====================== */}

                        <td
                          className="pix-col-actions"
                          onClick={e => e.stopPropagation()}
                        >

                          <button
                            className="pix-document-delete"
                            onClick={e =>
                              handleDeleteSingle(doc, e)
                            }
                            disabled={isDeleting}
                            title="Delete document"
                          >

                            <Trash2 size={15} />

                          </button>

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