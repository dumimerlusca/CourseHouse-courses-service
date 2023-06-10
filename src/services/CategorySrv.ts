import { Prisma } from "@prisma/client";
import { prisma } from "../prisma-client";

export class CategorySrv {
  static async findSubcategory(data: Prisma.SubCategoryWhereInput) {
    return await prisma.subCategory.findFirst({
      where: data,
    });
  }
}
