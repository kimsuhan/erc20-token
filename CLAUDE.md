# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어 (Development Commands)

### 테스트 및 컴파일
- `npx hardhat test` - 스마트 컨트랙트 테스트 실행
- `REPORT_GAS=true npx hardhat test` - 가스 사용량 리포트와 함께 테스트 실행  
- `npx hardhat compile` - 컨트랙트 컴파일
- `npx hardhat clean` - 컴파일 artifacts 정리

### 네트워크 및 배포
- `npx hardhat node` - 로컬 하드햇 네트워크 실행
- `npx hardhat ignition deploy ./ignition/modules/KSHToken.ts --network localhost` - KSHToken 배포 (로컬)
- `npx hardhat ignition deploy ./ignition/modules/LWHToken.ts --network localhost` - LWHToken 배포 (로컬)
- `npx hardhat ignition deploy ./ignition/modules/KSHToken.ts --network sepolia` - KSHToken 배포 (Sepolia)

### 검증 및 기타
- `npx hardhat verify --network sepolia <contract-address> <constructor-args>` - Sepolia 네트워크에서 컨트랙트 검증

## 프로젝트 아키텍처

### 스마트 컨트랙트 구조
- **Token.sol**: OpenZeppelin ERC20을 상속받은 기본 토큰 컨트랙트
  - 생성자에서 name, symbol, initialSupply를 받아 초기 토큰 발행
  - 배포자에게 전체 초기 공급량 민팅

### 배포 모듈 시스템
- **Hardhat Ignition** 사용하여 배포 관리
- `ignition/modules/` 디렉토리에 토큰별 배포 모듈 분리:
  - `KSHToken.ts`: "KSHToken" (KSH) 토큰 배포
  - `LWHToken.ts`: "LWHToken" (LWH) 토큰 배포
- 각 모듈은 `initialSupply` 매개변수를 받아 토큰 공급량 설정

### 네트워크 설정
- **localhost**: 로컬 개발용 (chainId: 31337)
- **sepolia**: 테스트넷 배포용 (Infura 사용)
- 환경변수 필요: `INFURA_API_KEY`, `PRIVATE_KEY`

### 가스 리포팅
- **hardhat-gas-reporter** 설정으로 가스 사용량 추적
- KRW 단위로 비용 표시
- 메서드 시그니처 및 호출되지 않은 메서드 표시
- CoinMarketCap API를 통한 실시간 가격 정보

### 개발 도구
- **TypeChain**: Solidity 컨트랙트용 TypeScript 타입 생성
- **Hardhat Toolbox**: 테스팅, 검증, 가스 리포팅 통합
- **Chai + Mocha**: 테스트 프레임워크
- **dotenv**: 환경변수 관리

### 프로젝트 구조 패턴
- `contracts/main/`: 주요 스마트 컨트랙트
- `ignition/modules/`: 배포 스크립트 (토큰별 분리)
- `test/`: 테스트 파일
- `typechain-types/`: 자동 생성된 TypeScript 타입