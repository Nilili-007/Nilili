# NILILI
### [바로가기](https://nilili-chi.vercel.app/)
<br/>

## 기획 의도
국내 여행 코스를 직접 만들어 공유할 수 있으며, 다른 사람들의 코스를 참고 하고 상호 작용할 수도 있는 커뮤니티입니다. 지역 별로 , 해시태그 별로 각자의 요구에 맞는 여행 코스를 쉽게 접할 수 있습니다. 코스와 장소에 리뷰를 남겨 각자의 경험을 공유하여 보다 나은 여행 경험을 만들기 위해 제작되었습니다.
<br/>
<br/>

## Contributor
||깃허브|블로그|
|------|---|---|
|정서연(리더)|https://github.com/seoyeon-jung|https://daydream-sy.tistory.com/|
|김선형(부리더)|https://github.com/hobak12|https://seonchoco.tistory.com/|
|조희현|https://github.com/hiheecho|https://velog.io/@jhh7929|
|변시윤|https://github.com/cinephi1e|https://velog.io/@cinephile|
<br/>

## Tech Stack
- React + Typescript
- 전역적으로 state를 관리하기 위해 **Redux Toolkit**를 사용했습니다
- Redux Toolkit에 내장되어 있어 별도의 설치 없이 서버 state를 관리하기 위해 **RTK Query**를 사용했습니다
- 일관성 있는 디자인 시스템을 적용하기 위해 **tailwind css**를 사용했습니다
- 하나의 컴포넌트 안에 유동적인 className을 지정해서 className이 변할 때마다 스타일을 다르게 처리해줘야 하는 작업이 필요해서 **styled-components**를 부분적으로 사용했습니다
- 하나의 라이브러리로 데이터 베이스까지 관리할 수 있어 빠른 백엔드 시스템 구축을 위해 **firebase**를 사용했습니다
- 간편한 배포를 위해 배포 시스템인 **Vercel**을 이용했습니다
<br/>
<br/>

## 서비스 아키텍처
![nilili-서비스 아키텍처 drawio](https://user-images.githubusercontent.com/95006849/221066852-694415c8-2295-4cc4-b9ff-1bc8f9775d67.png)
<br/>
<br/>
<br/>

## 실제 구현된 페이지
|메인 페이지|검색 페이지|
|------|---|
|<img src="https://user-images.githubusercontent.com/95006849/221067188-eb7ad7f9-1c15-4656-b79d-44f78aa1f4d0.png" width="800" />|<img src="https://user-images.githubusercontent.com/95006849/221068968-8e874428-0f30-47bf-9241-c585dd4564c6.png" width="800" />|
|글쓰기 페이지|디테일 페이지|
|<img src="https://user-images.githubusercontent.com/95006849/221067885-49afa90d-7258-49d7-9abc-da6adf46cd1e.png" width="800" />|<img src="https://user-images.githubusercontent.com/95006849/221068174-44fd1a26-e090-49cb-90a3-830ac66302b2.png" width="800" />|
|유저 페이지||
|<img src="https://user-images.githubusercontent.com/95006849/221067954-7779343f-e1bf-4f09-9403-607fbf3960d2.png" width="800" />||
