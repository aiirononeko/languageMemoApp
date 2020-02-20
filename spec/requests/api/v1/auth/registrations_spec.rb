require 'rails_helper'

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  describe "POST /api/v1/auth" do
    subject { post(api_v1_user_registration_path, params: params) }
    let(:params) { attributes_for(:user) }
    it "ユーザー登録できる" do
      subject
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("success")
      expect(res["data"]["id"]).to eq(User.last.id)
      expect(res["data"]["email"]).to eq(User.last.email)
      expect(response).to have_http_status(200)
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
        expect(response).to have_http_status(200)
      end
    end 

    context "有効化はしたが、メールアドレスが正しくないとき" do
      let(:current_user) { create(:confirmed_user) }
      let(:params) { { email: "test@example.com", password: current_user.password } }
      it "ログインできない" do
        subject
        res = JSON.parse(response.body)
        expect(res["success"]).to be_falsey
        expect(res["errors"]).to include("Invalid login credentials. Please try again.")
        expect(response.headers["uid"]).to be_blank
        expect(response.headers["access-token"]).to be_blank
        expect(response.headers["client"]).to be_blank
        expect(response).to have_http_status(401)
      end
    end

    context "有効化はしたが、パスワードが正しくないとき" do
      let(:current_user) { create(:confirmed_user) }
      let(:params) { { email: current_user.email, password: "password" } }
      it "ログインできない" do
        subject
        res = JSON.parse(response.body)
        expect(res["success"]).to be_falsey
        expect(res["errors"]).to include("Invalid login credentials. Please try again.")
        expect(response.headers["uid"]).to be_blank
        expect(response.headers["access-token"]).to be_blank
        expect(response.headers["client"]).to be_blank
        expect(response).to have_http_status(401)
      end
    end

    context "メールアドレス、パスワードは正しいが、有効化されていないとき" do
      let(:current_user) { create(:user) }
      let(:params) { { email: current_user.email, password: current_user.password } }
      it "ログインできない" do
        subject
        res = JSON.parse(response.body)
        expect(response.headers["uid"]).not_to be_present
        expect(response.headers["access-token"]).not_to be_present
        expect(response.headers["client"]).not_to be_present
        expect(response).not_to have_http_status(200)
      end
    end
  end
  describe "DELETE /api/v1/auth/sign_out" do
    context "ユーザーがログインしているとき" do
      let(:confirmed_user) { create(:confirmed_user) }
      let(:params) { { email: confirmed_user.email, password: confirmed_user.password } }
      it "ログアウトできる" do
        post(api_v1_user_session_path, params: params)
        delete(destroy_api_v1_user_session_path, { headers: {
          uid: response.headers["uid"],
          client: response.headers["client"],
          "access-token": response.headers["access-token"]
        }})
        res = JSON.parse(response.body)
        expect(res["success"]).to be_truthy
        expect(response).to have_http_status(200)
      end
    end
  end
end