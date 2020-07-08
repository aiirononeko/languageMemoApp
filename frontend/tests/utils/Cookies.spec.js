import Cookies from "@/utils/Cookies"

describe('getMultiple', () => {
  it('指定されたkeyの値を取得できるか', () => {
    document.cookie = 'testingCookie=yes'
    document.cookie = 'testingCookie2=yup'
    document.cookie = 'testingCookie3=yoo'
    const cookies = new Cookies()
    const result = cookies.getMultiple(['testingCookie', 'testingCookie2'])

    expect(result.testingCookie).toBe('yes')
    expect(result.testingCookie2).toBe('yup')
    expect(result.testingCookie3).toBeFalsy()
  })
})


describe('removeAll', () => {
  it('指定されたkeyが全て、取り除かれるか', () => {
    document.cookie = 'testingCookie=yes'
    document.cookie = 'testingCookie2=yup'
    const cookies = new Cookies()
    cookies.removeAll(['testingCookie', 'testingCookie2'])
    expect(cookies.get('testingCookie')).toBeFalsy()
    expect(cookies.get('testingCookie2')).toBeFalsy()
  })
})

describe('isCookiesDefined', () => {
  it('指定されたkeyが全て、定義されているとき、trueか', () => {
    document.cookie = 'testingCookie=yes'
    document.cookie = 'testingCookie2=yup'
    const cookies = new Cookies()
    expect(cookies.isCookiesDefined(['testingCookie', 'testingCookie2'])).toBeTruthy()
  })

  it('一部のkeyが"undefined"のとき、falseか', () => {
    document.cookie = 'testingCookie=yes'
    document.cookie = 'testingCookie2=undefined'
    const cookies = new Cookies()
    expect(cookies.isCookiesDefined(['testingCookie', 'testingCookie2'])).toBeFalsy()
  })

  it('すべてのkeyが"undefined"のとき、falseか', () => {
    document.cookie = 'testingCookie=undefined'
    document.cookie = 'testingCookie2=undefined'
    const cookies = new Cookies()
    expect(cookies.isCookiesDefined(['testingCookie', 'testingCookie2'])).toBeFalsy()
  })
})
