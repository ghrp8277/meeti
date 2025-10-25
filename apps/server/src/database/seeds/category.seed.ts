import { DataSource } from 'typeorm';
import { Category } from '../../entities/category.entity';

export class CategorySeed {
  public async run(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);

    const categories = [
      { name: '콘서트' },
      { name: '뮤지컬/공연' },
      { name: '스포츠' },
    ];

    const sportsSubCategories = [
      { name: '야구', parentId: null },
      { name: '축구', parentId: null },
      { name: '배구', parentId: null },
      { name: '농구', parentId: null },
    ];

    for (const categoryData of categories) {
      const existingCategory = await categoryRepository.findOne({
        where: { name: categoryData.name },
      });

      if (!existingCategory) {
        const category = categoryRepository.create(categoryData);
        await categoryRepository.save(category);
        console.log(`카테고리 생성됨: ${categoryData.name}`);
      } else {
        console.log(`카테고리 이미 존재: ${categoryData.name}`);
      }
    }

    const sportsCategory = await categoryRepository.findOne({
      where: { name: '스포츠' },
    });

    if (sportsCategory) {
      for (const subCategoryData of sportsSubCategories) {
        const existingSubCategory = await categoryRepository.findOne({
          where: { name: subCategoryData.name },
        });

        if (!existingSubCategory) {
          const subCategory = categoryRepository.create({
            name: subCategoryData.name,
            parentId: sportsCategory.id,
          });
          await categoryRepository.save(subCategory);
          console.log(`스포츠 하위 카테고리 생성됨: ${subCategoryData.name}`);
        } else {
          console.log(
            `스포츠 하위 카테고리 이미 존재: ${subCategoryData.name}`,
          );
        }
      }
    }
  }
}
