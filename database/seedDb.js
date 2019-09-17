const { User, Listing, UserBooking } = require('./models')

const main = async () => {
  try {
    // empty both tables
    await User.destroy({ where: {} })
    await Listing.destroy({ where: {} })

    //user seed
    const James = await User.create({
      name: 'James Kim',
      username: 'jkim3360',
      email: 'jamesdaehokim@gmail.com',
      password: 'password',
      isRenter: false
    })
    const David = await User.create({
      name: 'David Grosh',
      username: 'dgrosh123',
      email: 'dgrosh123@gmail.com',
      password: 'password',
      isRenter: true
    })
    const Justin = await User.create({
      name: 'Justin Lendle',
      username: 'jlendle246',
      email: 'jlendle246@gmail.com',
      password: 'password',
      isRenter: true
    })
    const Connor = await User.create({
      name: 'Connor Garity',
      username: 'cg999',
      email: 'cgarity@gmail.com',
      password: 'password',
      isRenter: false
    })

    // Listing seed
    const Listing1 = await Listing.create({
      name: 'Brand New Apt Room with Modern Living Room',
      imgUrl: 'https://res.cloudinary.com/dg98/image/upload/v1568346848/airbnb/01e47e97-bf0f-4ee5-8cf2-e1f4d96b57f8.jpg',
      address: '878 57th St.',
      city: 'Brooklyn',
      state: 'NY',
      description: "2nd floor private room with shared bathroom with 2 of our guests. Newly renovated private room, spacious living room. Safe area, about 7-8 minuets walking distance to subway, 30-40 minuets by train to Manhattan like Times Square. Grocery stores, restaurants, bank, supermarket, laundromat are all around our place.",
      costPerNight: 52,
      beds: 2,
      adults: 2,
      freeWifi: true
    })
    const Listing2 = await Listing.create({
      name: 'Stunning Renovated Apartment with 2 Queen Beds',
      imgUrl: 'https://res.cloudinary.com/dg98/image/upload/v1568347128/airbnb/7c3907fb-ddc3-41e3-909c-55a91d6e982f.jpg',
      address: '101 Bostwick Ave',
      city: 'Jersey City',
      state: 'NJ',
      description: "Completely renovated apartment ready for your stay! We welcome you into our 2 bed 1 bath ground floor apartment which features 2 luxurious queen beds and a pull out couch in the living room that sleeps a total of 5 guests. Entertain with family and friends in our open layout between the kitchen, dining, and living room. Kitchen is fully stocked with all the essentials. Smart TV is provided - all you need to do is hook up your netflix or hulu account! We look forward to your stay.",
      costPerNight: 75,
      beds: 2,
      adults: 5,
      freeWifi: true
    })
    const Listing3 = await Listing.create({
      name: 'Modern Room in Huge Apartament in Manhattan',
      imgUrl: 'https://res.cloudinary.com/dg98/image/upload/v1568347337/airbnb/1f2f7f13-e9cd-4bc0-8595-567770d359d6.jpg',
      address: '1824 Amsterdam Ave',
      city: 'New York',
      state: 'NY',
      description: 'This is a beautiful private bedroom in a huge and very gorgeous, have access to kitchen, dining room, living room, also includes access to the bathroom',
      costPerNight: 29,
      beds: 1,
      adults: 3,
      freeWifi: false
    })
    const Listing4 = await Listing.create({
      name: 'Minutes to Manhattan in Industrial Chic Style Apt',
      imgUrl: 'https://res.cloudinary.com/dg98/image/upload/v1568347573/airbnb/5d3597d0-ecaa-4bfb-a535-1983f1635661.jpg',
      address: '350 Morgan St',
      city: 'Jersey City',
      state: 'NJ',
      description: 'Whether you’re here for a quick trip or a short-term rental, relax in this 1-bedroom apartment immersed in old world, historic Jersey City style. Exposed brick walls and masonry, original wood beams, and lofted ceilings create an industrial chic vibe that is idyllic for your stay in New York City.',
      costPerNight: 143,
      beds: 2,
      adults: 3,
      freeWifi: true
    })
    const Listing5 = await Listing.create({
      name: 'DTLA private room-pool/spa+Gym',
      imgUrl: 'https://res.cloudinary.com/dg98/image/upload/v1568347853/airbnb/a4396b76-6f1f-4c56-8e8d-568b782c4437.jpg',
      address: '665 S Bixel St',
      city: 'Los Angeles',
      state: 'California',
      description: 'This is private bedroom but share bathroom. If you need private bathroom,please go check my Master room Listing*** There is a difference between airbnb and the hotel. It is my home that I carefully arrange and clean.Please take off your shoes when you come in. No smoking and drug use in the room!Thank you ***',
      costPerNight: '19',
      beds: 1,
      adults: 2,
      freeWifi: true
    })
    const Listing6 = await Listing.create({
      name: 'Comuna Factory Celestial Room!!',
      imgUrl: 'https://res.cloudinary.com/dg98/image/upload/v1568348145/airbnb/faf4793f-0406-4945-83ba-edfd69756a49.jpg',
      address: '2216 Damon St',
      city: 'Los Angeles',
      state: 'California',
      description: 'One of a kind artist warehouse experience in the outskirts of Arts District in DTLA. 95% of the house is custom made. From the couches, chairs & lighting to the accents and art. Its an unconventional space in an industrial area, museums, restaurants, bars, coffee shops, & a grocery store nearby, bus stop is a 1 minute walk & there is free street parking in front. We enjoy hosting people & love getting to share our space with travelers. Lots of love, creativity & special surprises in every room!',
      costPerNight: '52',
      beds: 1,
      adults: 2,
      freeWifi: true
    })

    await Listing1.setUser(David)
    await Listing2.setUser(David)
    await Listing3.setUser(David)
    await Listing4.setUser(David)
    await Listing5.setUser(Justin)
    await Listing6.setUser(Justin)
    
  } catch (error) {
    throw error
  } finally {
    process.exit()
  }
}

main()
