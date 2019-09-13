const { User, Listing } = require('./models')

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
      isRenter: false
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
      name: 'Listing 1',
      imgUrl: 'https://s.hdnux.com/photos/55/00/11/11797069/3/gallery_medium.jpg',
      address: '324 Springfield rd.',
      city: 'Springfield',
      state: 'NJ',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi fugiat quam, sapiente molestiae, veritatis sed a eveniet odio enim assumenda unde harum facere aut soluta laborum ex officia cupiditate exercitationem!',
      costPerNight: 75,
      beds: 6,
      adults: 6,
      freeWifi: true
    })
    const Listing2 = await Listing.create({
      name: 'Listing 2',
      imgUrl: 'http://s3.amazonaws.com/timeinc-houseplans-v2-production/house_plan_images/9228/original/SL-1352_HallsleyStreetofHope_Front.jpg?1511369547',
      address: ' ',
      city: '',
      state: '',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi fugiat quam, sapiente molestiae, veritatis sed a eveniet odio enim assumenda unde harum facere aut soluta laborum ex officia cupiditate exercitationem!',
      costPerNight: 60,
      beds: 3,
      adults: 4,
      freeWifi: false
    })
    const Listing3 = await Listing.create({
      name: 'Listing 3',
      imgUrl: 'https://photos.zillowstatic.com/p_e/ISa130i7mzet1j1000000000.jpg',
      address: ' ',
      city: ' ',
      state: '',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi fugiat quam, sapiente molestiae, veritatis sed a eveniet odio enim assumenda unde harum facere aut soluta laborum ex officia cupiditate exercitationem!',
      costPerNight: 80,
      beds: 4,
      adults: 4,
      freeWifi: true
    })
    const Listing4 = await Listing.create({
      name: 'Listing 4',
      imgUrl: 'https://www.incimages.com/uploaded_files/image/1940x900/getty_856794670_385651.jpg',
      address: ' ',
      city: ' ',
      state: '',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi fugiat quam, sapiente molestiae, veritatis sed a eveniet odio enim assumenda unde harum facere aut soluta laborum ex officia cupiditate exercitationem!',
      costPerNight: 60,
      beds: 6,
      adults: 6,
      freeWifi: true
    })

    await Listing1.setUser(David)
    await Listing2.setUser(David)
    await Listing3.setUser(David)
    await Listing4.setUser(David)

  } catch (error) {
    throw error
  } finally {
    process.exit()
  }
}

main()
