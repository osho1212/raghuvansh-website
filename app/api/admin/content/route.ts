import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;
  const correctPassword = process.env.ADMIN_PASSWORD || "RGPA@2026";
  return auth === correctPassword;
}

export async function GET() {
  try {
    const ramayanDoc = await getDoc(doc(db, "content", "ramayan"));
    const prodDoc = await getDoc(doc(db, "content", "productions"));

    const defaultGlimpses = [
      "myAHgdaFJbk",
      "Q7sO8kL0S88",
      "xhj7PqgMrDI",
      "I5Rs8_zG-FA",
      "sILv2SqlBsI"
    ];

    const glimpses = ramayanDoc.exists() && ramayanDoc.data().glimpses?.length > 0
      ? ramayanDoc.data().glimpses
      : defaultGlimpses;

    const productions = prodDoc.exists() ? prodDoc.data().productions || [] : [];

    return NextResponse.json({ glimpses, productions });
  } catch (error: any) {
    console.error("Content GET error:", error);
    return NextResponse.json({ glimpses: [], productions: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json(); // { type: 'ramayan' | 'productions', payload: any }
    const { type, payload } = body;

    if (type === "ramayan") {
      await setDoc(doc(db, "content", "ramayan"), { glimpses: payload }, { merge: true });
    } else if (type === "productions") {
      await setDoc(doc(db, "content", "productions"), { productions: payload }, { merge: true });
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Content POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
