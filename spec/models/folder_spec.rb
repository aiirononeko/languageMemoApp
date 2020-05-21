require 'rails_helper'

RSpec.describe Folder, type: :model do

  describe "correct_folder" do
    let(:user) { build(:user) }
    let(:folder) { build(:folder, name: name, public: false, user: user) }
    let(:name) { "example" }

    it "投稿が正しく作成されていること" do
      expect(folder).to be_valid
    end
  end

  describe "validate length" do
    context "名前の長さが51文字以上の時" do
      let(:folder) { build(:folder, name: 'a' * 51) }
      it "エラーメッセージが返る" do
        folder.valid?
        expect(folder.errors.messages[:name]).to include("は50文字以内で入力してください")
      end
    end
  end

  describe "validate presence" do
    context "nameがNULLの時" do
      let(:folder) { build(:folder, name: nil) }
      it "エラーメッセージが返る" do
        folder.valid?
        expect(folder.errors.messages[:name]).to include("を入力してください")
      end
    end

    context "publicがNULLの時" do
      let(:folder) { build(:folder, public: nil) }
      it "エラーメッセージが返る" do
        folder.valid?
        expect(folder.errors.messages[:public]).to include("は一覧にありません")
      end
    end
  end

  describe "validate inclusion" do
    context 'publicがtrueとfalse以外の場合' do
      let(:folder) { build(:folder, public: "example") }
      it "デフォルトでtrueが入る" do
        folder.valid?
        expect(folder.public).to eq true
      end
    end
  end

  describe "association" do
    it "Userテーブルに正しく紐づいていること" do
      rel = described_class.reflect_on_association(:user)
      expect(rel.macro).to eq :belongs_to
    end

    it "Postテーブルに正しく紐づいていること" do
      rel = described_class.reflect_on_association(:posts)
      expect(rel.macro).to eq :has_many
      expect(rel.options[:dependent]).to eq :destroy
    end
  end
end
