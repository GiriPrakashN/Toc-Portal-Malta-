/* =========================================================
   PNP
========================================================= */


import "@pnp/sp/webs";

import "@pnp/sp/lists";

import "@pnp/sp/items";

import "@pnp/sp/files";

/* =========================================================
   MODELS
========================================================= */

import {
  IDocumentItem,
} from "../models/IDocumentItem";

/* =========================================================
   MOCK DATA
========================================================= */

import {
  documents,
} from "../data/documents";
import { getSP } from "./sp";

/* =========================================================
   SWITCH
========================================================= */

const USE_SHAREPOINT_SOURCE = true;

/* =========================================================
   DOCUMENT LIBRARY
========================================================= */

const DOCUMENT_LIBRARY_NAME =
  "PIX Executive Documents";

/* =========================================================
   SERVICE
========================================================= */

class DocumentsService {

  /* ======================================================
     GET DOCUMENTS
  ====================================================== */

  public async getDocuments():
    Promise<IDocumentItem[]> {

    /* ====================================================
       MOCK SOURCE
    ===================================================== */

    if (!USE_SHAREPOINT_SOURCE) {

      return documents;
    }

    /* ====================================================
       SHAREPOINT SOURCE
    ===================================================== */

    try {


const sp = getSP();

if (!sp) {

  console.error(
    "[DocumentsService] SP is not initialized"
  );

  return documents;
}

const items =
  await sp.web
          .lists
          .getByTitle(
            DOCUMENT_LIBRARY_NAME
          )
          .items
          .select(
            "*",
            "FileLeafRef",
            "FileRef",
            "Modified",
            "Editor/Title"
          )
          .expand("Editor")
          .orderBy(
            "Modified",
            false
          )
          .top(50)();

      return items.map((item) => ({

        id: item.Id,

        title:
          item.Title ||
          item.FileLeafRef,

        fileName:
          item.FileLeafRef,

        fileType:
          item.File_x0020_Type,

       fileUrl:
  `${window.location.origin}${item.FileRef}`,

        modified:
          item.Modified,

        modifiedBy:
          item.Editor?.Title ||
          "Unknown",

        approvalStatus:
          item.ApprovalStatus ||
          "Active",

        category:
          item.Category,

        region:
          item.Region,
      }));

    } catch (error) {

      console.error(
        "[DocumentsService] Failed to load documents",
        error
      );

      return [];
    }
  }

  /* ======================================================
   UPLOAD DOCUMENT
====================================================== */

public async uploadDocument(
  file: File
): Promise<boolean> {

  try {

    const sp = getSP();

    if (!sp) {

      console.error(
        "[DocumentsService] SP not initialized"
      );

      return false;
    }

    await sp.web
      .getFolderByServerRelativePath(
        DOCUMENT_LIBRARY_NAME
      )
      .files
      .addUsingPath(
        file.name,
        file,
        {
          Overwrite: true
        }
      );

    return true;

  } catch (error) {

    console.error(
      "[DocumentsService] Upload failed",
      error
    );

    return false;
  }
}

}


export default new DocumentsService();