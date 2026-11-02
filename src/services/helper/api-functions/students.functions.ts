import { ID, Query } from "appwrite";
import { storage, tabledb } from "../../../lib/AppwriteClient";
import type { StudentPayloadType } from "../../validation/CRUDformSchema";

import type { Students as StudentType } from "../../../types/interface/student.interface";

// ============ CREATE STUDENTS =============

export const createStudentFns = async (payload: StudentPayloadType) => {
  try {
    console.log("Student Payload:", payload);

    let profileImageUrl = null;

    // Upload Profile Image
    if (payload.profilePhoto) {
      const uploadImage = await storage.createFile({
        bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
        fileId: ID.unique(),
        file: payload.profilePhoto,
      });

      console.log("Uploaded Image:", uploadImage);

      const viewImage = storage.getFileView({
        bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
        fileId: uploadImage.$id,
      });

      profileImageUrl = viewImage;
    }

    // Create Student Row
    const response = await tabledb.createRow({
      databaseId: import.meta.env.VITE_APPWRITE_TABLEDB_ID,
      tableId: import.meta.env.VITE_APPWRITE_STUDENTS_TABLE_ID,
      rowId: ID.unique(),
      data: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        course: payload.course,
        profileImageUrl: profileImageUrl,
        status: true,
      },
    });

    return {
      success: true,
      message: "Student Created Successfully!",
      data: response as unknown as StudentType,
    };
  } catch (error: any) {
    console.log("Error in createStudentFns:", error.message);

    return {
      success: false,
      message: error?.message,
    };
  }
};


// ============ GET STUDENTS =============

export const getStudentsFns = async (params) => {
  try {
    const response = await tabledb.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_TABLEDB_ID,
      tableId: import.meta.env.VITE_APPWRITE_STUDENTS_TABLE_ID,
      queries: [
        Query.contains("name", params.search),
        Query.limit(params.limit),
            Query.orderDesc("$createdAt"),
      ],
    });

    console.log("Student Response:", response);

    return {
      success: true,
      message: "Students Fetched Successfully!",
      data: response.rows as unknown as StudentType[],
    };
  } catch (error: any) {
    console.log("Error in getStudentsFns:", error.message);

    return {
      success: false,
      message: error?.message,
    };
  }
};


// ============ UPDATE STUDENT STATUS =============

export const studentStatusChangeFns = async ({ id, status }) => {
  try {
    const response = await tabledb.updateRow({
      databaseId: import.meta.env.VITE_APPWRITE_TABLEDB_ID,
      tableId: import.meta.env.VITE_APPWRITE_STUDENTS_TABLE_ID,
      rowId: id,
      data: {
        status: status,
      },
    });

    console.log("Student Status Changed:", id, status);

    return {
      success: true,
      message: "Student Status Updated Successfully!",
      data: response,
    };
  } catch (error: any) {
    console.log("Error in studentStatusChangeFns:", error.message);

    return {
      success: false,
      message: error?.message,
    };
  }
};


// ============ DELETE STUDENT =============

export const studentDeleteFns = async (id: string) => {
  try {
    const response = await tabledb.deleteRow({
      databaseId: import.meta.env.VITE_APPWRITE_TABLEDB_ID,
      tableId: import.meta.env.VITE_APPWRITE_STUDENTS_TABLE_ID,
      rowId: id,
    });

    return {
      success: true,
      message: "Student Deleted Successfully!",
      data: response,
    };
  } catch (error: any) {
    console.log("Error in studentDeleteFns:", error.message);

    return {
      success: false,
      message: error?.message,
    };
  }
};



// ================= VIEW STUDENT-DETAILS =================

export const studentDetailsFns = async (id: string) => {
  try {
    const response = await tabledb.getRow({
      databaseId: import.meta.env.VITE_APPWRITE_TABLEDB_ID,
      tableId: import.meta.env.VITE_APPWRITE_STUDENTS_TABLE_ID,
      rowId: id,
    });

    return {
      success: true,
      message: "Student details fetched successfully",
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unable to fetch student details",
      data: null,
    };
  }
};