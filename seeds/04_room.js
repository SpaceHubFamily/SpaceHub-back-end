
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('room').del()
    .then(function () {
      // Inserts seed entries
      return knex('room').insert([
        { name: "Orange", capacity: 40, hour_rate: 42.24, day_rate: 70.30, img_url: "http://ghk.h-cdn.co/assets/cm/15/11/54ff82285cf02-lving-room-green-gold-modern-de.jpg", venue_id: 2 },
        { name: "Black", capacity: 30, hour_rate: 18.53, day_rate: 75.34, img_url: "https://images-na.ssl-images-amazon.com/images/G/01/img16/home/content-grid/shop-by-room/sbr_storefront_tile_bed_750x375.jpg", venue_id: 3 },
        { name: "Peach", capacity: 73, hour_rate: 73.93, day_rate: 42.80, img_url: "https://image.shutterstock.com/z/stock-photo-empty-room-107272922.jpg", venue_id: 5 },
        { name: "Purple", capacity: 24, hour_rate: 24.28, day_rate: 170.20, img_url: "http://ghk.h-cdn.co/assets/cm/15/11/54ff8227d6954-living-room-gold-orange-xln.jpg", venue_id: 6 },
        { name: "Green", capacity: 19, hour_rate: 32.53, day_rate: 100.00, img_url: "http://cdn.home-designing.com/wp-content/uploads/2009/04/kids-study-room-skylight.jpg", venue_id: 1 },
        { name: "White", capacity: 28, hour_rate: 53.86, day_rate: 89.29, img_url: "https://www.gansevoorthotelgroup.com/content/slides/MEATPACKING-Superior-Room31.jpg", venue_id: 4},
        { name: "Rose", capacity: 53, hour_rate: 24.24, day_rate: 48.38, img_url: "https://s3.amazonaws.com/movoto-foundation/Foundation+Articles/2016/03/living-room-ideas-9-genius-ways-to-create-space/living-room-ideas-9-genius-ways-to-create-space-2.jpg", venue_id: 7 },
        { name: "Teal", capacity: 24, hour_rate: 18.19, day_rate: 24.19, img_url: "https://static1.squarespace.com/static/537261a3e4b06f7436cc8d37/t/53737004e4b0a52017d8d1bb/1400074245635/Great+Room.jpg", venue_id: 3 },
        { name: "Blue", capacity: 33, hour_rate: 30.24, day_rate: 73.20, img_url: "http://cdn.home-designing.com/wp-content/uploads/2010/12/beautiful-children-room-ideas.jpg", venue_id: 3 },
        { name: "Neon", capacity: 24, hour_rate: 24.94, day_rate: 25.73, img_url: "http://amari.azureedge.net/watergate/hotel-photos/deluxe-room-2.jpg", venue_id: 1 },
        { name: "Grey", capacity: 74, hour_rate: 39.63, day_rate: 130.53, img_url: "http://clv.h-cdn.co/assets/15/15/1428596092-home-sweet-home-living-room-0515.jpg", venue_id: 4 },
        { name: "Colbalt", capacity: 22, hour_rate: 24.35, day_rate: 140.23, img_url: "https://st.hzcdn.com/fimgs/27f1947b0426b6ea_1649-w500-h400-b0-p0--traditional-dining-room.jpg", venue_id: 6 },
      ]);
    });
};
