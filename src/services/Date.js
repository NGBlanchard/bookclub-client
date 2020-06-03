import Moment from 'moment';

export default function Date({ date }) {
  Moment.locale('en');
  return (Moment(date).format("MMMM Do, YYYY"))
}
