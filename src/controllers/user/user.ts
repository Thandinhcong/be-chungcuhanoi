import { Request } from "express";
import { Response } from "express";
import { IUser } from "../../interfaces/user";

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user: IUser = req?.["user"];
    return res.status(200).json({
      success: true,
      message: "Lấy thông tin người dùng thành công",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};
