require 'rails_helper'

RSpec.describe Post, type: :model do

  describe "correct_post" do
    let(:user) { build(:user) }
    let(:post) { build(:post, name: name, content: content, public: false, user: user) }
    let(:name) { "example" }
    let(:content) { "test_post" }

    it "投稿が正しく作成されていること" do
      expect(post).to be_valid
    end
  end

  describe "validate length" do
    context "名前の長さが101文字以上の時" do
      let(:post) { build(:post, name: 'a' * 101) }
      it "エラーメッセージが返る" do
        post.valid?
        expect(post.errors.messages[:name]).to include("は100文字以内で入力してください")
      end
    end
  end

  describe "validate presence" do
    context "名前が空文字の時" do
      let(:post) { build(:post, name: nil) }
      it "エラーメッセージが返る" do
        post.valid?
        expect(post.errors.messages[:name]).to include("を入力してください")
      end
    end

    context "内容が空文字の時" do
      let(:post) { build(:post, content: nil) }
      it "エラーメッセージが返る" do
        post.valid?
        expect(post.errors.messages[:content]).to include("を入力してください")
      end
    end
  end

  describe "validate inclusion" do
    context 'publicがtrueとfalse以外の場合' do
      let(:post) { build(:post, public: "example") }
      it "デフォルトでtrueが入る" do
        post.valid?
        expect(post.public).to eq true
      end
    end
  end

  describe "association" do
    it "ユーザーに正しく紐づいていること" do
      rel = described_class.reflect_on_association(:user)
      expect(rel.macro).to eq :belongs_to
    end
  end
end
