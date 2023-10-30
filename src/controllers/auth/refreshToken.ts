import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../../models/user";

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("Bạn chưa đăng nhập");

    const token = authHeader && (authHeader.split(" ")[1] as string);
    const userId = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;

    const user = await User.findById(userId?.["_id"]);

    const newToken = jwt.sign({ user }, process.env.JWT_SECRET as Secret, {
      expiresIn: "1m",
    });

    const refreshToken = jwt.sign(
      { _id: user?.["_id"] },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "30d",
      }
    );

    return res.status(200).json({
      success: true,
      token: newToken,
      refreshToken,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
