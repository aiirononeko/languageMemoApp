import Proverb from "@/utils/Proverb"

describe('Proverb', () => {
  describe('new', () => {
    it('new できる', () => {
      const proverb = new Proverb()
      expect(proverb).toBeInstanceOf(Proverb)
    })
  })

  // APIとの通信があり、コストが重いので、通常はskip
  describe.skip('setRandom', () => {
    it('ランダムに何か入る', async () => {
      const proverb = new Proverb()

      await proverb.setRandom()

      console.log(proverb)
    })
  })
})
