
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('action').del()
    .then(function () {
      // Inserts seed entries
      return knex('action').insert([
        {date: "05/29/2017", start_time: '3:45', end_time: "8:00", user_id: 3, room_id: 1},
        {date: "09/15/2017", start_time: '4:45', end_time: "9:45", user_id: 4, room_id: 2},
        {date: "06/17/2017", start_time: '7:30', end_time: "11:00", user_id: 1, room_id: 6},
        {date: "05/03/2017", start_time: '8:15', end_time: "11:30", user_id: 6, room_id: 1},
        {date: "07/04/2017", start_time: '4:39', end_time: "9:15", user_id: 2, room_id: 2},
        {date: "12/23/2017", start_time: '1:00', end_time: "5:45", user_id: 1, room_id: 1},
        {date: "09/26/2017", start_time: '7:00', end_time: "10:00", user_id: 3, room_id: 10},
        {date: "10/07/2017", start_time: '3:30', end_time: "7:30", user_id: 5, room_id: 5},
      ]);
    });
};
