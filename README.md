# 네이버페이 함수형 프로그래밍, ES6+, Node.js 기술 교육

## 1차 기본 과정 (7.9 ~ 8.13)
- ES6+ 기본기
- 이터러블/이터레이터/제너레이터
- Promise/async/await
- 함수형 프로그래밍
- 이터러블 프로그래밍
- 객체지향 프로그래밍 + 함수형 이터러블 프로그래밍
- 비동기/동시성/병렬성 프로그래밍
- 스케쥴러 개발
- 이미지 다루기

## 2차 심화 과정 (draft)
- 프론트엔드/백엔드 프로그래밍
- 에러 핸들링, 비동기/동시성 에러 핸들링
- SQL, 데이터베이스 핸들링, SQL 인젝션 완벽히 막기
- 실전 이터러블 프로그래밍

# 1차 기본 과정 상세

## 1회
1. ES6+ 기본기
    - 평가
    - 이터러블
    - 이터레이터
    - 제너레이터
    - 전개 연산자, 나머지 연산자, 구조 분해
2. 함수
    - 일급 함수
    - 고차 함수
3. map, filter
    - map
    - filter
4. 이터러블 프로토콜로 다시 만들기
    - map
    - filter
    - 이터러블 프로토콜의 다형성
5. 이터러블 프로토콜로 다시 만들기 2
    - L.map
    - L.filter
6. take와 range
    - take
    - range
    - L.take
    - L.range
7. 지연 평가와 제너레이터
    - L.map
    - L.filter
    - L.range
    - take, 동작 순서
8. 이터러블 프로토콜을 익혀야 하는 이유
9. [QnA] 이터러블 프로토콜 더 자세히 보기
 - for...of 가 내부적으로 하는 일
 - 이터레이터의 next를 호출하는 순서를 더 자세히 알 수 있도록
   제너레이터 없이 ES5 문법으로 지연 평가 L.range, L.map, L.filter, L.take 구현

## 2회
1. 축약하는 함수 reduce
    - reduce
    - add
    - count
2. 명령형을 이터러블 프로그래밍으로 전환
    - 홀수 n개 더하기 명령형 코드
    - if를 filter로
    - 값 변화 후 변수 할당을 map으로
    - break를 take로
    - 합산을 reduce로
    - 효율 비교하기
3. 함수를 다루는 함수
    - go
    - pipe
    - curry
4. 2차원 배열 다루기 flat
    - L.flat
5. 리얼월드
    - users
    - DOM findAll(sel, els)
6. 명령형을 이터러블 프로그래밍으로 전환 2
    - while을 range로
    - 효과를 each로 구분하기
    - 추억의 별 그리기
    - 추억의 구구단

## 3회
1. reduce 좀 더 익히기
    - countBy
    - groupBy
    - queryString
2. 명령형 습관 지우기 - 만능 reduce? No!
    - reduce(복잡한함수, acc, iter) 보다 reduce(함수, map(함수))
    - 복잡한 reduce 하나 보다 map + filter + reduce
    - queryString
    - fromQueryString
    - join 함수의 다형성
3. 함수를 설명하는 인자와 리턴 값
    - 표기법으로 생각하기
    - 함수 조합으로 생각하기
    - find, some, every
    - filter + reduce(identity)
    - 지연 평가 + take를 통한 최적화
4. 객체를 이터러블 프로그래밍으로 다루기
    - values
    - entries
    - keys
    - 어떤 값이든 이터러블 프로그래밍으로 다루기 - 제너레이터의 다형성
    - fromEntries
    - mapObject
    - pick
    - indexBy
    - indexBy된 값을 filter하기
5. 객체지향과 함께 사용하기
    - Map, Set, NodeList
    - Model, Collection 클래스 만들어서 이터러블 프로토콜 지원하기
    - Product, Products - 메서드를 함수형으로 구현하기

## 4회
1. 장바구니 만들기
    - ES6 템플릿 리터럴
    - 템플릿 리터럴과 표현식, 평가, 함수
    - 함수 조합으로 함수 만들기
2. 복잡한 장바구니
    - 복잡한 로직을 단순하게 만들어서 정복하기
    - map + flat
3. JSON 기반 프로그래밍의 장점
    - 백엔드/프론트엔드 장바구니 가격 계산 로직 공유
    - 결제 금액 조작 서버 검증

## 5회
1. 비동기/동시성 프로그래밍
    - callback과 Promise
    - 비동기를 값으로 만드는 Promise
    - 값으로서의 Promise 활용
    - 합성 관점에서의 Promise와 모나드
    - Promise를 Kleisli Composition 관점으로 보기
    - go, pipe, reduce에서 비동기 제어
    - promise.then의 중요한 규칙
2. 비동기/동시성 프로그래밍 2
    - 지연 평가 + Promise - L.map, map, take, L.filter, filter, nop, take
    - reduce에서 nop 지원
    - 지연 평가 + Promise의 효율성
3. 비동기/동시성 프로그래밍 3
    - 지연된 함수열을 병렬적으로 평가하기 - C.reduce, C.take
    - 즉시 병렬적으로 평가하기 - C.map, C.filter
    - 즉시, 지연, Promise, 병렬적 조합하기

## 6회
1. 시간을 이터러블로 다루기
    - range와 take의 재해석
    - takeWhile, takeUntil
2. 아임포트 결제 누락 처리 스케쥴러 만들기
    - API 설명
    - 결제된 내역 가져오기
    - 가맹점 DB의 주문서 가져오기
    - 비교 후 결제 취소 API 실행하기
    - 반복 실행하기
3. 프론트엔드에서 함수형/이터러블/동시성 프로그래밍
    - ES6 템플릿 리터럴 활용
    - 이미지 목록 그리기
    - 아이템 지우기
    - 커스텀 confirm 창과 Promise
    - 클래스를 대신 함수로 하는 추상화
    - 이미지 동시성 다루기
    - 동시성 부하 조절
    - 고차 함수로 더 작게 나누어 재사용성 높이기 - 데이터형 없애기
    - 상위 스코프 변수를 사용하는 함수와 아닌 함수들 쪼개기
    - DOM을 다루는 고차 함수

# 2차 심화 과정 상세 (draft)

## 1회
1. 안전한 합성
    - map으로 합성하기
    - find 대신 filter + take
    - 효과가 있는 함수
    - 효과가 없는 함수
    - map vs get, set
    - 사용자 정의 객체의 단점
2. 에러 핸들링
    - try/catch
3. 비동기 에러 핸들링
    - 왜 Array.prototype.map으로는 비동기 에러 핸들링이 안되는지?
    - Promise
    - async/await/try/catch

## 2회
1. 데이터 베이스
    - SQL 인젝션을 완벽히 막으려면?
    - SQL 함수형으로 다루기
    - INSERT, SELECT, UPDATE, DELETE
    - IN, NOT IN

2. 데이터베이스 트랜잭션과 에러 핸들링
    - 비동기를 동기화하기
    - 동시/병렬성 프로그래밍에서의 에러 핸들링/트랜젝션 문제 해결
    - async/await + try/catch 와 트랜잭션 조합

## 3회
1. 함수형 데이터 핸들링
    - SNS 데이터 WHERE IN 쿼리 후 groupBy, indexBy로 병합
    - rows to CSV, CSV to rows 함수형으로 다루기
    - 커머스 데이터 핸들링

2. 함수형으로 쿼리 최적화
    - 지연성으로 최적화
    - partition으로 최적화
    - Multiple UPDATE
    - Multiple DELETE

## 4회
1. 중첩 데이터 다루기
    - 깊은 값 조회
    - 깊은 값 변경

2. 불변성
    - 영속성
    - 깊은 값 불변적 변경

3. NoSQL을 잘 다루는 비결

## 5회
1. 백엔드 Node.js + 프론트엔드 VanillaJS 프로젝트 세팅
2. ES6 Module
3. 트랜스파일링 + 번들링
4. npm modules + 내부 라이브러리 관리

## 6회
1. 백엔드와 프론트엔드 코드 공유
2. JSON 기반 프로그래밍의 장점
3. 서버사이드 렌더링
4. API 서버

## 7회 ~ 9회
1. 코드 리뷰
2. N pay 최적화 보일러 플레이트 논의 및 적용
3. 앱 개발