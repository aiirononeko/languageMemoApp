require 'rails_helper'

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  describe "POST /api/v1/auth" do
    subject(:call_api) { post(api_v1_user_registration_path, params: params) }

    let(:params) { attributes_for(:user) }
  
    it "ユーザー登録できる" do
      call_api
      res = JSON.parse(response.body)
      expect(res["data"]["id"]).to eq(User.last.id.to_s)
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
