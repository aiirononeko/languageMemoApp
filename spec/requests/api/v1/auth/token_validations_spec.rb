require 'rails_helper'

RSpec.describe "Api::V1::Auth::TokenValidations", type: :request do
  describe "GET /api/v1/auth/validate_token" do
    subject(:call_api) { get(api_v1_auth_validate_token_path, headers: headers) }

    context "リクエストヘッダが正常なとき" do
      let(:confirmed_user) { create(:confirmed_user) }
      let(:headers) { confirmed_user.create_new_auth_token }

      it "ユーザー情報が返ってくる" do
        call_api
        res = JSON.parse(response.body)
        expect(res["success"]).to eq(true)
        expect(res["data"]["id"]).to eq(User.last.id)
        expect(res["data"]["name"]).to eq(User.last.name)
        expect(response.status).to eq 200
      end
    end 
  end
end