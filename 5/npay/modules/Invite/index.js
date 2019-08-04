import * as $ from '../$.js';
import { strMap, go, map, pipe, tap, filter, indexBy } from "../../node_modules/fxjs2/index.js";
import * as UI from "../UI/index.js";

export const open = () => new Promise(async resolve => {
  const users = await $.get('/api/friends', undefined);
  const indexedUsers = indexBy(u => u.id, users);
  go(
    UI.page.open({
      title: '친구들',
      done: '완료',
      name: 'invite',
      body: `
        <table> 
          ${strMap(u => `
            <tr class="user" fx-id="${u.id}">
              <td class="name">${u.name}</td>
              <td class="check"><input type="checkbox"></td>  
            </tr>
          `, users)}
        </table>
      `
    }),
    $.find('.header .done'),
    $.on('click', ({target}) => go(
      target,
      $.closest('.page'),
      tap(
        $.findAll('.user input[type="checkbox"]:checked'),
        map(pipe($.closest('.user'), $.attr('fx-id'), parseInt)),
        map(id => indexedUsers[id]),
        resolve),
      UI.page.close
    ))
  );
});

const Invite = {
  open
};

export default Invite;