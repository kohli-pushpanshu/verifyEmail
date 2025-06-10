import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      throw new Error("No token found");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as jwt.JwtPayload;

    if (!decodedToken || typeof decodedToken !== "object" || !decodedToken.id) {
      throw new Error("Invalid token structure");
    }

    return decodedToken.id;

  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};
