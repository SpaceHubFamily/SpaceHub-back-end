
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('feature_room').del()
    .then(function () {
      // Inserts seed entries
      return knex('feature_room').insert([
        { feature_id: 1, room_id: 1 },
        { feature_id: 2, room_id: 1 },
        { feature_id: 3, room_id: 1 },
        { feature_id: 4, room_id: 1 },
        { feature_id: 1, room_id: 2 },
        { feature_id: 3, room_id: 2 },
        { feature_id: 6, room_id: 2 },
        { feature_id: 2, room_id: 3 },
        { feature_id: 5, room_id: 3 },
        { feature_id: 1, room_id: 4 },
        { feature_id: 3, room_id: 4 },
        { feature_id: 5, room_id: 4 },
        { feature_id: 3, room_id: 5 },
        { feature_id: 5, room_id: 5 },
        { feature_id: 1, room_id: 6 },
        { feature_id: 5, room_id: 6 },
        { feature_id: 6, room_id: 6 },
        { feature_id: 1, room_id: 7 },
        { feature_id: 3, room_id: 7 },
        { feature_id: 4, room_id: 7 },
        { feature_id: 6, room_id: 8 },
        { feature_id: 1, room_id: 9 },
        { feature_id: 3, room_id: 9 },
        { feature_id: 5, room_id: 9 },
        { feature_id: 6, room_id: 9 },
        { feature_id: 1, room_id: 10 },
        { feature_id: 2, room_id: 10 },
        { feature_id: 3, room_id: 10 },
        { feature_id: 2, room_id: 11 },
        { feature_id: 4, room_id: 11 },
        { feature_id: 5, room_id: 11 },
        { feature_id: 1, room_id: 12 },
        { feature_id: 5, room_id: 12 },
      ]);
    });
};
