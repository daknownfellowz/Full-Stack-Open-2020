const listHelper = require('../utils/list_helper')

test('dummy returns 1', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  const emptyList = []

  const listWithOneBlog = [
    {
      title: "Rallimiehet kujalla",
      author: "William Shatner",
      url: "http://www.rallitkujalla.com/superblogi",
      likes: 5,
      id: "62a8d075c0fba1788b380b31"
      }
  ]

  const blogs = [
    {
      title: "Rallimiehet kujalla",
      author: "William Shatner",
      url: "http://www.rallitkujalla.com/superblogi",
      likes: 5,
      id: "62a8d075c0fba1788b380b31"
      },
      {
      title: "Politiikan broilerit",
      author: "Ylen toimittajat",
      url: "http://www.poliitikanbroilerit.com/blaablaa",
      likes: 100,
      id: "62a8d148c0fba1788b380b34"
      },
      {
      title: "4.2 blogilista step2 vaiheen blogi",
      author: "HardcoderX",
      url: "http://www.koodarivekkulit.com/blaablaa",
      likes: 2,
      id: "62a8df40ad4b200d05dcdcdd"
      }  
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(107)
  })

})