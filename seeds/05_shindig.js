
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shindig').del()
    .then(function () {
      // Inserts seed entries
      return knex('shindig').insert([
        {date: "2018-05-06T06:00:00.000Z", available: true, start_time: '2017-05-05T15:19:53.778Z', end_time: "2017-05-05T09:19:55.814Z", user_id: 3, room_id: 1},
        {date: "2017-04-03T06:00:00.000Z", available: false, start_time: '2017-05-05T15:19:53.778Z', end_time: "2017-05-05T09:19:55.814Z", user_id: 4, room_id: 2},
        {date: "2018-03-02T06:00:00.000Z", available: false, start_time: '2017-05-05T15:19:53.778Z', end_time: "2017-05-05T09:19:55.814Z", user_id: 1, room_id: 6},
        {date: "2017-08-01T06:00:00.000Z", available: true, start_time: '2017-05-05T15:19:53.778Z', end_time: "2017-05-05T09:19:55.814Z", user_id: 6, room_id: 1},
        {date: "2018-09-05T06:00:00.000Z", available: true, start_time: '2017-05-05T15:19:53.778Z', end_time: "2017-05-05T09:19:55.814Z", user_id: 2, room_id: 2},
        {date: "2017-10-07T06:00:00.000Z", available: true, start_time: '2017-05-05T15:19:53.778Z', end_time: "2017-05-05T09:19:55.814Z", user_id: 1, room_id: 1},
        {date: "2017-12-03T06:00:00.000Z", available: true, start_time: '2017-05-05T15:19:53.778Z', end_time: "2017-05-05T09:19:55.814Z", user_id: 3, room_id: 10},
        {date: "2017-11-02T06:00:00.000Z", available: false, start_time: '2017-05-05T15:19:53.778Z', end_time: "2017-05-05T09:19:55.814Z", user_id: 5, room_id: 5},
      ]);
    });
};
