require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  describe "GET /api/users/:id" do
    subject(:call_api){ get(api_v1_user_path(user)) }

    let(:user) { create(:user) }

    it "ユーザーのデータを返す" do
      call_api
      res = JSON.parse(response.body)
      expect(res["data"]["id"]).to eq(User.last.id.to_s)
      expect(res["data"]["attributes"]["name"]).to eq(User.last.name)
      expect(response.status).to eq 200
    end
  end
end
