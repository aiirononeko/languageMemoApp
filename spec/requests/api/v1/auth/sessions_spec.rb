require 'rails_helper'

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
  describe "POST /api/v1/auth/sign_in" do
    subject(:call_api) { post(api_v1_user_session_path, params: params) }

    context "メールアドレス、パスワードが正しく、有効化もされているとき" do
      let(:confirmed_user) { create(:confirmed_user) }
      let(:params) { { email: confirmed_user.email, password: confirmed_user.password } }

      it "ログインできる" do
        call_api
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
        call_api
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
        call_api
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
        call_api
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
end