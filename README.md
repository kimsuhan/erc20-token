# ERC20 Token Project

OpenZeppelin 기반의 커스텀 ERC20 토큰 구현 프로젝트입니다. KSH 토큰과 LWH 토큰 두 가지 토큰을 지원합니다.

## 주요 기능

- OpenZeppelin ERC20 표준 구현
- 배포 시 초기 공급량 설정 가능
- 가스 사용량 리포팅
- Sepolia 테스트넷 배포 지원
- TypeScript 타입 자동 생성

## 설치

```bash
# 의존성 설치
yarn install
# 또는
npm install
```

## 환경 설정

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
INFURA_API_KEY=your_infura_api_key
PRIVATE_KEY=your_private_key
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key (선택사항)
ETHERSCAN_API_KEY=your_etherscan_api_key (선택사항)
```

## 사용법

### 컴파일

```bash
npx hardhat compile
```

### 테스트

```bash
# 기본 테스트
npx hardhat test

# 가스 리포트와 함께 테스트
REPORT_GAS=true npx hardhat test
```

### 로컬 배포

```bash
# 로컬 네트워크 실행
npx hardhat node

# 다른 터미널에서 배포
npx hardhat ignition deploy ./ignition/modules/KSHToken.ts --network localhost
npx hardhat ignition deploy ./ignition/modules/LWHToken.ts --network localhost
```

### Sepolia 테스트넷 배포

```bash
npx hardhat ignition deploy ./ignition/modules/KSHToken.ts --network sepolia
npx hardhat ignition deploy ./ignition/modules/LWHToken.ts --network sepolia
```

### 컨트랙트 검증

```bash
npx hardhat verify --network sepolia <contract-address> <token-name> <token-symbol> <initial-supply>
```

## 토큰 정보

### KSH Token
- 이름: KSHToken
- 심볼: KSH
- 초기 공급량: 10,000 토큰

### LWH Token
- 이름: LWHToken
- 심볼: LWH
- 초기 공급량: 10,000 토큰

## 프로젝트 구조

```
├── contracts/
│   └── main/
│       └── Token.sol          # ERC20 토큰 컨트랙트
├── ignition/
│   └── modules/
│       ├── KSHToken.ts        # KSH 토큰 배포 모듈
│       └── LWHToken.ts        # LWH 토큰 배포 모듈
├── test/
│   └── Token.ts               # 토큰 테스트
├── hardhat.config.ts          # Hardhat 설정
└── typechain-types/           # 자동 생성된 TypeScript 타입
```

## 기술 스택

- **Hardhat**: 이더리움 개발 환경
- **OpenZeppelin**: 안전한 스마트 컨트랙트 라이브러리
- **TypeChain**: TypeScript 타입 생성
- **Chai + Mocha**: 테스트 프레임워크
- **Hardhat Gas Reporter**: 가스 사용량 분석
