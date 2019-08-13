import * as Images from "../modules/Images/index.js";
import * as UI from "../modules/UI/index.js";
import { go, L, C, each, delay } from "../node_modules/fxjs2/index.js";

(async () => {
  await Images.main();

  // UI.message([{type: 'ok', name: '확인', resolve: _ => true}], '확인되었습니다.');
  // UI.message([
  //   {type: 'cancel', name: '취소', resolve: _ => false},
  //   {type: 'ok', name: '확인', resolve: _ => true}
  // ], '확인되었습니다.');
  // UI.alert('확인되었습니다.');
  // UI.alert('확인되었습니다.');
  // console.log(await UI.prompt('확인되었습니다.'));
}) ();
