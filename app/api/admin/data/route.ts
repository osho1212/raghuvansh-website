import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;
  const correctPassword = process.env.ADMIN_PASSWORD || "RGPA@2026";
  return auth === correctPassword;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let enquiries: any[] = [];
  let auditions: any[] = [];

  // Fetch Enquiries from raghuvanshmock database
  try {
    const enquiriesRef = collection(db, "enquiries");
    const snapshot = await getDocs(enquiriesRef);
    enquiries = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || ""),
      };
    }).sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  } catch (err: any) {
    console.error("Firestore enquiries fetch error for raghuvanshmock:", err);
  }

  // Fetch Auditions from raghuvanshmock database
  try {
    const auditionsRef = collection(db, "auditions");
    const snapshot = await getDocs(auditionsRef);
    auditions = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || ""),
      };
    }).sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  } catch (err: any) {
    console.error("Firestore auditions fetch error for raghuvanshmock:", err);
  }

  return NextResponse.json({ enquiries, auditions });
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, type } = await request.json();

    if (!id || !type || (type !== "enquiries" && type !== "auditions")) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const docRef = doc(db, type, id);
    await deleteDoc(docRef);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete document from Firestore raghuvanshmock:", error);
    return NextResponse.json({ error: "Failed to delete: " + error.message }, { status: 500 });
  }
}
