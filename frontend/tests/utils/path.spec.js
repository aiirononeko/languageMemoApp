import * as path from '~/utils/path'

describe('utils/path', () => {
  it('getDirArr 正常系', () => {
    expect(path.getDirArr('aaa/bbb/ccc/ddd/eee')).toEqual(
      ['aaa', 'bbb', 'ccc', 'ddd']
      )
      expect(path.getDirArr('/aaa/bbb/ccc/ddd/eee/')).toEqual(
        ['aaa', 'bbb', 'ccc', 'ddd']
      )
    expect(path.getDirArr('aaa/bbb/ccc/ddd/eee.cpp')).toEqual(
      ['aaa', 'bbb', 'ccc', 'ddd']
    )
    expect(path.getDirArr('/aaa/bbb/ccc/ddd/eee.cpp')).toEqual(
      ['aaa', 'bbb', 'ccc', 'ddd']
    )
    expect(path.getDirArr('/aaa/bbb/ccc/ddd/.gitignore')).toEqual(
      ['aaa', 'bbb', 'ccc', 'ddd']
    )
  })

  it('getDirname & getFilename & getExt & isDir& isFile 正常系', () => {
    // ディレクトリ1
    expect(path.getDirname('aaa/bbb/ccc/ddd/eee')).toBe('eee')
    expect(path.getFilename('aaa/bbb/ccc/ddd/eee')).toBeNull()
    expect(path.getExt('aaa/bbb/ccc/ddd/eee')).toBeNull()
    expect(path.isDir('aaa/bbb/ccc/ddd/eee')).toBeTruthy()
    expect(path.isFile('aaa/bbb/ccc/ddd/eee')).toBeFalsy()

    // ディレクトリ2
    expect(path.getDirname('/aaa/bbb/ccc/ddd/eee/')).toBe('eee')
    expect(path.getFilename('/aaa/bbb/ccc/ddd/eee/')).toBeNull()
    expect(path.getExt('/aaa/bbb/ccc/ddd/eee/')).toBeNull()
    expect(path.isDir('/aaa/bbb/ccc/ddd/eee/')).toBeTruthy()
    expect(path.isFile('/aaa/bbb/ccc/ddd/eee/')).toBeFalsy()

    // ファイル1
    expect(path.getDirname('aaa/bbb/ccc/ddd/eee.cpp')).toBeNull()
    expect(path.getFilename('aaa/bbb/ccc/ddd/eee.cpp')).toBe('eee.cpp')
    expect(path.getExt('aaa/bbb/ccc/ddd/eee.cpp')).toBe('.cpp')
    expect(path.isDir('aaa/bbb/ccc/ddd/eee.cpp')).toBeFalsy()
    expect(path.isFile('aaa/bbb/ccc/ddd/eee.cpp')).toBeTruthy()

    // ファイル2
    expect(path.getDirname('/aaa/bbb/ccc/ddd/eee.cpp')).toBeNull()
    expect(path.getFilename('/aaa/bbb/ccc/ddd/eee.cpp')).toBe('eee.cpp')
    expect(path.getExt('/aaa/bbb/ccc/ddd/eee.cpp')).toBe('.cpp')
    expect(path.isDir('/aaa/bbb/ccc/ddd/eee.cpp')).toBeFalsy()
    expect(path.isFile('/aaa/bbb/ccc/ddd/eee.cpp')).toBeTruthy()

    // ファイル3(.gitignoreのような.から始まるファイル)
    expect(path.getDirname('/aaa/bbb/ccc/ddd/.gitignore')).toBeNull()
    expect(path.getFilename('/aaa/bbb/ccc/ddd/.gitignore')).toBe('.gitignore')
    expect(path.getExt('/aaa/bbb/ccc/ddd/.gitignore')).toBeNull()
    expect(path.isDir('/aaa/bbb/ccc/ddd/.gitignore')).toBeFalsy()
    expect(path.isFile('/aaa/bbb/ccc/ddd/.gitignore')).toBeTruthy()
  })
})
