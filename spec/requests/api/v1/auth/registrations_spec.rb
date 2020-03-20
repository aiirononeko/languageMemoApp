require 'rails_helper'

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  describe "POST /api/v1/auth" do
    subject(:call_api) { post(api_v1_user_registration_path, params: params) }
    let(:params) { attributes_for(:user) }
    it "ユーザー登録できる" do
      subject
      res = JSON.parse(response.body)
      expect(res["data"]["id"]).to eq(User.last.id.to_s)
      expect(res["data"]["attributes"]["name"]).to eq(User.last.name)
      expect(response.status).to eq 200
    end
  end

  describe "DELETE /api/v1/auth" do
    let(:user) { create(:confirmed_user) }
    let(:headers) { user.create_new_auth_token }
    it "ユーザー削除できる" do
      delete(api_v1_user_registration_path, headers: headers)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq "success"
      expect(User.all.size).to eq 0
    end
  end

  describe "POST /api/v1/auth/sign_in" do
    subject { post(api_v1_user_session_path, params: params) }

    context "メールアドレス、パスワードが正しく、有効化もされているとき" do
      let(:confirmed_user) { create(:confirmed_user) }
      let(:params) { { email: confirmed_user.email, password: confirmed_user.password } }
      it "ログインできる" do
        subject
        res = JSON.parse(response.body)
        expect(response.headers["uid"]).to be_present
        expect(response.headers["access-token"]).to be_present
        expect(response.headers["client"]).to be_present
        expect(response.status).to eq 200
      end
    end 

    context "有効化はしたが、メールアドレスが正しくないとき" do
      let(:user) { create(:confirmed_user) }
      let(:params) { { email: "invalid@example.com", password: user.password } }
      it "ログインできない" do
        subject
        res = JSON.parse(response.body)
        expect(res["success"]).to be_falsey
        expect(res["errors"]).to include("Invalid login credentials. Please try again.")
        expect(response.headers["uid"]).to be_blank
        expect(response.headers["access-token"]).to be_blank
        expect(response.headers["client"]).to be_blank
        expect(response.status).to eq 401
      end
    end

    context "有効化はしたが、パスワードが正しくないとき" do
      let(:user) { create(:confirmed_user) }
      let(:params) { { email: user.email, password: "invalidpassword" } }
      it "ログインできない" do
        subject
        res = JSON.parse(response.body)
        expect(res["success"]).to be_falsey
        expect(res["errors"]).to include("Invalid login credentials. Please try again.")
        expect(response.headers["uid"]).to be_blank
        expect(response.headers["access-token"]).to be_blank
        expect(response.headers["client"]).to be_blank
        expect(response.status).to eq 401
      end
    end

    context "メールアドレス、パスワードは正しいが、有効化されていないとき" do
      let(:user) { create(:user) }
      let(:params) { { email: user.email, password: user.password } }
      it "ログインできない" do
        subject
        res = JSON.parse(response.body)
        expect(response.headers["uid"]).not_to be_present
        expect(response.headers["access-token"]).not_to be_present
        expect(response.headers["client"]).not_to be_present
        expect(response.status).to_not eq 200
      end
    end
  end
  describe "DELETE /api/v1/auth/sign_out" do
    context "ユーザーがログインしているとき" do
      let(:user) { create(:confirmed_user) }
      let(:headers) { user.create_new_auth_token }
      it "ログアウトできる" do
        delete(destroy_api_v1_user_session_path, headers: headers)
        res = JSON.parse(response.body)
        expect(res["success"]).to be_truthy
        expect(response.status).to eq 200
      end
    end
  end
  describe "PUT /api/v1/auth" do
    context "渡す値が正しいとき" do
      let(:user) { create(:confirmed_user) }
      let(:headers) { user.create_new_auth_token }
      let(:params) { {name: 'テスト太郎', profile: 'テストマンだよ', address: 'テス都', image: 'https://image_url' } }
      it "値を変更できる" do
        put api_v1_user_registration_path, params: params, headers: headers
        res = JSON.parse(response.body)
        expect(res["data"]["attributes"]["name"]).to eq('テスト太郎')
        expect(res["data"]["attributes"]["profile"]).to eq('テストマンだよ')
        expect(res["data"]["attributes"]["address"]).to eq('テス都')
        expect(res["data"]["attributes"]["image"]).to eq('https://image_url')
      end
    end
    context "渡す値が正しくないとき" do
      let(:user) { create(:confirmed_user) }
      let(:params) { { id: '3' } }
      it "値を変更できない" do
        put api_v1_user_registration_path, params: params, headers: headers
        res = JSON.parse(response.body)
        expect(res["success"]).to eq(false)
        expect(res["errors"]).to include("Please submit proper account update data in request body.")
      end
    end
  end   

  describe "GET /api/v1/auth/edit" do
    context "ユーザーがログインしているとき" do
      let(:user) { create(:confirmed_user) }
      let(:headers) { user.create_new_auth_token }
      it "ユーザーの情報を返す" do
        get(edit_api_v1_user_registration_path, headers: headers)
        res = JSON.parse(response.body)
        expect(res["data"]["id"]).to eq(User.last.id.to_s)
        expect(res["data"]["attributes"]["name"]).to eq(User.last.name)
        expect(response.status).to eq 200
      end
    end
  end
end
