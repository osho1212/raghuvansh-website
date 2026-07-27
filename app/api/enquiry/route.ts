import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const payload = {
      name,
      email,
      subject: subject || "General",
      message,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "enquiries"), payload);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    console.error("Server API enquiry save error for raghuvanshmock:", error);
    return NextResponse.json({ error: error.message || "Failed to submit enquiry" }, { status: 500 });
  }
}
