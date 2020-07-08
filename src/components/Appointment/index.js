import React from 'react';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';

import 'components/Appointment/styles.scss';

export default function Appointment({ time, interview }) {
  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? <Show {...interview} /> : <Empty />}
    </article>
  );
}
