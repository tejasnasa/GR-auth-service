export const protectedR = (req: any, res: any, next: any) => {
  return res.status(200).json({ message: "Entered successfully" });
};
