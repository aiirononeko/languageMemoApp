require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validates presence" do
    context "全カラムの値を指定しているとき" do
      let(:user) { create(:user) }

      it "userのレコードが作成される" do
        expect(user).to be_valid
      end
    end

    context "emailを指定していないとき" do
      let(:user) { build(:user, email: nil) }

      it "エラーになる" do
        user.valid?
        expect(user.errors.messages[:email]).to include "can't be blank"
      end
    end

    context "passwordを指定していないとき" do
      let(:user) { build(:user, password: nil) }

      it "エラーになる" do
        user.valid?
        expect(user.errors.messages[:password]).to include "can't be blank"
      end
    end
  end

  describe "validates uniqueness" do
    context "保存されたメールアドレスが指定されたとき" do
      let(:user1) { create(:user) }
      let(:user2) { build(:user, email: user1.email) }

      it "エラーになる" do
        user2.valid?
        expect(user2.errors.messages[:email]).to include "has already been taken"
      end
    end

    context "保存されたユーザーネームが指定されたとき" do
      let(:user1) { create(:user) }
      let(:user2) { build(:user, username: user1.username) }

      it "エラーになる" do
        user2.valid?
        expect(user2.errors.messages[:username]).to include "has already been taken"
      end
    end
  end

  describe "validates length" do
    context "パスワードが８文字以下の場合" do
      let(:user) { build(:user, password: 'aaaa') }
      it "エラーになる" do
        user.valid?
        expect(user.errors.messages[:password]).to include "is too short (minimum is 8 characters)"
      end
    end
    context "名前が50文字以上の場合" do
      let(:user) { build(:user, name: 'a' * 51) }
      it "エラーになる" do
        user.valid?
        expect(user.errors.messages[:name]).to include "is too long (maximum is 50 characters)"
      end
    end
    context "住所が30文字以上の場合" do
      let(:user) { build(:user, address: 'a' * 31) }
      it "エラーになる" do
        user.valid?
        expect(user.errors.messages[:address]).to include "is too long (maximum is 30 characters)"
      end
    end
    context "ユーザーネームが30文字以上の場合" do
      let(:user) { build(:user, username: 'a' * 31) }
      it "エラーになる" do
        user.valid?
        expect(user.errors.messages[:username]).to include "is too long (maximum is 30 characters)"
      end
    end
  end
end