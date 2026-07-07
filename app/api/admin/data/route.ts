import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, deleteDoc, query, orderBy } from "firebase/firestore";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;
  const correctPassword = process.env.ADMIN_PASSWORD || "admin123";
  return auth === correctPassword;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch Enquiries
    const enquiriesRef = collection(db, "enquiries");
    const enquiriesQuery = query(enquiriesRef, orderBy("createdAt", "desc"));
    const enquiriesSnapshot = await getDocs(enquiriesQuery);
    const enquiries = enquiriesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
      };
    });

    // Fetch Auditions
    const auditionsRef = collection(db, "auditions");
    const auditionsQuery = query(auditionsRef, orderBy("createdAt", "desc"));
    const auditionsSnapshot = await getDocs(auditionsQuery);
    const auditions = auditionsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
      };
    });

    return NextResponse.json({ enquiries, auditions });
  } catch (error: any) {
    console.error("Failed to fetch admin data from Firestore:", error);
    return NextResponse.json({ error: "Failed to fetch data: " + error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, type } = await request.json(); // type: 'enquiries' | 'auditions'

    if (!id || !type || (type !== "enquiries" && type !== "auditions")) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const docRef = doc(db, type, id);
    await deleteDoc(docRef);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete document from Firestore:", error);
    return NextResponse.json({ error: "Failed to delete: " + error.message }, { status: 500 });
  }
}
