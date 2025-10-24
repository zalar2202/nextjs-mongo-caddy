import { connectToDB } from "@/lib/mongoose";
export default async function dbConnect() {
  return connectToDB();
}
