import { NextResponse } from "next/server";
import { main } from "@/app/api/blog/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, res: NextResponse) {
  try {
    await main();
    const id: string = req.url.split("/blog/")[1];
    const post = await prisma.post.findFirst({ where: { id } });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: Request, res: NextResponse) {
  try {
    await main();
    const id: string = req.url.split("/blog/")[1];
    const { title, description } = await req.json();
    const post = await prisma.post.update({
      data: { title, description },
      where: { id },
    });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: Request, res: NextResponse) {
  try {
    await main();
    const id: string = req.url.split("/blog/")[1];
    const post = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json({ status: 204 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
