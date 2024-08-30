# [Lumia.kr](https://lumia.kr)

## 🔎 Introduction

이터널 리턴 게임 전적 검색 사이트 백엔드 레포지토리입니다.

- <b>배포</b> : https://lumia.kr
- <b>기간</b> : 2023. 09. ~ ing
- <b>기여</b> : Front / Back-End 한정현

<br>

## ⚒ Stacks

### Front-End

- React
- MUI

### Back-End

- GCP Compute Engine. Ubuntu 22.04 LTS
- AWS RDS (with PostgreSQL)
- Nginx
- PM2
- Typescript
- NestJS (with Express)
- TypeORM
- BullMQ (with Redis)
- Grafana & Prometheus
- Swagger
- ERDCloud
- Insomnia

<br>

## 📌 Features

- 플레이어 전적 검색
- 시즌별 리더보드
- 게임 데이터 분석 통계 자료
- 인게임 아이템 정보 제공

<br>

## 📑 [API Docs & DTO Schemas (with Swagger)](https://lumia.kr/api)

<img src="https://lumia.kr/image/swagger.png"/>

## Architecture

### Application Architecture

<img src="https://lumia.kr/image/Architecture.png"/>

### Message Queue Architecture

<img src="https://lumia.kr/image/queue.png"/>

## [ERD](https://www.erdcloud.com/d/gw6jbdmuvZtchzJsb)

<img src="https://lumia.kr/image/erd.png"/>

## Visualization & Dashboard (with Grafana & Prometheus)

<img src="https://lumia.kr/image/Demo/grafana.png"/>

<br>

## Troubleshooting

- [Statistics를 활용한 Multi Column Index 성능 개선](https://hjhdev.tistory.com/7)
- [Materialized View 도입](https://hjhdev.tistory.com/8)
- [Bulk Upsert 문제점 해결](https://hjhdev.tistory.com/9)
- [TypeORM Real Number Mapping](https://hjhdev.tistory.com/6)

<br>

## Demo

### 메인 화면

- 최근 패치 노트 바로가기
- 최근 검색한 플레이어 목록
- 랭킹 데이터 프리뷰

<img width="400" src="https://lumia.kr/image/Demo/MainPage.png"/>

### 개인 프로필 화면

- 플레이어 정보 제공
- 인게임 내 상세 데이터 제공

<div style="display: flex; gap: 16px">
  <img width="400" src="https://lumia.kr/image/Demo/PlayerPage.png"/>
  <img width="400" src="https://lumia.kr/image/Demo/more.png"/>
</div>

### 통계 화면

- 버전 & 티어 & 매칭모드 통계 자료 제공
- 정렬 기능

<img width="400" src="https://lumia.kr/image/Demo/StatisticsPage.png"/>

### 랭킹 화면

- 시즌별 데이터 필터링
- 페이지네이션

<img width="400" src="https://lumia.kr/image/Demo/RankingPage.png"/>

<br>

## Reference

- [이터널 리턴 Open API 문서](https://developer.eternalreturn.io/static/media/Docs_KR_20230722.pdf)
- [이미지 리소스](https://drive.google.com/drive/folders/1bgW32L09YPpRgQKtH4C_TAd3Kr0N9Y90)
- Eternal Return and all related logos are trademarks of Nimble Neuron, inc. or its affiliates.
