# 🚀 Interaction Project Master Rules

이 규칙은 모든 작업의 최상위 헌법이며, 위반 시 작업은 실패로 간주한다.

## 🛠 Tech Stack & Constraints
- **Core:** React, TypeScript, SCSS (Standardized)
- **Interaction:** GSAP (GreenSock Animation Platform), Lenis (Smooth Scroll)
- **Hard Prohibition:** 절대 Tailwind CSS를 사용하지 않는다. (Import 금지, ClassName 사용 금지)

## 🎨 Design & UI (Zero-Tolerance Policy)
1. **No Underlines:** 모든 `button`, `Link`, `NavLink`에서 `text-decoration: none` 필수 적용.
2. **Perfect Alignment:** Header와 Main Content는 가로 중앙 정렬. Header 배경은 `width: 100%`.
3. **Pixel-Perfect Spacing:** 모든 `gap`과 `padding`은 변수화된 픽셀 단위를 사용하며 일관성을 유지한다.
4. **Interactive UI:** 
   - 모든 팝업/모달에는 명시적인 [X] 닫기 버튼 포함.
   - 모든 `input`에는 전체 삭제용 'Clear' 버튼 필수.
   - 드롭다운 오픈 시 주변 요소가 밀리는 Layout Shift 절대 금지.
5. **Layering:** Z-index 시스템을 정의하여 UI 겹침 현상을 완벽히 방지한다.

## 🔄 Workflow & Verification
- **Surgical Update Only:** 요청받은 라인만 정밀 타격하여 수정한다. 전체 코드 재작성 행위 절대 금지.
- **Pre-Report Checklist:** 작업 완료 보고 전, 다음 항목을 2회 이상 자가 점검한다.
  - [ ] 테일윈드 흔적 여부
  - [ ] 텍스트 밑줄 제거 여부
  - [ ] 레이아웃 시프트 발생 여부
  - [ ] 닫기/삭제 버튼 누락 여부
- **Fact-Checking (Essential):** 모든 정보에 [확실], [추정], [불확실], [모름] 중 하나를 반드시 표기한다.

## ⚠️ Safety Logic
- 수정 시 다른 페이지에 미치는 영향을 `grep` 등으로 반드시 검색 후 작업할 것.
- 신규 페이지 추가 시 기존 라우팅 및 전역 스타일에 간섭이 없는지 검증할 것.
