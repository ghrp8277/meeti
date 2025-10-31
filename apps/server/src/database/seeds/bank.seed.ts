import { DataSource } from 'typeorm';
import { Bank } from '../../entities/bank.entity';

export class BankSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const bankRepository = dataSource.getRepository(Bank);

    const banks = [
      { code: '002', name: 'KDB산업은행' },
      { code: '003', name: 'IBK기업은행' },
      { code: '004', name: 'KB국민은행' },
      { code: '005', name: 'KEB하나은행' },
      { code: '007', name: '수협은행' },
      { code: '011', name: 'NH농협은행' },
      { code: '020', name: '우리은행' },
      { code: '023', name: 'SC은행' },
      { code: '027', name: '씨티은행' },
      { code: '031', name: '대구은행' },
      { code: '032', name: '부산은행' },
      { code: '034', name: '광주은행' },
      { code: '035', name: '제주은행' },
      { code: '037', name: '전북은행' },
      { code: '039', name: '경남은행' },
      { code: '045', name: 'MG새마을금고' },
      { code: '048', name: '신협' },
      { code: '050', name: '저축은행' },
      { code: '064', name: '산림조합' },
      { code: '071', name: '우체국' },
      { code: '081', name: '하나은행' },
      { code: '088', name: '신한은행' },
      { code: '089', name: '케이뱅크' },
      { code: '090', name: '카카오뱅크' },
      { code: '092', name: '토스뱅크' },
      { code: '103', name: 'SBI저축은행' },
      { code: '218', name: 'KB증권' },
      { code: '230', name: '미래에셋증권' },
      { code: '238', name: '미래에셋증권' },
      { code: '240', name: '삼성증권' },
      { code: '243', name: '한국투자증권' },
      { code: '247', name: 'NH투자증권' },
      { code: '261', name: '교보증권' },
      { code: '262', name: '하이투자증권' },
      { code: '263', name: '현대차투자증권' },
      { code: '264', name: '키움증권' },
      { code: '265', name: '이베스트증권' },
      { code: '266', name: 'SK증권' },
      { code: '267', name: '대신증권' },
      { code: '269', name: '한화투자증권' },
      { code: '270', name: '하나증권' },
      { code: '271', name: '토스증권' },
      { code: '278', name: '신한투자증권' },
      { code: '279', name: 'DB금융투자' },
      { code: '280', name: '유진투자' },
      { code: '287', name: '메리츠증권' },
      { code: '888', name: '토스머니' },
      { code: '889', name: '토스포인트' },
    ];

    for (const bankData of banks) {
      const existingBank = await bankRepository.findOne({
        where: { code: bankData.code },
      });

      if (!existingBank) {
        const bank = bankRepository.create(bankData);
        await bankRepository.save(bank);
        console.log(`은행 생성됨: ${bankData.name} (${bankData.code})`);
      } else {
        console.log(`은행 이미 존재: ${bankData.name} (${bankData.code})`);
      }
    }
  }
}
