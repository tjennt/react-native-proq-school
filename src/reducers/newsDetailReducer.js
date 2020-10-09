import { ADD } from '../actions/newsDetailActions';

const title = '';

export default function (state = title, action) {
  switch (action.type) {
    case ADD:
    return title + "Tiêu đề";
    default:
      return title +  "tieeue acsad";
  }
}