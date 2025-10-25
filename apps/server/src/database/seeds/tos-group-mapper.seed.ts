import { DataSource } from 'typeorm';
import { TosGroupMapper } from '../../entities/tos-group-mapper.entity';
import { TosGroup } from '../../entities/tos-group.entity';
import { Tos } from '../../entities/tos.entity';
import { TosGroupPurpose } from '../../enums/tos-group-purpose.enum';

export class TosGroupMapperSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const tosGroupMapperRepository = dataSource.getRepository(TosGroupMapper);
    const tosGroupRepository = dataSource.getRepository(TosGroup);
    const tosRepository = dataSource.getRepository(Tos);

    // 회원가입 약관 그룹 찾기
    const signupGroup = await tosGroupRepository.findOne({
      where: { purpose: TosGroupPurpose.SIGNUP },
    });

    if (!signupGroup) {
      console.log(
        '약관 그룹을 찾을 수 없습니다. 먼저 TosGroupSeed를 실행하세요.',
      );
      return;
    }

    // 모든 약관들 찾기
    const allTos = await tosRepository.find();

    // 약관 매핑 (필수/선택 구분)
    const requiredCodes = [
      'TERMS_OF_SERVICE',
      'PRIVACY_COLLECTION',
      'PRIVACY_THIRD_PARTY',
      'ELECTRONIC_FINANCE',
      'AGE_VERIFICATION',
    ];

    let seq = 1;
    for (const tos of allTos) {
      const existingMapper = await tosGroupMapperRepository.findOne({
        where: {
          tosGroupId: signupGroup.id,
          tosId: tos.id,
        },
      });

      if (!existingMapper) {
        const isRequired = requiredCodes.includes(tos.code);
        const mapper = tosGroupMapperRepository.create({
          tosGroupId: signupGroup.id,
          tosId: tos.id,
          seq: seq++,
          isRequired: isRequired,
        });
        await tosGroupMapperRepository.save(mapper);
        console.log(
          `${isRequired ? '필수' : '선택'} 약관 매핑 생성됨: ${tos.title} -> ${signupGroup.purpose}`,
        );
      }
    }
  }
}
