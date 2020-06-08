require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  describe "GET /api/v1/users/:username" do
    subject(:call_api){ get "/api/v1/users/#{user.username}" }

    let(:user) { create(:user) }

    it "ユーザーのデータを返す" do
      call_api
      res = JSON.parse(response.body)
      expect(res["data"]["id"]).to eq(User.last.id.to_s)
      expect(res["data"]["attributes"]["name"]).to eq(User.last.name)
      expect(response.status).to eq 200
    end

    context "userが存在しない場合" do
      it 'レスポンスステータスが404で返る' do
        get "/api/v1/users/daredesuka"
        expect(response.status).to eq 404
      end
    end
  end
end
