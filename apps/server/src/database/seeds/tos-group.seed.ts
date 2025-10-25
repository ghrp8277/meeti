import { DataSource } from 'typeorm';
import { TosGroup } from '../../entities/tos-group.entity';
import { TosGroupPurpose } from '../../enums/tos-group-purpose.enum';

export class TosGroupSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const tosGroupRepository = dataSource.getRepository(TosGroup);

    const tosGroups = [
      {
        purpose: TosGroupPurpose.SIGNUP,
      },
    ];

    for (const groupData of tosGroups) {
      const existingGroup = await tosGroupRepository.findOne({
        where: { purpose: groupData.purpose },
      });

      if (!existingGroup) {
        const tosGroup = tosGroupRepository.create(groupData);
        await tosGroupRepository.save(tosGroup);
        console.log(`약관 그룹 생성됨: ${groupData.purpose}`);
      } else {
        console.log(`약관 그룹이 이미 존재함: ${existingGroup.purpose}`);
      }
    }
  }
}
