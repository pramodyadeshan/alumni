import event from 'app/entities/event/event.reducer';
import donation from 'app/entities/donation/donation.reducer';
import job from 'app/entities/job/job.reducer';
import news from 'app/entities/news/news.reducer';
import volunteerOP from 'app/entities/volunteer-op/volunteer-op.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  event,
  donation,
  job,
  news,
  volunteerOP,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
